import React from 'react';
import ReactWeekend from 'Components/ReactWeekend';

import { header, logo, otherContainer } from './styles.scss';


function TopHeader({ children, className='', style={} }) {
  return (
    <header className={header} style={style}>
      <div className={logo}>
        <ReactWeekend />
      </div>
      <div className={`${otherContainer} ${className}`}>
        {children}
      </div>
    </header>
  );
}


export default TopHeader;
