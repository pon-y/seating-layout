//TODO: add calendar component from materialize

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Catamaran',
      'sans-serif'
    ].join(','),
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  render () {
    return (

    <div className="formInput">
    <h3>Meeting Room Requirements:</h3>
      <form >

{/* Input for number of guests */}
        <div>
          <label>
            <TextField
            theme={theme}
            fullWidth
              id="num-guests"
              value={this.props.indexState.guests}
              label="Number of Guests"
              name = "guests"
              onChange={this.props.handleChange}
              />
          </label>
        </div>
{/* Number of guests per table */}
        <div>
          <label>
            <TextField
            theme={theme}
            fullWidth
              id="num-guests-per-table"
              value={this.props.indexState.guestsPerTable}
              label="Seats per Table"
              name = "guestsPerTable"
              helperText="Only enabled for Banquet layout"
              onChange={this.props.handleChange}
              />
          </label>
        </div>
{/* Input for room dimensions hxw */}
       <div>
          <label>
            <TextField
            theme={theme}
            fullWidth
              type="roomwidth"
              value={this.props.indexState.roomwidth}
              label="Room Width (ft.)"
              name = "roomwidth"
              onChange={this.props.handleChange}
              fontFamily="Catamaran"
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
            theme={theme}
            fullWidth
              type="roomlength"
              value={this.props.indexState.roomlength}
              label="Room Length (ft.)"
              name = "roomlength"
              onChange={this.props.handleChange}
            />
          </label>
        </div>

{/* Input for setup style. Selector dropdown  */}
        <div>
        <Select
        theme={theme}
            fullWidth
            value={this.props.indexState.layout}
            onChange={this.props.handleChange}
            inputProps={{
              name: 'layout',
              id: 'room-layout',
            }}
          >
            <MenuItem value={"banquet"}>Banquet Rounds</MenuItem>
            <MenuItem value={"theater"}>Theater Style</MenuItem> 
          </Select>
        </div>  
      </form>

      <Button theme={theme} variant="contained" className="saveButton" onClick={this.props.handleSubmit}>
        Save Layout
      </Button>
    </div>
    )
  }
}

export default Form;