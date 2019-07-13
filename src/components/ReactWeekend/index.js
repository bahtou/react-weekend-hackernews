import React from 'react';

import webFountainLogo from 'Images/logo.jpg';
import HX from 'Elements/HX';
import { title, linkTitle } from './styles.css';


const styles = {
  margin: 0,
  color: '#0B69AF'
};


function ReactWeekend() {
  return (
    <>
    <a href="/" className={linkTitle}>
      <img src={webFountainLogo} alt="web-fountain-logo" width="35px" height="39px" />
      <div className={title}>
        <HX hx={'h2'} style={styles}>React</HX>
        <HX hx={'h2'} style={styles}>Weekend</HX>
      </div>
    </a>
    </>
  );
}


export default ReactWeekend;
