import React, { useState, useEffect } from 'react';
import Publish from '../views/Publish';
import News from '../views/News';
import Signup from '../views/Signup';
import Login from '../views/Login';

export default function ListContainer(props) {
  const { signOut, nameUser, isSignUp, children, summitLog, summitAdd } = props;

  const [page, setPage] = useState(1);

  // console.log(nameUser());

  const signInAction = async (email, password) => {
    const valid = await summitLog(email, password);

    if (valid) {
      setPage(1);
    }
  };

  const signOutAction = () => {
    signOut();
    setPage(1);
  };

  useEffect(() => {
    switch (page) {
      //pagina publicar
      case 2:
        children(<Publish user={nameUser} />);
        break;
      //pagina inicio sesion
      case 3:
        children(<Login summit={signInAction} />);
        break;
      //pagina registro
      case 4:
        children(<Signup summit={summitAdd} />);
        break;
      default:
        children(<News />);
    }
  }, [page]);

  const redirectTo = () => {
    if (isSignUp()) {
      return (
        // Link publicar
        <>
          <a className="nav-link h4" onClick={() => setPage(2)}>
            Publicar
          </a>
          <div className="bg-transparent text-center">
            <i className="h2 ">{nameUser()}</i>
            <a className="nav-link h4" onClick={signOutAction}>
              Salir sesion
            </a>
          </div>
        </>
      );
      // if not logged in
    } else {
      return (
        /* Link publicar */
        <>
          <a className="nav-link h4" onClick={() => setPage(3)}>
            Iniciar sesion
          </a>
          <a className="nav-link h4" onClick={() => setPage(4)}>
            Registrate
          </a>
        </>
      );
    }
  };

  return (
    <div className="pathing bg-sky col-2">
      <ul className="nav flex-column">
        <li className="nav-item">
          {/* Link inicial */}
          <a
            className="nav-link h4"
            aria-current="page"
            onClick={() => setPage(1)}
          >
            Inicio
          </a>
          {/* end Link inicial */}
        </li>
        <li className="nav-item">{redirectTo()}</li>
      </ul>
    </div>
  );
}
