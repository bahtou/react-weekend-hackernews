import React from 'react';

import Story from './Story';
import useFetchTopStories from '../../hooks/useFetchTopStories';

function TopStories() {
  const { isLoading, isError, stories } = useFetchTopStories(10);

  return isError
  ? <div>Something went wrong...</div>
  : isLoading
  ? <div>...Loading...</div>
  :(
    <div>
      { stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } /> )}
    </div>
  );
}


export default TopStories;
