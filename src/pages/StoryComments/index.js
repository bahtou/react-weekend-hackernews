import React from 'react';

import { useHNcomments } from 'Hooks';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import Comments from 'Components/Comments';
import TopHeader from 'Components/TopHeader';
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
