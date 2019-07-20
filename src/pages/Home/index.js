import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useHNstories } from 'Hooks';
import { TOP_STORIES } from 'Endpoints';

import { MainGridLayout, NavGrid, HeaderGrid, ContentGrid } from 'Layouts';
import Story from 'Components/Story';
import TopHeader from 'Components/TopHeader';
import HX from 'Elements/HX';


const numStories = 20;
function Home({ history }) {
  const { stories } = useHNstories(TOP_STORIES, numStories);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <TopHeader>
          <HX hx={'h1'}>Weekend Tech News</HX>
        </TopHeader>
      </HeaderGrid>

      <NavGrid>
        <Link to={`/`}>Home</Link>
        <Link to={`/top-domains`}>Top Domains</Link>
        <Link to={`/search`}>Search</Link>
      </NavGrid>

      <ContentGrid>
        <ul>
          {stories.map((story, index) => <Story key={story.id} index={index} story={story} history={history} />)}
        </ul>
      }
      </ContentGrid>
    </MainGridLayout>
  );
}


export default Home;
