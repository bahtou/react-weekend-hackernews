import React, { useState, useEffect } from 'react';

import Domain from './Domain';

async function fetchStory(articleId) {
  try {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' }); 
    const results = await response.json();
    return results;
  } catch(error) {
    return {error}
  }
}

async function fetchStories() {
  try {
    const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', { method: 'GET', mode: 'cors' });
    const results = await response.json();
    return results;
  } catch(error) {
    return {error}
  }
}

const getTopDomainsFromStories = (stories) => {
  const domains = stories.reduce((initDomains, story) => {
    const newDomains = initDomains.slice()
    if (!story.url) return newDomains
    const url = new URL(story.url);
    const urlIndex = newDomains.findIndex(domainObj => domainObj.url === url.hostname)
    if(urlIndex === -1) {
      newDomains.push({url: url.hostname, score: story.score, numPosts: 1})
    } else {
      newDomains[urlIndex].score += story.score;
      newDomains[urlIndex].numPosts ++
    }
    return newDomains
  }, []);
  domains.sort((first, second) => {
    return second.score - first.score
  })
  //Only display the top 20 domains
  return domains.slice(0,20)
}

async function fetchTopDomains() {
  const _stories = await fetchStories();

  if(_stories.error) {
    return {isError: true, domains: []}
  }

  const storyIds = _stories.slice(0,100);
  const storyPromises = storyIds.map(async storyId => await fetchStory(storyId));
  const stories = await Promise.all(storyPromises);
  if(stories.some(story => story.error)) {
    return {isError: true, domains: []}
  } 
  const domains = getTopDomainsFromStories(stories)
  return {isError: false, domains}
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
  const {isLoading, isError, domains} = useFetchTopDomains();

  return  isError
  ? (<div style={{color: 'red'}}>Something went wrong...</div>)
  : (isLoading
  ? <div>...Loading...</div>
  : (
    <table>
      <tbody>
        <tr>
          <th>Domain</th>
          <th>Score</th>
          <th># Posts</th>
        </tr>
      { domains.map((domain, index) => (
        <tr key={ domain.url}>
            <td>{domain.url}</td>
            <td>{domain.score}</td>  
            <td>{domain.numPosts}</td>
        </tr> ))}
      </tbody>
    </table>
  ));
}


export default TopDomains;
