import React, { Component } from "react";
import {
  TextField,
  FormControl,
  Button,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Input,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directory: "",
      text: "",
      location: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const data = {
      directory: this.state.directory,
      text: this.state.text,
      location: this.state.location,
    };

    this.props.updateStatus(true);
    this.props.updateResponse([]);
    try {
      fetch("/api/transliterate", {
        //send post request with needed data
        method: "post",
        mode: "cors", //sending json doesnt work with no-cors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          //puts data into state
          console.log(data.links);
          this.props.updateResponse(data.links);
          this.props.updateStatus(false);
        });
    } catch (error) {
      console.log(error);
      this.props.updateStatus(false);
    }
  }

  handleFormChange(event) {
    const inputForm = event.target;
    const value = inputForm.value;
    const name = inputForm.name;

    this.setState({
      //tracks states of input form
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Grid container direction="column" alignItems="center">
            <Box marginTop={5}>
              <FormControl component="fieldset">
                <Grid item>
                  <FormLabel component="legend" color="secondary">
                    This app converts english text to sindhi then transliterates
                    to english text so you can read sindhi without knowing the
                    sindhi alphabet
                  </FormLabel>
                </Grid>
                <Grid item />
                {/* <Box marginTop={2}>
                  <Grid container item xs={12}>
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                      <RadioGroup
                        aria-label="quiz"
                        name="directory"
                        onChange={this.handleFormChange}
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="Yellow Pages (CA)"
                        />
                        <FormControlLabel
                          value="1"
                          disabled
                          control={<Radio />}
                          label="Yellow Pages (US)"
                        />
                      </RadioGroup>
                      <Grid item xs={2} />
                    </Grid>
                  </Grid>
                </Box> */}
                <FormHelperText></FormHelperText>
              </FormControl>
            </Box>

            <Grid container item direction="row" justify="center" spacing={3}>
              <Grid item>
                <TextField
                  color="secondary"
                  variant="standard"
                  name="text"
                  label="Enter text"
                  placeholder="What is your name?"
                  onChange={this.handleFormChange}
                ></TextField>
              </Grid>
            </Grid>
            <Box marginTop={5}>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Box>
          </Grid>
        </form>
        {/* 
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
        </form> */}
      </div>
    );
  }
}
