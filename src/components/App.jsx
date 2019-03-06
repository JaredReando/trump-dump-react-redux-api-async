import React from 'react';
import SMSForm from './SMSForm';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {v4} from 'uuid';

const initialState = {
  messages: {},
  firstPost: true
};

function reducer(state= initialState, action) {
  let messageId = v4();
  let newMessage;
  switch (action.type) {
  case 'GET_DUMP':
    // let messageId = v4();
    newMessage = {...state.messages, [messageId] : {to: action.to, message: null, id: messageId }};
    return { ...state, messages: newMessage };
  default:
    return state;
  }
}

const store= createStore(reducer);

store.subscribe(()=> {
  console.log( store.getState() ); //eslint-disable-line no-console

});


function App() {
  return (
    <div>
      <Provider store={store}>
        <SMSForm />
      </Provider>
    </div>
  );
}

export default App;
