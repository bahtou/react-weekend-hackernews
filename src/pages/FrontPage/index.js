import React from 'react';

import { useHNStories } from 'Hooks';
import Story from './Story';
import { TOP_STORIES } from '../../endpoints';

function TopStories() {
  const { isLoading, isError, stories } = useHNStories(TOP_STORIES, 10);

  return isError
    ? <div>Something went wrong...</div>
    : isLoading
      ? <div>...Loading...</div>
      :(
        <div>
          {stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } /> )}
        </div>
      );
}


export default TopStories;
