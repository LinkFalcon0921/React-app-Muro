import React, { useState } from 'react';

import {
  validateUserMessage,
  SignUserMessage,
} from '../../utilities/messages/FormActions';
import ListContainer from './ListContainer';
//Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Container(props) {
  // const { children } = props;

  const [child, setChild] = useState(<div />);
  const [user, setUser] = useState(undefined);

  const signOut = () => {
    setUser(undefined);
  };

  const userName = () => {
    if (user) {
      // debugger;
      return user.userName;
    }

    return '';
  };

  //TO Signup
  const signUser = async (user, email, password) => {
    validateUserMessage(user, email, password);
  };

  //TO LOGIN
  const setAuth = async (email, password) => {
    const userCredential = await SignUserMessage(email, password);

    // console.log(userCredential);

    if (userCredential) {
      setUser(userCredential);
      return true;
    }

    return false;
  };

  // there a user register
  const isSignUp = () => {
    return user != null;
  };

  return (
    <div className="container-body m-2">
      <div id="head">
        <div className="title">
          {/* Title */}
          <a className="h1" href="/">
            CrushIt!
          </a>
        </div>
        <ToastContainer />
      </div>

      <div id="body">
        <ListContainer
          summitAdd={signUser}
          summitLog={setAuth}
          signOut={signOut}
          isSignUp={isSignUp}
          nameUser={userName}
          children={setChild}
        />
        {child}
      </div>
    </div>
  );
}
