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

  // Page is rendered server-side, so useEffect is used to allow
  //  Optimizely to modify the DOM without creating hydration errors.
  useEffect(() => {
    const optimizely = window.optimizely || [];

    // Manually activate the page to avoid any timing issues
    optimizely.push({
      type: 'page',
      pageName: '21801710869_product_detail_page'
    });

    // At this point Optimizely will update the DOM
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
             alt=''
           />
         </Col>
        ))}
      </Row>
      <Link href='/'>Back to home</Link>
    </>
  )
};

export { getServerSideProps };
export default Page;
