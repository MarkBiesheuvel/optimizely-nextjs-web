import axios from 'axios';
import { useEffect  } from 'react';
import Link from 'next/link';
import { Row, Col, Image } from 'react-bootstrap';

const getServerSideProps = async (context) => {
  const id = context.params.id;
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return {
    props: { data }
  };
};

const Page = ({ data }) => {
  const { title, description, images } = data;

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
             alt=''
           />
         </Col>
        ))}
      </Row>
    </>
  )
};

export { getServerSideProps };
export default Page;
