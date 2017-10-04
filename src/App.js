import React, {Component} from 'react';
import AudioContext from "./components/AudioContext";
import Oscillator from "./components/Oscillator";
import Output from "./components/Output";
import Knob from "./components/Knob";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AudioContext>
          <Output>
            <Oscillator  waveform="square"/>
          </Output>
        </AudioContext>
      </div>
    );
  }
}

export default App;
