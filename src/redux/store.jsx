import { createStore } from 'redux';
import reducer from './reducer';


const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

// Create the Redux store with the persisted state
const store = createStore(reducer, persistedState);

// Subscribe to changes in the Redux store
store.subscribe(() => {
  // Save the current state to localStorage
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


export default store;