var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  contacts: [],
  loaded: false
};

var setState = (newState) => {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
};

var ContactsStore = {
  addChangeListener (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState () {
    return state;
  }
};

ContactsStore.dispatchToken = AppDispatcher.register(payload => {
  var { action: {type, contacts, id} } = payload;

  console.log(type);
  if (type === ActionTypes.CONTACTS_LOADED) {
    setState({
      loaded: true,
      contacts
    });
  }
  else if (type === ActionTypes.CONTACT_DELETED) {
    setState({
      loaded: true,
      contacts: (
        state
        .contacts
        .filter(contact => contact.id !== id)
      )
    });
  }

});

module.exports = ContactsStore;

