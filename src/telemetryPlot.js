import React , { Component } from 'react';
import { Mission1 } from './components';
import { initialState, parseJSON } from './lib';

class TelemetryData extends Component {
  constructor(props) {
    super(props);

    this.state = initialState();
    this.prevState = initialState();
    this.i = 1; // Initialize counter
    this.fetchData(); // Start fetching data
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchData(); // Fetch data periodically
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear interval when component unmounts
  }

  fetchData() {
    let url = 'telDat' + this.i + '.json'; // Construct URL with current counter
    console.log(url);
    fetch('http://localhost:3000/dta/' + url, { cache: "reload" })
      .then(response => {
        try {
          return response.json();
        } catch (e) {
          return Promise.reject();
        }
      })
      .then(telemetryData => {
        this.setState(parseJSON(this.state, telemetryData));
        this.i++; // Increment counter
        console.log('Next URL: telDat' + this.i + '.json');
      })
      .catch(() => {});
  }

  changePlots(state, plots) {
    this.setState(
      Object.freeze({
        ...state,
        plotsToRender: plots
      })
    );
  }

  render() {
    return (
      <div id="plots">
        <Mission1 state={this.state} />
      </div>
    );
  }
}

export default TelemetryData;


//   changePlots(state,plots){
//     this.setState(
//       Object.freeze({
//       ...state,
//       plotsToRender : plots
//     })
//   );
//   }
  
//   render() {
//     return (
//       <div id="plots">
//           <Mission1 state={this.state}/>
//       </div>
//     );
//   }
// }

// export default TelemetryData;