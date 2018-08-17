import * as React from 'react';
import styled from 'styled-components';

export interface ColorDropProps {
    onSelectColor?: (color: string) => void;
    value?: string;
}
export interface ColorDropState {
    color: string;
}
export default class ColorDrop extends React.Component<ColorDropProps, ColorDropState> {

    state = {
        color: this.props.value || ''
    }

    getValue = () => {
        if (this.state.color == '') {
            return '#32329f';
        }
        return this.state.color;
    }

    handleColorChange = (e) => {
        var color = e.target.value;
        this.setState({ color: `${color}` });

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
            <ColorDropWrap>
                <DropLabel>Settings</DropLabel>
                <form onSubmit={this.handleColorSubmit} style={DropForm}>
                    <p>Primary color:</p>
                    <input style={InputStyle} type="color" onChange={this.handleColorChange} value={this.getValue()} />
                    <input style={InputSubmit} type="submit" />
                </form>
            </ColorDropWrap>
        );
    }
}

const ColorDropWrap = styled.div`
    display: block;
    position: absolute;
    width: 150px;
    top: 30px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 0 0 2px 2px;
`;
const DropLabel = styled.div`
    display: block;
    background-color: #f4f4f4;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const DropForm = {
    padding: '10px'
}
const InputStyle = {
    padding: '0',
    outline: 'none',
    width: '50px',
    height: '25px',
    margin: '0px 15px 0px 0px'
}
const InputSubmit = {
    outline: 'none',
}