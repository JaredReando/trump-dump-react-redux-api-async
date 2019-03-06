import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      }
    };
    this._phone = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormValues = this.clearFormValues.bind(this);

    console.log(props); //eslint-disable-line no-console
  }

  componentDidMount() {
    const axios = require('axios');

    axios.get('https://api.tronalddump.io/random/quote')
      .then(response => {
        this.setState({trumpQuote: response.data.value});
      });

  }

  handleSubmit() {

    this.props.dispatch({type: 'GET_DUMP', to: this._phone.current.value});


    let newState = {
      message: {
        to: this._phone.current.value,
        body: this.state.trumpQuote
      },
      submitting: true,
      error: false
    };
    this.setState(newState);
    let messageNow = {
      to: this._phone.current.value,
      body: this.state.trumpQuote
    };

    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageNow)
    });

  }

  clearFormValues() {
    this._phone.current.value = '';

  }


  render() {

    return(
      <div style={{display: 'grid', jusifyItems: 'center', alignItems: 'center', gridTemplateColumns: '1fr', outline: '1px solid black'}}>
        <h1 style={{textAlign: 'center'}}>SMSForm Works!</h1>
        <input
          type='number'
          placeholder={this.state.message.to}
          ref={this._phone}
        ></input>


        <button style={{background: 'lightgreen'}} onClick={this.handleSubmit}>Submit</button>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
          <h3>To: {this.state.message.to}</h3>
          <h3>Message: {this.state.message.body}</h3>
        </div>
      </div>
    );
  }


}


SMSForm.propTypes={
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {

  return {messages: state.messages};
};


export default connect(mapStateToProps)(SMSForm);
