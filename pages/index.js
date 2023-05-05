import Link from 'next/link';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import { useState } from 'react';
import { FormControl, Row, Col, Card, Toast  } from 'react-bootstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Error from '../components/error';
import Loader from '../components/loader';

const queryClient = new QueryClient();
const locale = { locale: 'nl-NL' };

const searchProducts = async (query) => {
  const { data } = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return data.products;
};

const ProductCard = ({ product }) => {
  const { id, title, price, description, thumbnail } = product;

  // Simple product overview using react-bootstrap
  return (
    <Card>
      <Card.Img
        variant='top'
        src={thumbnail}
        style={{ maxHeight: 200 }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{currencyFormatter.format(price, locale)}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Link href={`/product/${id}`} passHref>
          <Card.Link>More info</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  );
};

const ProductLoader = ({ query }) => {
  // Retrieve products from using react-query
  const { isLoading, error, data } = useQuery(['products', query], () => searchProducts(query));

  // If the API request is still loading, show a loading screen
  if (isLoading) {
    return (
      <Loader />
    );
  }

  // If the API request gave an error, show error message
  if (error) {
    return (
      <Error message={error.message} />
    );
  }

  // Render all products
  if (data) {
    return (
      <Row>
        {data.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className='mb-3'>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  } else {
    return (
      <p>No products found</p>
    );
  }
};

const Page = () => {
  // Create a state variable for query string.
  // Use the setQuery function anytime the user updates the query string.
  const [query, setQuery] = useState('');

  // Render page
  return (
    <>
      <h1>Products</h1>
      <Row>
        <Col xs={12} sm={6} className='mb-5'>
          <h4>Description</h4>
          <p>
            This page is client-side rendered using Next.js and React.
            A React State hook and Effect hook are used to interact between Optimizely and React.
          </p>
        </Col>
        <Col xs={12} sm={6} className='mb-5'>
          <h4>Search</h4>
          <FormControl
            placeholder='Enter your search query...'
            aria-label='Search'
            value={query}
            onChange={(evt) => setQuery(evt.target.value)}
          />
        </Col>
      </Row>
      <QueryClientProvider client={queryClient}>
        <ProductLoader query={query} variation="ProductCard" />
      </QueryClientProvider>
    </>
  );
};

export default Page;
