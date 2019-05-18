import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  componentWillMount () {
    this.props.onGetName()
  }
  
  render() {
    return (
    <div>
      <div className='signIn'>  
      <p className="verify">Signed in as {this.props.usersName}. 
      <a id='notYou' href='#'>Not you?</a></p>
      </div>
    </div>
    )
  }

}

export default SignIn;




























