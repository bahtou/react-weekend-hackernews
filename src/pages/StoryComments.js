import React from 'react';
import { useHNcomments } from 'Hooks';

import { mainLayout, navLayout, contentLayout } from 'PageLayouts/styles.css';
import TopHeaderLayout from 'PageLayouts/TopHeaderLayout';
import Navigation from 'Components/Navigation';
import Comments from 'Components/Comments';
import HX from 'Elements/HX';


function StoryComments({ location: { state }, history }) {
  const { story } = state;
  const { comments } = useHNcomments(story.kids);

  return (
    <div className={mainLayout}>
      <TopHeaderLayout>
        <HX hx={'h1'}>Weekend Tech News</HX>
      </TopHeaderLayout>

      <div className={navLayout}>
        <Navigation />
      </div>

      <div className={contentLayout}>
        {comments.length > 0
          ? <Comments story={story} comments={comments} history={history} />
          : null
        }
      </div>
    </div>
  );
}


export default StoryComments;
