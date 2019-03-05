import React, { Component } from 'react';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    };
    this._phone = React.createRef();
    this._message = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormValues = this.clearFormValues.bind(this);
  }

  handleSubmit() {
    let newState = {
      message: {
        to: this._phone.current.value,
        body: this._message.current.value
      },
      submitting: true,
      error: false
    }
    this.setState(newState)
    this.clearFormValues();

    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          this.setState({
            error: false,
            submitting: false
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          })
        }
      })
  }

clearFormValues() {
  this._phone.current.value = '';
  this._message.current.value = '';
}


render() {
    console.log('canDoesWork?', JSON.stringify(this.state.message))
  return(
    <div style={{display: 'grid', jusifyItems: 'center', alignItems: 'center', gridTemplateColumns: '1fr', outline: '1px solid black'}}>
      <h1 style={{textAlign: 'center'}}>SMSForm Works!</h1>
        <input
          type='number'
          placeholder={this.state.message.to}
          ref={this._phone}
        ></input>
      <textarea
          rows='5'
          cols='50'
          placeholder='send a tasty tweet to a friend.'
          ref={this._message}
        ></textarea>
      <button style={{background: 'lightgreen'}} onClick={this.handleSubmit}>Submit</button>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
        <h3>To: {this.state.message.to}</h3>
        <h3>Message: {this.state.message.body}</h3>
      </div>
    </div>
  )
}


}

export default SMSForm;
