import React from 'react';
import Home from './Home';

const NavBar = ({ setAuthenticated }) => {
  return (
    <>
      {setAuthenticated && <Home setAuthenticated={setAuthenticated} />}
    </>
  );
}

export default NavBar;