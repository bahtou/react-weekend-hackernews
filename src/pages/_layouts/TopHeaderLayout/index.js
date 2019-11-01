import React from 'react';
import ReactWeekend from 'Components/ReactWeekend';

import { topHeaderLayout } from 'PageLayouts/styles.css';
import { headerLayout, logo, content } from './styles.scss';


function TopHeaderLayout({ children, className='', style={} }) {
  return (
    <div className={topHeaderLayout}>
      <header className={headerLayout} style={style}>
        <div className={logo}>
          <ReactWeekend />
        </div>

        <div className={`${content} ${className}`}>
          { children }
        </div>
      </header>
    </div>

  );
}


export default TopHeaderLayout;
