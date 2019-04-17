import React from 'react';
import ReactDOM from 'react-dom';
import DiagramContainer from './components/DiagramContainer.jsx';
import Form from './components/Form.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      guests: '', //int for how many guests there are
      layout: 'banquet', //default layout type.  Options: banquet, ushape, schoolroom, theater, boardroom
      roomwidth: 50, //int for room dimension. 
      roomlength: 30, //int for room dimension.  
      guestsPerTable: '', //int for guests per table. Used for banquet style only
      historyButton: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (event) {
    let name = event.target.name
    this.setState({ [name]: event.target.value })
  };

  handleSubmit (event) {
    let data = this.state;
    let jsonresp = '';
    axios.post('/api/diagrams', data)
    .then((response) => {
  
      console.log(`Saved! Response: ${response}`)
    })
    .catch((err) => console.log(err));
  }

  componentDidMount() {
    axios.get('/api/diagrams')
    .then((response) => {

    })
    .catch((err) => console.log(err));
  }

  render () {
    return (
      <div className="parentContainer">
        <DiagramContainer info={this.state}/>
        <Form indexState={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));