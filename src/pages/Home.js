import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getStoriesRequested, refreshStoriesRequested } from 'Sagas/stories';
import { TOP_STORIES } from 'Endpoints';

import { mainLayout, navLayout, contentLayout } from 'PageLayouts/styles.css';
import TopHeaderLayout from 'PageLayouts/TopHeaderLayout';
import Navigation from 'Components/Navigation';
import Story from 'Components/Story';
import HX from 'Elements/HX';
import { Refresh as RefreshIcon } from 'Elements/Icons';


const numStories = 20;
function Home({ history }) {
  const stories = useSelector(state => state.STORIES[TOP_STORIES]);
  const dispatch = useDispatch();

  if (!stories.length) {
    dispatch(getStoriesRequested(TOP_STORIES, numStories));
  }

  function handleRefresh() {
    dispatch(refreshStoriesRequested(TOP_STORIES, numStories));
  }

  return (
    <div className={mainLayout}>
      <TopHeaderLayout>
        <HX hx={'h1'} style={{ margin: '0 auto' }}>Weekend Tech News</HX>
        <RefreshIcon
          title="Refresh Stories"
          style={{ cursor: 'pointer', width: '15px' }}
          onClick={() => handleRefresh()} />
      </TopHeaderLayout>

      <div className={navLayout}>
        <Navigation />
      </div>

      <div className={contentLayout}>
        <ul>
          {stories.map((story, index) => <Story key={story.id} index={index} story={story} history={history} />)}
        </ul>
      </div>
    </div>
  );
}


export default Home;
