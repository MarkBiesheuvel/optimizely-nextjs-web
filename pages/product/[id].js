import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();
const locale = { locale: 'nl-NL' };

const getProduct = async (id) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}

const ProductLoader = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery(['product', id], () => getProduct(id));

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

  const { title, price, description, images } = data;

  return (
    <>
     <h1>{title}</h1>
     <p>{description}</p>
     <Row>
       {images.map((image, index) => (
        <Col key={index} xs={4}>
          <Image
            src={image}
            fluid={true}
            alt=""
          />
        </Col>
       ))}
     </Row>
     <Link href="/">Back to home</Link>
    </>
  )
}


const Page = () => {
  return (
    <div>
      <Head>
        <title>Optimizely Next.js Sandbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <QueryClientProvider client={queryClient}>
          <ProductLoader />
        </QueryClientProvider>
      </Container>
    </div>
  )
}

export default Page;
