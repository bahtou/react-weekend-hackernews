import React from 'react';
import { useHNsearch } from 'Hooks';

import { mainLayout, navLayout, contentLayout } from 'PageLayouts/styles.css';
import TopHeaderLayout from 'PageLayouts/TopHeaderLayout';
import Navigation from 'Components/Navigation';
import SearchBar from 'Components/SearchBar';
import Story from 'Components/Story';


function Search({ history }) {
  const { searchResults, performSearch } = useHNsearch();

  return (
    <div className={mainLayout}>
      <TopHeaderLayout>
        <SearchBar performSearch={performSearch} />
      </TopHeaderLayout>

      <div className={navLayout}>
        <Navigation />
      </div>

      <div className={contentLayout}>
        <ul>
          {searchResults.map((story, index) => (
            <Story key={story.id} index={index} story={story} history={history} />
          ))}
        </ul>
      </div>
    </div>

  );
}


export default Search;
