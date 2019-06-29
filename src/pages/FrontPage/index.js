import React, { useState, useEffect } from 'react';

import Story from './Story';
import hnEndpoint, {
  STORY,
  TOP_STORIES
} from 'Endpoints';


const useFetchTopStories = limit => {
  const [ stories, setStories ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const _stories = await hnEndpoint(TOP_STORIES);

      const storyIds = _stories.slice(0, limit);
      const promises = storyIds.map(async storyId => await hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);

      setStories(results);
    };

    fetchData();
  }, []);

  return stories;
};

function TopStories() {
  const stories = useFetchTopStories(10);

  return (
    <div>
      { stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } /> )}
    </div>
  );
}


export default TopStories;
