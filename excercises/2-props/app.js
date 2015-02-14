////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// http://facebook.github.io/react/docs/reusable-components.html#prop-validation
//
// - Don't access `USERS` directly in the app, use a prop
// - Validate Gravatar's `size` property, allow it to be a
//   a number, or a string that can be converted to a number,
//   ie: `size="asdf"` should warn (hint: parseInt)
// - in emailType, what if the prop name isn't email? what if we wanted
//   the prop to be "userEmail" or "loginId"? Switch the Gravatar
//   prop name from "email" to "loginId", send a bad value, and then
//   fix the code to make the warning make sense.
// - how many times does `getDefaultProps` get called?
// - experiment with some of the other propTypes, send improper values
//   and look at the messages you get
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var md5 = require('MD5');
var validateEmail = require('./validateEmail');
var warning = require('react/lib/warning');

var GRAVATAR_URL = "http://gravatar.com/avatar";

var USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
];

var emailType = function(props, propName, componentName) {
  warning(
    validateEmail(props[propName]),
    `Invalid email '${props[propName]}' sent to 'Gravatar'. Check the render method of '${componentName}'.`
  );
};
function convertNumber(size) {
  try {
    return !isNaN(parseInt(size));
  } catch(e) {
    return false;
  }
}
var smallType = function(props, propName, componentName) {
  warning(
  convertNumber(props[propName]),
  `Invalid prop '${props[propName]}', cant convert "${props[propName]}" to number. Check the render method of '${componentName}'.`
  );
};

var Gravatar = React.createClass({
  propTypes: {
    loginId: emailType,
    size: smallType
  },

  getDefaultProps () {
    return {
      size: 16
    };
  },

  render () {
    var { loginId, size } = this.props;
    size = parseInt(size);
    var hash = md5(loginId);
    var url = `${GRAVATAR_URL}/${hash}?s=${size*2}`;
    return <img src={url} width={size} />;
  }
});

var App = React.createClass({
  getInitialState() {
    return {users: USERS};
  },
  render () {
    var users = this.state.users.map((user) => {
      return (
        <li key={user.id}>
          <Gravatar loginId={user.email} size={'36'} /> {user.name}
        </li>
      );
    });
    return (
      <div>
        <h1>Users</h1>
        <ul>{users}</ul>
      </div>
    );
  }
});

React.render(<App />, document.body);

//require('./tests').run(Gravatar, emailType);

