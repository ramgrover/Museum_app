/*********************************************************************************
* BTI425 – Assignment 4
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
* Name: ______Ram Grover______ Student ID: _____158824219_____ Date: _____21-03-2024_____
*
********************************************************************************/ 
import { Row, Col } from 'react-bootstrap';
import Layout from '@/components/Layout';

const Home = () => {
  const wikipediaLink = "https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art";

  const containerStyle = {
    height: '100vh',
    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textContainerStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: 'darkpurple',
    opacity: 100, // Initial opacity set to 0
    animation: 'fadeIn 2s forwards',
    
  };

  return (
    <Layout>
      <Row style={containerStyle}>
        <Col md={6} style={textContainerStyle}>
          <p color='black'>
            The Metropolitan Museum of Art (The Met) is one of the world&apos;s largest and finest art museums.
            It is located in New York City&apos;s Central Park.
          </p>
          <p>
            Visit the Met&apos;s Wikipedia page for more information:
            {' '}
            <a href={wikipediaLink} target="_blank" rel="noreferrer">Metropolitan Museum of Art - Wikipedia</a>
          </p>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
