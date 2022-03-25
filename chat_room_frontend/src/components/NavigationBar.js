import React, {useState,useEffect} from 'react'
import { Navbar,
    Nav,
    Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCookies} from 'react-cookie'
import{ useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie';


function NavigationBar() {

  const [id,setID,removeID] = useCookies(['id'])

  const logout = () =>{

    const cookies = new Cookies();

    removeID(['id'])
    cookies.remove('id', { path: '/' });
    window.location.reload();
    
  }


  return (
    <div>
          <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">ChatRoom</Navbar.Brand>
                    <Nav className="me-auto">
                        
                        <Nav.Link href="/Room">Chat</Nav.Link>
                        <Nav.Link href="/History">History</Nav.Link>
                        <Nav.Link href="#home" onClick={logout}>Logout</Nav.Link>

                    </Nav>
            </Container>
          </Navbar>


          



    </div>
  )
}

export default NavigationBar