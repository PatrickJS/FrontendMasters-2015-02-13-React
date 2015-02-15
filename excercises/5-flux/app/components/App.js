var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({

  getInitialState() {
    return ContactsStore.getState();
  },

  componentDidMount() {
    ContactsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount() {
    ContactsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(ContactsStore.getState());
  },

  deleteContact(id) {
    ViewActionCreators.deleteContact(id);
  },

  renderContacts() {

    return this.state.contacts.map((contact, index) => {
      var deleteHandler = this.deleteContact.bind(this, contact.id);
      var button = <button onClick={deleteHandler}>Delete</button>;
      return (
        <li key={contact.id}>
          {contact.first} {contact.last} {button}
        </li>
      );
    });
  },

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  }
});

module.exports = App;

