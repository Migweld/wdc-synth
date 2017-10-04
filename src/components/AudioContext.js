import React from "react";
import PropTypes from "prop-types";

export const AudioContextMaster = window.AudioContext || window.webkitAudioContext;

class AudioContext extends React.Component {

    audioContext = new AudioContextMaster();

    constructor(props){
        super(props);
        this.getChildContext = this.getChildContext.bind(this);
    }

    getChildContext() {
        return {audioContext: this.audioContext};
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

AudioContext.childContextTypes = {
    audioContext: PropTypes.instanceOf(AudioContextMaster)
};

export default AudioContext;