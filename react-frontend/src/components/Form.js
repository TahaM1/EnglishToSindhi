import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directory: "",
      search: "",
      location: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const data = {
      directory: this.state.directory,
      search: this.state.search,
      location: this.state.location,
    };

    try {
      fetch("/api/scrape", {
        method: "post",
        mode: "cors", //sending json doesnt work with no-cors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.updateResponse(data.links);
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleFormChange(event) {
    const inputForm = event.target;
    const value = inputForm.value;
    const name = inputForm.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <p>Which Directory would you like to Search?</p>

        <form onSubmit={this.handleFormSubmit}>
          <label>
            YellowPages Canada
            <input
              type="radio"
              id="Yellowpages.ca"
              name="directory"
              value="0"
              onChange={this.handleFormChange}
              required
            />
          </label>

          <label>
            YellowPages US
            <input
              type="radio"
              id="Yellowpages.com"
              name="directory"
              value="1"
              onChange={this.handleFormChange}
              required
            />
          </label>

          <br />

          <label>
            What are you searching for?
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Eg. Dental Clinic"
              onChange={this.handleFormChange}
            />
          </label>

          <br />

          <label>
            Where are you searching?
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Eg. Toronto ON"
              onChange={this.handleFormChange}
            />
          </label>

          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}