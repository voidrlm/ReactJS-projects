import React, { Component } from "react";
import axios from "axios";

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      error: null,
    };
  }

  handleSubmit = () => {
    const dataToSend = {}; // Request parameters
    axios
      .post("API URL HERE", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.data && <p>Response: {JSON.stringify(this.state.data)}</p>}
        {this.state.error && <p>Error: {this.state.error.message}</p>}
      </div>
    );
  }
}

export default MyComponent;
