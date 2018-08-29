import * as React from 'react';

export interface FontsSizeProps {
    onSelectSize?: (fontnumber: string) => void;
    value: string;
}
export interface FontsSizeState {
    fontnumber: number;
}

export default class FontSizeInput extends React.Component<FontsSizeProps, FontsSizeState> {

    state = {
        fontnumber: parseInt(this.props.value, 10)
    }

    handleSizeChange = (e) => {
        var fontnumber = e.target.value;
        this.setState({ fontnumber });
        if (this.props.onSelectSize) {
            this.props.onSelectSize(this.state.fontnumber + 'px');
        }
    };

    render() {
        return (
            <input type="number" onChange={this.handleSizeChange} value={this.state.fontnumber} />
        );
    }
}