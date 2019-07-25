import { useDispatch, useSelector } from 'react-redux';
import { fetchTopDomainsRequested } from 'Saga/domains';


function useFetchDomains(domainType) {
  const domains = useSelector(state => state.DOMAINS[domainType]);
  const dispatch = useDispatch();

  if (!domains.length) {
    const numStories = 100;
    dispatch(fetchTopDomainsRequested(domainType, numStories));
  }

  return domains;
}


export default useFetchDomains;
