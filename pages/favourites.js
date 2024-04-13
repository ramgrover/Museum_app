import { useAtom } from 'jotai';
import { Card, Col, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { favouritesAtom } from '@/store';

export default function Favourites() {

  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) { return null };

  return (
    <Row className="gy-4">
      {Array.from(favouritesList).length > 0 ? (

        Array.from(favouritesList).map((objID) => (
          <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
        )) ): (

        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      )}
      </Row>
  )
}