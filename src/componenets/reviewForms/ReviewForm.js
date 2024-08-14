import {Form,Button} from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue}) => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
    function showalert() {
      alert('Please log in to write a Review')
    }
  return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button variant="outline-info"  onClick={isAuthenticated? handleSubmit:showalert}>Submit</Button>
    </Form>   

  )
}

export default ReviewForm
