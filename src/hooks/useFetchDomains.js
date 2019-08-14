import { useDispatch, useSelector } from 'react-redux';
import { getTopDomainsRequested } from 'Sagas/domains';


function useFetchDomains(domainType) {
  const domains = useSelector(state => state.DOMAINS[domainType]);
  const dispatch = useDispatch();

  if (!domains.length) {
    const numStories = 100;
    dispatch(getTopDomainsRequested(domainType, numStories));
  }

  return domains;
}


export default useFetchDomains;
