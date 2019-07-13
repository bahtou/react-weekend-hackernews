import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to="/">
      <img src={webFountainLogo} alt="web-fountain-logo" width="35px" height="39px" />
    </Link>
      <div className={title}>
        <Link to="/">
          <HX hx={'h2'} style={styles}>React</HX>
          <HX hx={'h2'} style={styles}>Weekend</HX>
        </Link>
      </div>
    </>
  );
}


export default ReactWeekend;
