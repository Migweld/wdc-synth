import React from "react";

class Knob extends React.Component {

    render(){
        return (
            <div>
            <label>{this.props.name}</label>
            <input type="range" onChange={this.props.onChange.bind(this, this.props.type)} defaultValue="40" min="40" max="10000" />
            </div>
        );
    }
}

export default Knob;