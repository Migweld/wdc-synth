import React, {cloneElement} from "react";
import PropTypes from "prop-types";
import AudioContextMaster from "./AudioContext";

class Output extends React.Component {
    componentWillMount(){
        this.gain = this.context.audioContext.createGain();
        this.gain.connect(this.context.audioContext.destination);
    }

    componentWillUnmount() {
        this.gain.disconnect();
    }

    render() {
        const { connectTo, children } = this.props;
    
        connectTo && this.gain.connect(connectTo);
    
        const newChildren = React.Children.map(
          children,
          child => cloneElement(child, {
            connectTo: this.gain,
            ...child.props
          })
        );
    
        return <div>{newChildren}</div>;
      }
}

Output.contextTypes = {
    audioContext: PropTypes.instanceOf(AudioContextMaster)
};

export default Output;