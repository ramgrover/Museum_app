import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if(!searchHistory) return null;

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  async function removeHistoryClicked (e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]))
  };

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <div>
        <br /> <br />
    <Card>
        
      <Card.Body>
        
        <Card.Title>Search History</Card.Title>
        {parsedHistory.length === 0 ? (
          <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
        ) : (
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map((key, i) => (
                    
                  <span key={i}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</span>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
    </div>
  );
};

export default History;
