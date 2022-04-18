import React, { useRef } from 'react';

export default function Signup(props) {
  const { summit } = props;

  const userName = useRef();
  const email = useRef();
  const passWord = useRef();

  const summitAction = (e) => {
    e.preventDefault();
    summit(userName.current.value, email.current.value, passWord.current.value);
  };

  //Action to show/hide the password
  const showPass = () => {
    //user password
    const passInput = document.getElementById('password');
    //password checkbox
    const checkBox = document.getElementById('check-pass');
    //message to password checkbox
    const message = document.getElementById('check-message');

    if (checkBox.checked) {
      passInput.type = 'text';
      message.innerText = 'Hide password';
    } else {
      passInput.type = 'password';
      message.innerText = 'Show password';
    }
  };

  //login check in props - method

  return (
    <div onSubmit={summitAction} className="container ">
      <div className="flex justify-content-center">
        <div className="login-wrap p-4 p-md-5">
          <div className=" d-flex align-items-center justify-content-center">
            <span className="fa fa-user-o fa-5x"></span>
          </div>
          <h3 className="text-center mb-4">Registrate</h3>
          <form className="login-form">
            <div className="form-group mb-4">
              <input
                required
                ref={userName}
                type="text"
                className="form-control rounded-left"
                placeholder="Name"
              />
            </div>
            <div className="form-group mb-4">
              <input
                required
                ref={email}
                type="email"
                className="form-control rounded-left"
                placeholder="Email"
              />
            </div>
            <div className="form-group d-flex mb-4">
              <input
                required
                id="password"
                ref={passWord}
                type="password"
                className="form-control rounded-left"
                placeholder="Password"
              />
            </div>
            {/* checkBox */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="check-pass"
                onClick={showPass}
              />
              <i
                className="form-check-label"
                id="check-message"
                htmlFor="messagePass"
              >
                Show password
              </i>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn btn-primary rounded submit px-3"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
