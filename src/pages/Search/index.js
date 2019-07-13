import React from 'react';

import { useHNsearch } from 'Hooks';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import SearchBar from 'Components/SearchBar';
import Story from 'Components/Story';
import TopHeader from 'Components/TopHeader';

import { container } from './styles.css';


function Search({ history }) {
  const { searchResults, performSearch } = useHNsearch();

  return (
    <MainGridLayout>
      <HeaderGrid>
        <TopHeader className={container}>
          <SearchBar performSearch={performSearch} />
        </TopHeader>
      </HeaderGrid>

      <ContentGrid>
        <ul>
          {searchResults.map((story, index) => (
            <Story key={story.id} index={index} story={story} history={history} />
          ))}
        </ul>
      </ContentGrid>
    </MainGridLayout>

  );
}


export default Search;
