import React, { useState, useEffect } from 'react';
import { table } from './styles.css';
import DomainHeader from './DomainHeader';
import DomainList from './DomainList';
import useFetchTopStories from '../../hooks/useFetchTopStories';
import getTopDomainsFromStories from './getTopDomainsFromStories';

function TopDomains() {
  const {isLoading, isError, stories} = useFetchTopStories();
  const domains = getTopDomainsFromStories(stories);

  return  isError
  ? (<div style={{ color: 'red' }}>Something went wrong...</div>)
  : (isLoading
  ? <div>...Loading...</div>
  : (
    <table className={ table }>
      <tbody>
        <DomainHeader />
        <DomainList domains={ domains } />      
      </tbody>
    </table>
  ));
}


export default TopDomains;
