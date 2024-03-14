import React, { Component } from 'react';
import { Mission1 } from './components';
import { initialState, parseJSON } from './lib';

class Telemetry extends Component {
  constructor(props) {
    super(props);

    this.state = initialState();
    this.timerId = null;
  }

  startMission = () => {
    // Stop any ongoing mission first
    this.stopMission();

    let currentIndex = 0;
    const data = [];

    // Fetch data from TelemetryData.json periodically
    this.timerId = setInterval(() => {
      fetch('http://localhost:3000/TelemetryData.json', { cache: "reload" })
        .then(response => response.json())
        .then(telemetryData => {
          if (currentIndex < telemetryData.length) {
            // Parse and update the state with the current data point
            const parsedData = parseJSON(this.state, telemetryData[currentIndex]);
            this.setState(parsedData);
            currentIndex++;
          } else {
            // If all data points have been fetched, stop the mission
            this.stopMission();
          }
        })
        .catch(error => {
          console.error('Error fetching telemetry data:', error);
          // If an error occurs, stop the mission
          this.stopMission();
        });
    }, 2000); // Fetch data every 2 seconds
};


  stopMission = () => {
    // Stop the mission by clearing the interval
    clearInterval(this.timerId);
  };

  render() {
    return (
      <div id="plots">
        <button onClick={this.startMission}>Start Mission</button>
        <Mission1 state={this.state} />
      </div>
    );
  }
}

export default Telemetry;
