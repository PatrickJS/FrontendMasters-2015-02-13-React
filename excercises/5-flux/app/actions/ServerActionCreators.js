var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedContacts (contacts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACTS_LOADED,
      contacts
    });
  },
  deleteContact(id) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACT_DELETED,
      id
    });
  }
};

module.exports = ServerActionCreators;

