import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Image } from 'react-bootstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Error from '../../components/error'
import Loader from '../../components/loader'

const queryClient = new QueryClient();
const locale = { locale: 'nl-NL' };

const getProduct = async (id) => {
  // If no ID is specified, return a Promise that will keep loading
  if (id === undefined) {
    return new Promise(() => {})
  }

  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}

const ProductLoader = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery(['product', id], () => getProduct(id));

  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (error) {
    return (
      <Error message={error.message} />
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
    <>
      <QueryClientProvider client={queryClient}>
        <ProductLoader />
      </QueryClientProvider>
    </>
  )
}

export default Page;
