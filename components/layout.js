import Head from 'next/head';
import Script from 'next/script'
import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Layout = ({ children }) => (
  <>
    <link rel="preload" href="//cdn.optimizely.com/js/21801710869.js" as="script"></link>
    <link rel="preconnect" href="//logx.optimizely.com"></link>
    <Script src='https://cdn.optimizely.com/js/21801710869.js' strategy='beforeInteractive' />
    <Head>
      <title>Optimizely Next.js Sandbox</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/lorum-ipsum" passHref>
              <Nav.Link>Lorum ipsum</Nav.Link>
            </Link>
            <Link href="/office-ipsum" passHref>
              <Nav.Link>Office ipsum</Nav.Link>
            </Link>
            <Link href="/cat-ipsum" passHref>
              <Nav.Link>Cat ipsum</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;
