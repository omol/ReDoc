import * as React from 'react';
import { FontsDropWrap } from './styled-components';

export interface FontsDropProps {
    onSelectFont?: (font: string) => void;
    value: string;
}
export interface FontsDropState {
    font: string;
}

export default class FontsDrop extends React.Component<FontsDropProps, FontsDropState> {

    state = {
        font: this.props.value
    }

    handleFontChange = (e) => {

        var font = e.target.value;
        this.setState({ font });
        if (!(document.getElementById('font' + e.target.value)) && e.target.value) {
            var link = document.createElement('link')
            link.id = 'font' + e.target.value;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css?family=' + e.target.value;
            document.head.appendChild(link)
        }
        if (this.props.onSelectFont) {
            this.props.onSelectFont(font);

        }
    };
    render() {
        return (
            <FontsDropWrap>
                <p>Font:</p>
                <select onChange={this.handleFontChange} value={this.state.font}>
                    <option value="Poppins">Poppins</option>
                    <option value="Muli">Muli</option>
                    <option value="Nunito">Nunito</option>
                    <option value="Roboto">Roboto</option>
                    <option value="PT Sans Narrow">PT Sans Narrow</option>
                </select>
            </FontsDropWrap>
        );
    }
}