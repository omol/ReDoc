import * as React from 'react';
import { render } from 'react-dom';
import { resolve as urlResolve } from 'url';
import { RedocStandalone } from '../src';
import ComboBox from './ComboBox';
import ColorDrop from './ColorDrop';
import defaultTheme, { ResolvedThemeInterface } from '../src/theme';
import { updateQueryStringParameter } from './helpers';
import { ControlsContainer, CorsCheckbox, PickerWrap, ColorPicker, Heading, Logo, ColorDropWrap, DropLabel } from './styled-components';
import FontsDrop from './FontsDrop';
import FontSizeInput from './FontSizeInput';

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

class DemoApp extends React.Component<
  {},
  { specUrl: string; dropdownOpen: boolean; cors: boolean, color: string, font: string, fontsize: string }
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
      color: (defaultTheme as ResolvedThemeInterface).colors.primary.main,
      font: '',
      fontsize: (defaultTheme as ResolvedThemeInterface).typography.fontSize
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

  handleFont = (fontname) => {
    this.setState({ font: fontname });
  };

  handleSize = (fontsize) => {
    this.setState({ fontsize });
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
    const font = this.state.font;
    const fontsize = this.state.fontsize;
    const defaultFontSize = (defaultTheme as ResolvedThemeInterface).typography.fontSize;


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
                <ColorDropWrap>
                  <DropLabel>Settings</DropLabel>
                  <ColorDrop onSelectColor={this.handleColor} value={color}>
                  </ColorDrop>
                  <FontsDrop onSelectFont={this.handleFont} value={font}></FontsDrop>
                  <FontSizeInput onSelectSize={this.handleSize} value={defaultFontSize}></FontSizeInput>
                </ColorDropWrap>}
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
        <RedocStandalone specUrl={proxiedUrl} options={{
          theme: {
            colors: {
              primary: {
                main: color
              }
            },
            typography: {
              fontSize: fontsize,
              fontFamily: font + ', sans-serif'
            }

          }
        }} />
      </>
    );
  }
}



render(<DemoApp />, document.getElementById('container'));

