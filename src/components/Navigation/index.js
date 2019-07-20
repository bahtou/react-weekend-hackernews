import React from 'react';
import { Link } from 'react-router-dom';

import HX from 'Elements/HX';
import { nav } from './styles.scss';


function Navigation() {
  return (
    <ul className={nav}>
      <li><Link to={`/`}><HX hx={'h1'}>Home</HX></Link></li>
      <li><Link to={`/top-domains`}><HX hx={'h1'}>Top Domains</HX></Link></li>
      <li><Link to={`/search`}><HX hx={'h1'}>Search</HX></Link></li>
    </ul>
  );
}


export default Navigation;
