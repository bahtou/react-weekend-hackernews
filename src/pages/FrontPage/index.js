import React from 'react';

import { useHNtopStories } from 'Hooks';
import Story from './Story';


function TopStories() {
  const { isLoading, isError, stories } = useHNtopStories(10);

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
