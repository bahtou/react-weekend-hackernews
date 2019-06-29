import React, { useState, useEffect } from 'react';
import { table } from './styles.css';
import DomainHeader from './DomainHeader';
import DomainList from './DomainList';
import getTopDomainsFromStories from './getTopDomainsFromStories';

import hnEndpoint, {
  STORY,
  TOP_STORIES
} from 'Endpoints';


const getTopDomainsFromStories = stories => {
  const domains = stories.reduce((initDomains, story) => {
    const newDomains = initDomains.slice();
    if (!story.url) return newDomains;

    const url = new URL(story.url);
    const urlIndex = newDomains.findIndex(domainObj => domainObj.url === url.hostname);

    if (urlIndex === -1) {
      newDomains.push({url: url.hostname, score: story.score, numPosts: 1});
    } else {
      newDomains[urlIndex].score += story.score;
      newDomains[urlIndex].numPosts++;
    }

    return newDomains;
  }, []);

  domains.sort((first, second) => {
    return second.score - first.score;
  });

  //Only display the top 20 domains
  return domains.slice(0, 20);
};

async function fetchTopDomains() {
  const _stories = await hnEndpoint(TOP_STORIES);

  if (_stories.error) {
    return {isError: true, domains: []};
  }

  const storyIds = _stories.slice(0,100);
  const storyPromises = storyIds.map(async storyId => await hnEndpoint(STORY, storyId));
  const stories = await Promise.all(storyPromises);

  if (stories.some(story => story.error)) {
    return { isError: true, domains: [] };
  }

  const domains = getTopDomainsFromStories(stories);
  return { isError: false, domains };
}

const useFetchTopDomains = () => {
  const [ domains, setDomains ] = useState([]);
  const [ isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTopDomains();
      setDomains(results.domains);
      setIsLoading(false)
      setIsError(results.isError)
    };

    fetchData();
  }, []);

  return {isLoading, isError, domains}
};

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
