import Error from 'next/error';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { addToFavourites,removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';


export default function ArtworkCardDetail({objectID}) {

  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked(){
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions } = data;
if(data){
  return (
    <Card>
      {primaryImageSmall ? (
        <Card.Img variant="top" src={data.primaryImage} />
      ) : (
        <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />
      )}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <b>Date:</b> {objectDate || 'N/A'} <br />
          <b>Classification:</b> {classification || 'N/A'} <br />
          <b>Medium:</b> {medium || 'N/A'}
          <br /> <br />
          <b>Artist:</b> {artistDisplayName || 'N/A'} (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>) <br />
          <b>Credit Line:</b> {creditLine || 'N/A'} <br />
          <b>Dimensions:</b> {dimensions || 'N/A'}
          <br /> <br />
          <button type="button" className={showAdded ? "btn btn-primary" : "btn btn-outline-primary"} onClick={favouritesClicked}>
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </button>

        </Card.Text>
      </Card.Body>
    </Card>
  );
}
else{
  return null;
}
}