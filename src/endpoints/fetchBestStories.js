const options = {
  method: 'GET',
  mode: 'cors'
};

async function fetchBestStories(articleId) {
  const url = `http://hacker-news.firebaseio.com/v0/beststories.json`;

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
}


export default fetchBestStories;
