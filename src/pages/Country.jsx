import { Section, Container, CountryInfo, Heading, Loader } from 'components';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const { countryId } = useParams()
  const [countrie, setCountry] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const linkBack = location?.state?.from ?? '/'

  useEffect(() => {
    const currentCountry = async () => {
      setLoading(true);
      // setError(null);
      try {
        const data = await fetchCountry(countryId);
        // console.log(data)
        setCountry(data);
      } catch (error) {
        setError(error.message)
      }
      finally { setLoading(false) }
    }

    currentCountry();
    // return () => {
    console.log(countrie);
    // }
  }, [countryId])
  const { flag, capital, countryName, id, languages = [], population, } = countrie;
  return (
    <Section>
      <Link to={linkBack}> Go Back </Link>
      <Container>
        {loading && <Loader />}
        {!error ? (<CountryInfo
          flag={flag}
          capital={capital}
          country={countryName}
          id={id}
          languages={languages}
          population={population} />) : (
          <Heading> {error}</Heading>)
        }

      </Container>
    </Section>
  );
};//
