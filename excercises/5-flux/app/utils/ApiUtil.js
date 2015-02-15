var xhr = require('../lib/xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var ApiUtils = {
  loadContacts () {
    xhr.getJSON(`${API}/contacts`, (err, res) => {
      ServerActionCreators.loadedContacts(res.contacts);
    });
  },
  deleteContact(id) {
    xhr.deleteJSON(`${API}/contacts/${id}`, () => {
      ServerActionCreators.deleteContact(id);
    });

  }
};

module.exports = ApiUtils;

