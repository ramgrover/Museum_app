import { useForm } from 'react-hook-form';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

const AdvancedSearch = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    let queryString = `searchBy=${encodeURIComponent(data.searchBy)}`;

    if (data.geoLocation) {
      queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
    }

    if (data.medium) {
      queryString += `&medium=${encodeURIComponent(data.medium)}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;

    if (data.q) {
      queryString += `&q=${encodeURIComponent(data.q)}`;
    }
    //setSearchHistory(current => [...current, queryString]);
    setSearchHistory(await addToHistory(queryString))
    router.push(`/artwork?${queryString}`);
  };

  return (
    <div>
      <br />
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control type="text" placeholder="" {...register('q')} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register('searchBy')} className="mb-3">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="" {...register('geoLocation')} />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="" {...register('medium')} />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>

            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              {...register('isHighlight')}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              {...register('isOnView')}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
