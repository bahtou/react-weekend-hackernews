import React, { useState } from 'react';

import { MainGridLayout, HeaderGrid, NavGrid, ContentGrid } from 'Layouts';
import { TOP_DOMAINS, BEST_DOMAINS } from 'Endpoints';

import TopHeader from 'Components/TopHeader';
import Navigation from 'Components/Navigation';
import DomainTable from 'Components/DomainTable';
import Button from 'Elements/Button';

import { active, pushLeft, actionButtons } from './styles.scss';
import { useFetchDomains } from 'Hooks';


function TopDomains() {
  const [domainType, setDomainType] = useState(TOP_DOMAINS);
  const domains = useFetchDomains(domainType);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <TopHeader className={pushLeft}>
          <div className={actionButtons}>
            <Button className={domainType === TOP_DOMAINS ? `${active}`: ''} onClick={() => setDomainType(TOP_DOMAINS)}>Top Stories</Button>
            <Button className={domainType === BEST_DOMAINS ? `${active}`: ''} onClick={() => setDomainType(BEST_DOMAINS)}>Best Stores</Button>
          </div>
        </TopHeader>
      </HeaderGrid>

      <NavGrid>
        <Navigation />
      </NavGrid>

      <ContentGrid>
        <DomainTable domains={domains} />
      </ContentGrid>
    </MainGridLayout>
  );
}


export default TopDomains;
