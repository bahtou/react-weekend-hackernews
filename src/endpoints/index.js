import fetchBestStories from './fetchBestStories';
import fetchComment from './fetchComment';
import fetchSearch from './fetchSearch';
import fetchStory from './fetchStory';
import fetchTopStories from './fetchTopStories';


export const BEST_DOMAINS = Symbol('BEST_DOMAINS').description;
export const TOP_DOMAINS = Symbol('TOP_DOMAINS').description;
export const BEST_STORIES = Symbol('BEST_STORIES').description;
export const TOP_STORIES = Symbol('TOP_STORIES').description;
export const COMMENT = Symbol('COMMENT').description;
export const SEARCH = Symbol('SEARCH').description;
export const STORY = Symbol('STORY').description;


const hnAPI = {
  [BEST_STORIES]: fetchBestStories,
  [TOP_STORIES]: fetchTopStories,
  [COMMENT]: fetchComment,
  [SEARCH]: fetchSearch,
  [STORY]: fetchStory,
};


export default function hnEndpoint(name, params) {
  return hnAPI[name](params);
}
