import React from 'react';
import ReactWeekend from 'Components/ReactWeekend';

import { header, logo, content } from './styles.scss';


function TopHeader({ children, className='', style={} }) {
  return (
    <header className={header} style={style}>
      <div className={logo}>
        <ReactWeekend />
      </div>
      <div className={`${content} ${className}`}>
        {children}
      </div>
    </header>
  );
}


export default TopHeader;
