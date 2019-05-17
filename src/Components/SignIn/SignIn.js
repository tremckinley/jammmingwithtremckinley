import React from 'react';

class SignIn extends React.Component {

  usersName() {
    this.props.usersName()
  }

  render() {

    return (
      <div>
        <p>Signed in as {this.usersName()}. Not you?</p>
      </div>
    )
  }

}

export default SignIn;




























