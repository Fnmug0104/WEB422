import { Card } from 'react-bootstrap';
import styles from './BreedCard.module.css'; 

const BreedCard = ({ breed }) => {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={breed.image} className={styles.cardImage} />
      <Card.Body>
        <Card.Title>{breed.name}</Card.Title>
        <Card.Text>{breed.temperament}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BreedCard;