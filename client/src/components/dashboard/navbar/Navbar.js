import React from "react";
import { Button, Navbar, Nav, Form } from "react-bootstrap";
import { signout } from "../../../helper";
import { useHistory} from 'react-router-dom'
const NavbarComponent = () => {
  const history = useHistory();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">PROJECT STORY</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Option1</Nav.Link>
        <Nav.Link href="#features">Option2</Nav.Link>
        <Nav.Link href="#pricing">Option3</Nav.Link>
      </Nav>
      <Form inline>
        <Button onClick={() => {
          signout(() => {
            history.push("/")
          })
        }} variant="outline-light">LogOut</Button>
      </Form>
    </Navbar>
  );
};

export default NavbarComponent;
