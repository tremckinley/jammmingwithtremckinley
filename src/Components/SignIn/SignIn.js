import React from 'react';

class SignIn extends React.Component {

  usersName() {
   return this.props.usersName();
  }

  renderAction() {
    return (
        <p>Signed in as {this.usersName()}. Not you?</p>
    )
  }

  render() {
    return (
    <div>  
    {this.renderAction()}
    </div>
    )
  }

}

export default SignIn;




























