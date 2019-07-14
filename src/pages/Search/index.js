import React from 'react';
import { Link } from 'react-router-dom';

import { useHNsearch } from 'Hooks';

import { MainGridLayout, NavGrid, HeaderGrid, ContentGrid } from 'Layouts';
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

      <NavGrid>
        <Link to={`/`}>Home</Link>
        <Link to={`/top-domains`}>Top Domains</Link>
        <Link to={`/search`}>Search</Link>
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
