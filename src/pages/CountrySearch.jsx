import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(null)
  const [countryList, setCountryList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  // const handleSubmit = (value) => { setQuery(value); setSearchParams({ query: query }) };

  // console.log(query);
  useEffect(() => {
    const region = searchParams.get('query')
    if (!region) return;
    const getByRegion = async () => {
      setError(null);
      setLoader(true);
      try {
        const resp = await fetchByRegion(region)
        // console.log('resp', resp)
        setCountryList(resp);
      } catch (error) {
        setError(error.message)
      }
      finally { setLoader(false) }
    }
    // return () => {}
    getByRegion();
  }, [searchParams])
  // console.log('error', error)
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={setSearchParams} />
        {error && <Heading>error</Heading>}
        {!error && <CountryList countries={countryList} />}
        {loader && <Loader />}
      </Container>
    </Section>
  );
};
