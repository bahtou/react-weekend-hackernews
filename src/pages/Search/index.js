import React from 'react';
import { useHNsearch } from 'Hooks';

import { MainGridLayout, NavGrid, HeaderGrid, ContentGrid } from 'Layouts';
import TopHeader from 'Components/TopHeader';
import Navigation from 'Components/Navigation';
import SearchBar from 'Components/SearchBar';
import Story from 'Components/Story';

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

      <NavGrid>
        <Navigation />
      </NavGrid>

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
