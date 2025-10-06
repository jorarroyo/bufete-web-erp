import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import authService from 'app/services/authService';
import {FuseSplashScreen} from '@fuse';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitAuthCheck: true,
    };
  }

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      // this.firebaseCheck(),
      // this.auth0Check(),
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise(resolve => {
      authService.on('onAutoLogin', () => {
        this.props.showMessage({ message: 'Logging in with JWT' });

        /**
         * Sign in and retrieve user data from Api
         */
        authService
          .signInWithToken()
          .then(user => {
            this.props.setUserData(user);

            resolve();

            this.props.showMessage({ message: 'Logueado con JWT' });
          })
          .catch(error => {
            this.props.showMessage({ message: error });

            resolve();
          });
      });

      authService.on('onAutoLogout', message => {
        if (message) {
          this.props.showMessage({ message, variant: 'error'});
        }

        this.props.logout();

        resolve();
      });

      authService.on('onNoAccessToken', () => {
        resolve();
      });

      authService.init();

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? <FuseSplashScreen /> : <React.Fragment children={this.props.children} />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Auth);
