import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiUrl = `http://localhost:8080`;

type MyProps = {};
type MyState = {
  currentName: string;
  names: any;
};

class App extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentName: "",
      names: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({ currentName: event.target.value });
  }

  async postName() {
    const req = { name: this.state.currentName };
    await axios.post(apiUrl + "/name-post", req);
    this.loadNames();
  }

  async loadNames() {
    const res = await axios.get(apiUrl + "/names");
    this.setState({
      names: res.data
    });
  }

  componentDidMount() {
    this.loadNames();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Awesome People Signature Board</h2>
          <input
            type="text"
            value={this.state.currentName}
            onChange={this.handleChange}
          />
          <br></br>
          <button onClick={() => this.postName()}>Sign</button>
          <ul>
            {this.state.names.map((name: any) => (
              <li key={name._id}>{name.name}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
