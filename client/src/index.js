import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'firebase/firestore'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBCAcyGP3RZP2Z-mEvqgDCBbWzW4w5h61A",
  authDomain: "chat-react-ec2e6.firebaseapp.com",
  projectId: "chat-react-ec2e6",
  storageBucket: "chat-react-ec2e6.appspot.com",
  messagingSenderId: "834110186741",
  appId: "1:834110186741:web:0b416afb246b96adc2d1bc",
  measurementId: "G-FMNC2GGZXL"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()
const Context = createContext(null)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Context.Provider value={{ firebase, firestore }}>
        <App />
      </Context.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export{
  Context
}
