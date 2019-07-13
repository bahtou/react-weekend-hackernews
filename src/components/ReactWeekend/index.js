import React from 'react';
import { NavLink } from 'react-router-dom';

import webFountainLogo from 'Images/logo.jpg';
import HX from 'Elements/HX';
import { title } from './styles.css';
const styles = {
  margin: 0,
  color: '#0B69AF'
};

function ReactWeekend() {
  return (
    <>
      <NavLink to='/'>
        <img
          src={webFountainLogo}
          href='/'
          alt='web-fountain-logo'
          width='35px'
          height='39px'
        />
      </NavLink>
      <div className={title}>
        <HX hx={'h2'} style={styles}>
          React
        </HX>
        <HX hx={'h2'} style={styles}>
          Weekend
        </HX>
      </div>
    </>
  );
}

export default ReactWeekend;
