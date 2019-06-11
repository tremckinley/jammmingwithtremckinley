import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  componentWillMount () {
    this.props.onGetName()
  }
  
  renderAction() {
    if (this.props.usersName) {
      return (<p className="verify">Signed in as: {this.props.usersName} </p>);
    } else {
      return (<p className="verify" id="notYou">Please Sign In</p>);
    };
  }

  render() {
    return (
    <div>
      <div className='signIn'>  
      {this.renderAction()}
      </div>
    </div>
    )
  }

}

export default SignIn;

























