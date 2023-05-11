import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';

function ChoiceVariableSettings( {varObj} ) {

    return (
  
      <Container className='var-settings-dialog'>
        <Form>
          <FormGroup as={Row} controlId='formVarType'>
            <Form.Label column xs={2} className='text-muted'>
              Type:
            </Form.Label>
  
            <Col>
              <Form.Select>
                <option>Choice</option>
                <option>Number</option>
                <option>Expression</option>
              </Form.Select>  
            </Col>
  
          </FormGroup>
  
          <FormGroup as={Row}>
            <Form.Label column xs={3} className='text-muted'>
              Choices:
            </Form.Label>
            <Col xs={9}>
              <FormGroup as={Row} className='mb-3'>
                <Form.Label column xs={1} className='text-muted'>
                  1.
                </Form.Label>
                <Col>
                  <Form.Control type='text' placeholder='Hello'/>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Form.Label column xs={1} className='text-muted'>
                  2.
                </Form.Label>
                <Col>
                  <Form.Control type='text' placeholder='World'/>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
  
        </Form>
      </Container>
    )
  }

export default ChoiceVariableSettings;