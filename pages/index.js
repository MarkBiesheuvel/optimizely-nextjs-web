import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import Head from 'next/head';
import { useState } from 'react';
import { Container, FormControl, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();
const locale = { locale: 'nl-NL' };

const searchProducts = async (query) => {
  const { data } = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return data.products;
}

const ProductCard = ({ product }) => {
  const { id, title, price, description, thumbnail } = product;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={thumbnail}
        style={{ maxHeight: 200 }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{currencyFormatter.format(price, locale)}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Link href={`/product/${id}`}>More info</Card.Link>
      </Card.Body>
    </Card>
  )
}

const ProductLoader = ({ query }) => {
  const { isLoading, error, data } = useQuery(['products', query], () => searchProducts(query));

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
        An error has occurred: {error.message}
      </Alert>
    )
  }

  if (data) {
    return (
      <Row>
        {data.map((product) => (
          <Col key={product.id} xs={4} className="mb-3">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    )
  } else {
    return 'No products found';
  }
}

const Page = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Head>
        <title>Optimizely Next.js Sandbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Products</h1>
        <Row>
          <Col xs={4} className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
            />
          </Col>
        </Row>
        <QueryClientProvider client={queryClient}>
          <ProductLoader query={query} />
        </QueryClientProvider>
      </Container>
    </div>
  )
}

export default Page;
