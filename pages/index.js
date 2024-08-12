import { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import BreedCard from '../components/BreedCard';
import PaginationComponent from '../components/Pagination';
import { fetchBreeds } from '../pages/api/api';
import { useSession } from 'next-auth/react';
import withAuth from '../components/withAuth';



const Home = () => {
  const [breeds, setBreeds] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('home');
  const { data: session, status } = useSession();



  useEffect(() => {
    if (activeTab === 'home' || activeTab === 'search') {
      fetchBreeds(query, currentPage, (data, total) => {
        setBreeds(data);
        setTotalPages(total);
      });
    }
  }, [activeTab, currentPage, query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1); 
    setActiveTab('search');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (activeTab === 'home' || activeTab === 'search') {
      return (
        <>
          <SearchBar onSearch={handleSearch} />
          <Row>
            {breeds.map((breed) => (
              <Col key={breed.id} sm={12} md={6} lg={4}>
                <BreedCard breed={breed} />
              </Col>
            ))}
          </Row>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      );
    } else if (activeTab === 'about') {
      return (
        <Container className="about" id="about">
          <h2>About Us</h2>
          <p>
            We have the full collection of dog breeds. Take your pick! Choose your favorites!
          </p>
        </Container>
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#" onClick={() => setActiveTab('home')}>Doggos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => setActiveTab('home')}>Home</Nav.Link>
              <Nav.Link href="#" onClick={() => setActiveTab('favorites')}>Favorites</Nav.Link>
              <Nav.Link href="#" onClick={() => setActiveTab('about')}>About Us</Nav.Link>
              <Nav.Link href="#" onClick={() => setActiveTab('search')}>Search</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="header">
        <h1>Dog Breeds</h1>
      </Container>

      <Container>
        {renderContent()}
      </Container>

      <footer className="footer">
        <Container>
          <Row>
            <Col md={6}>
              <span>&copy; 2024 Web Project Summer. All rights reserved.</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};



export default withAuth(Home);
