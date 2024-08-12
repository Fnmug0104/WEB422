import axios from 'axios';

const BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = 'live_KfUATE7Wi01WVhKLFiz193xfa7G3WtoNS9pdWhzwpAHK1SrQ2rurBosNn85vP4ZK'; 

const fetchBreeds = async (query = '', page = 1, callback) => {
  try {
    
    const breedsResponse = await axios.get(`${BASE_URL}/breeds`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    const filteredBreeds = breedsResponse.data.filter(breed =>
      breed.name.toLowerCase().includes(query.toLowerCase())
    );

    const breedsPerPage = 3; 
    const start = (page - 1) * breedsPerPage;
    const end = start + breedsPerPage;
    const breedsToShow = filteredBreeds.slice(start, end);

    const imagesPromises = breedsToShow.map(breed =>
      axios.get(`${BASE_URL}/images/search?breed_id=${breed.id}`, {
        headers: {
          'x-api-key': API_KEY
        }
      })
    );

    const imagesResponses = await Promise.all(imagesPromises);

    const breedsWithImages = breedsToShow.map((breed, index) => ({
      ...breed,
      image: imagesResponses[index].data[0]?.url || '', 
    }));

    const totalPages = Math.ceil(filteredBreeds.length / breedsPerPage);

    callback(breedsWithImages, totalPages);
  } catch (error) {
    console.error('Error fetching breeds:', error);
  }
};

export { fetchBreeds };