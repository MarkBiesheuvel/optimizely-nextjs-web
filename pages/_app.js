import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Layout from '../components/layout'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    window.optimizely.push({type: 'activate'});
  });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
