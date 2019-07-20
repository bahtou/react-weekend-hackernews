import React from 'react';
import { useHNcomments } from 'Hooks';

import { MainGridLayout, HeaderGrid, NavGrid, ContentGrid } from 'Layouts';
import TopHeader from 'Components/TopHeader';
import Navigation from 'Components/Navigation';
import Comments from 'Components/Comments';
import HX from 'Elements/HX';


function StoryComments({ location: { state }, history }) {
  const { story } = state;
  const { comments } = useHNcomments(story.kids);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <TopHeader>
          <HX hx={'h1'}>Weekend Tech News</HX>
        </TopHeader>
      </HeaderGrid>

      <NavGrid>
        <Navigation />
      </NavGrid>

      <ContentGrid>
        {comments.length > 0
          ? <Comments story={story} comments={comments} history={history} />
          : null
        }
      </ContentGrid>
    </MainGridLayout>
  );
}


export default StoryComments;
