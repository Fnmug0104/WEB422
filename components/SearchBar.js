import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="searchQuery">
        <Form.Control
          type="text"
          placeholder="Search for a breed"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
