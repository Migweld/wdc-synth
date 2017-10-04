import React, {cloneElement} from "react";
import PropTypes from "prop-types";
import AudioContextMaster from "./AudioContext";
import Knob from "./Knob";

class Oscillator extends React.Component {

    state = {
        knobs: {
            frequency: 440,
            amplitude: 0.1,
            wave: "sine"
        }
    }

    constructor(props) {
        super(props);
        this.handleKnobChange = this
            .handleKnobChange
            .bind(this);
    }

    handleKnobChange = (target, event) => {
        this.setState({
            knobs: {
                [target]: event.target.value
            }
        });
    }

    componentWillMount() {
        this.oscillator = this
            .context
            .audioContext
            .createOscillator();
        this.gain = this
            .context
            .audioContext
            .createGain();

        this
            .oscillator
            .connect(this.gain);
        this
            .oscillator
            .start();
    }

    componentWillUnmount() {
        this
            .gain
            .disconnect();
        this
            .oscillator
            .disconnect();
    }

    render() {
        const {waveform, connectTo, children} = this.props;

        this.oscillator.type = waveform;
        this
            .oscillator
            .frequency
            .setValueAtTime(this.state.knobs.frequency, this.context.audioContext.currentTime);
        this.gain.gain.value = this.state.knobs.amplitude;

        connectTo && this
            .gain
            .connect(connectTo);

        const newChildren = React
            .Children
            .map(children, child => cloneElement(child, {
                connectTo: this.modulations,
                ...child.props
            }));

        return <div>
            {newChildren}
            <Knob name="OSC1 freq" type="frequency" onChange={this.handleKnobChange}/>
            <Knob name="OSC1 Volume" type="amplitude" onChange={this.handleKnobChange}/>
        </div>;
    }
}

Oscillator.PropTypes = {
    waveform: PropTypes.oneOf(['sine', 'square', 'saw', 'triangle']),
    connectTo: PropTypes.oneOfType([
        PropTypes.instanceOf(AudioParam),
        PropTypes.instanceOf(AudioNode)
    ])
}

Oscillator.defaultProps = {
    waveform: 'sine'
}

Oscillator.contextTypes = {
    audioContext: PropTypes.instanceOf(AudioContextMaster)
};

export default Oscillator;