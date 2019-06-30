import React from 'react';

import { table } from './styles.css';
import DomainHeader from './DomainHeader';
import DomainList from './DomainList';
import { useHNtopDomains } from 'Hooks';


function TopDomains() {
  const { isLoading, isError, domains } = useHNtopDomains();

  return isError
    ? (<div style={{ color: 'red' }}>Something went wrong...</div>)
    : (isLoading
      ? <div>...Loading...</div>
      : (
        <table className={table}>
          <tbody>
            <DomainHeader />
            <DomainList domains={domains} />
          </tbody>
        </table>
      ));
}


export default TopDomains;
