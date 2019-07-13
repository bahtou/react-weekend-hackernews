import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTopDomainsRequested } from 'Saga/topDomains';
import { TOP_STORIES, BEST_STORIES } from 'Endpoints';

import { MainGridLayout, HeaderGrid, NavGrid, ContentGrid } from 'Layouts';

import ReactWeekend from 'Components/ReactWeekend';
import DomainTable from 'Components/DomainTable';
import TopHeader from 'Components/TopHeader';
import Button from 'Elements/Button';

import { pushLeft, actionButtons } from './styles.scss';


function TopDomains() {
  const domains = useSelector(state => state.TOP_DOMAINS[TOP_STORIES]);
  const dispatch = useDispatch();
  const numStories = 100;

  useEffect(() => {
    if (!domains) {
      dispatch(fetchTopDomainsRequested(TOP_STORIES, numStories));
    }
  }, [domains]);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <TopHeader className={pushLeft}>
          <div className={actionButtons}>
            <Button onClick={() => console.log('top stories')}>Top Stories</Button>
            <Button onClick={() => console.log('best stories')}>Best Stories</Button>
          </div>
        </TopHeader>
      </HeaderGrid>

      <ContentGrid>
        <DomainTable domains={domains} />
      </ContentGrid>
    </MainGridLayout>
  );
}


export default TopDomains;
