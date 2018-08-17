import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { resolve as urlResolve } from 'url';
import { RedocStandalone } from '../src';
import ComboBox from './ComboBox';
import ColorDrop from './ColorDrop';
import defaultTheme from '../src/theme';
import { ThemeInterface } from '../src/theme';


const demos = [
  { value: 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml', label: 'Instagram' },
  {
    value: 'https://api.apis.guru/v2/specs/googleapis.com/calendar/v3/swagger.yaml',
    label: 'Google Calendar',
  },
  { value: 'https://api.apis.guru/v2/specs/slack.com/1.0.6/swagger.yaml', label: 'Slack' },
  { value: 'https://api.apis.guru/v2/specs/zoom.us/2.0.0/swagger.yaml', label: 'Zoom.us' },
  {
    value: 'https://api.apis.guru/v2/specs/graphhopper.com/1.0/swagger.yaml',
    label: 'GraphHopper',
  },
];

const DEFAULT_SPEC = 'openapi.yaml';
const DEFAULT_COLOR = '#32329f'

class DemoApp extends React.Component<
  {},
  { specUrl: string; dropdownOpen: boolean; cors: boolean, color: string }
  > {
  constructor(props) {
    super(props);

    let parts = window.location.search.match(/url=([^&]+)/);
    let url = DEFAULT_SPEC;
    if (parts && parts.length > 1) {
      url = decodeURIComponent(parts[1]);
    }

    parts = window.location.search.match(/[?&]nocors(&|#|$)/);
    let cors = true;
    if (parts && parts.length > 1) {
      cors = false;
    }

    this.state = {
      specUrl: url,
      dropdownOpen: false,
      cors,
      color: '',
    };
  }
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  handleColor = (colorvalue) => {
    this.setState({ color: colorvalue });
  };

  handleChange = (url: string) => {
    this.setState({
      specUrl: url,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'url', url),
    );
  };

  toggleCors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cors = e.currentTarget.checked;
    this.setState({
      cors,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'nocors', cors ? undefined : ''),
    );
  };

  render() {
    const { specUrl, cors } = this.state;
    let proxiedUrl = specUrl;
    const color = this.state.color;
    const theme: ThemeInterface = defaultTheme;
    if (theme && theme.colors && theme.colors.primary) {
      if (color !== DEFAULT_COLOR && color !== '') {
        theme.colors.primary.main = color
      }
    };


    if (specUrl !== DEFAULT_SPEC) {
      proxiedUrl = cors
        ? '\\\\cors.apis.guru/' + urlResolve(window.location.href, specUrl)
        : specUrl;
    }
    return (
      <>
        <Heading>
          <a href=".">
            <Logo src="https://github.com/Rebilly/ReDoc/raw/master/docs/images/redoc-logo.png" />
          </a>
          <ControlsContainer>
            <ComboBox
              placeholder={'URL to a spec to try'}
              options={demos}
              onChange={this.handleChange}
              value={specUrl === DEFAULT_SPEC ? '' : specUrl}
            />
            <CorsCheckbox title="Use CORS proxy">
              <input id="cors_checkbox" type="checkbox" onChange={this.toggleCors} checked={cors} />
              <label htmlFor="cors_checkbox">CORS</label>
            </CorsCheckbox>

            <PickerWrap>
              <ColorPicker src="/setting.png" onClick={this.toggleDropdown} />
              {this.state.dropdownOpen &&
                <ColorDrop onSelectColor={this.handleColor} value={color}>
                </ColorDrop>}
            </PickerWrap>

          </ControlsContainer>

          <iframe
            src="https://ghbtns.com/github-btn.html?user=Rebilly&amp;repo=ReDoc&amp;type=star&amp;count=true&amp;size=large"
            frameBorder="0"
            scrolling="0"
            width="150px"
            height="30px"
          />
        </Heading>
        <RedocStandalone specUrl={proxiedUrl} options={{ theme: theme }} />

      </>
    );
  }
}

/* ====== Styled components ====== */

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 0 15px;
  align-items: center;
`;

const CorsCheckbox = styled.div`
  margin-left: 10px;
  white-space: nowrap;

  label {
    font-size: 13px;
  }

  @media screen and (max-width: 550px) {
    display: none;
  }
`;
const PickerWrap = styled.div`
  display: block;
  position: relative;
`;
const ColorPicker = styled.img`
  height: 20px;
  width: 20px;
  display: block;
  margin-left: 15px;

`;
const Heading = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #cccccc;
  z-index: 10;
  padding: 5px;

  display: flex;
  align-items: center;
  font-family: 'Lato';
`;

const Logo = styled.img`
  height: 40px;
  width: 124px;
  display: inline-block;
  margin-right: 15px;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

render(<DemoApp />, document.getElementById('container'));

/* ====== Helpers ====== */
function updateQueryStringParameter(uri, key, value) {
  const keyValue = value === '' ? key : key + '=' + value;
  const re = new RegExp('([?|&])' + key + '=?.*?(&|#|$)', 'i');
  if (uri.match(re)) {
    if (value !== undefined) {
      return uri.replace(re, '$1' + keyValue + '$2');
    } else {
      return uri.replace(re, (_, separator: string, rest: string) => {
        if (rest.startsWith('&')) {
          rest = rest.substring(1);
        }
        return separator === '&' ? rest : separator + rest;
      });
    }
  } else {
    if (value === undefined) {
      return uri;
    }
    let hash = '';
    if (uri.indexOf('#') !== -1) {
      hash = uri.replace(/.*#/, '#');
      uri = uri.replace(/#.*/, '');
    }
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    return uri + separator + keyValue + hash;
  }
}
