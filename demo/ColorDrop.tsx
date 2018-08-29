import * as React from 'react';
import { InputStyle, DropForm, InputSubmit } from './styled-components';

export interface ColorDropProps {
    onSelectColor?: (color: string) => void;
    value: string;
}
export interface ColorDropState {
    color: string;
}
export default class ColorDrop extends React.Component<ColorDropProps, ColorDropState> {

    state = {
        color: this.props.value
    }

    handleColorChange = (e) => {
        var color = e.target.value;
        this.setState({ color });

    };
    handleColorSubmit = (e) => {
        e.preventDefault();
        var color = this.state.color;
        if (this.props.onSelectColor) {
            this.props.onSelectColor(color);
        }
    }
    render() {
        return (

            <DropForm onSubmit={this.handleColorSubmit}>
                <p>Primary color:</p>
                <InputStyle type="color" onChange={this.handleColorChange} value={this.state.color} />
                <InputSubmit type="submit" />
            </DropForm>

        );
    }
}
