import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import { useEffect  } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Image } from 'react-bootstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Error from '../../components/error'
import Loader from '../../components/loader'

const queryClient = new QueryClient();
const locale = { locale: 'nl-NL' };

const getServerSideProps = async (context) => {
  const id = context.params.id;
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return {
    props: { data }
  };
};

const Page = ({ data }) => {
  const { title, price, description, images } = data;

  useEffect(() => {
    const optimizely = window.optimizely || [];
    optimizely.push({
      type: 'page',
      pageName: '21514690867_localhost'
    });
  });

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
};

export { getServerSideProps };
export default Page;
