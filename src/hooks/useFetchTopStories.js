import React, { useState, useEffect } from 'react';

async function fetchStory(articleId) {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' });
        const results = await response.json();
        return results;
    } catch(error) {
        return { error }
    }
}
  
async function fetchStories() {
    try {
        const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json', { method: 'GET', mode: 'cors' });
        const results = await response.json();
        return results;
    } catch(error) {
        return { error }
    }
}

async function fetchTopStories(limit) {
    const _stories = await fetchStories();

    if(_stories.error) {
        return { isLoading: false, isError: true, stories: [] }
    }

    const storyIds = _stories.slice(0,limit);
    const storyPromises = storyIds.map(async storyId => await fetchStory(storyId));
    const stories = await Promise.all(storyPromises);
    if(stories.some(story => story.error)) {
        return { isLoading: false, isError: true, stories: [] }
    }
    return { isLoading: false , isError: false, stories }
}

const useFetchTopStories = limit => {
    const [ stories, setStories ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        const results = await fetchTopStories(limit)
        setStories(results.stories);
        setIsLoading(results.isLoading);
        setIsError(results.isError)
        };

        fetchData();
    }, []);

    return { isLoading, isError, stories };
};

export default useFetchTopStories;