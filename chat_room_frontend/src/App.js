import React, {useState,useEffect} from 'react'
import './App.css';
import './components/ChatRoom.css';
import './components/History.css';
import APIservice from './APIservice';
import NavigationBar from './components/NavigationBar';
import {Cookies, useCookies} from 'react-cookie'
import{ useNavigate} from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  ToggleButton,
  Form
} from 'react-bootstrap';


function App() {

  const [id,setID,removeIDtoken] = useCookies(['id']) 
  const [radioValue, setRadioValue] = useState('1');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useNavigate();

  const radios = [
    { name: 'Login', value: '1' },
    { name: 'Register', value: '2' },
  
  ];
  useEffect(()=> {

    if( Object.keys(id).length != 0)
    {
 
     history("/Room")
     
    } 

    
 
 
   },[])
 

  const handleSubmit = () => {
    
    
    //Login Selected
   if( radioValue == "1")
   {
        //set data needed
        APIservice.Login({"username":username,"password":password})
        .then(resp =>setID('id',resp))
        .catch(err => alert(err))


   }

   //Register Selected
   else
   {

    
    APIservice.Register({
                          "username": username,
                          "password": password,
                          "email": email
                         })
    .then(resp =>setID('id',resp["id"]))
    .catch(err => alert(err))




   }
    

  }

  useEffect(() => {

    console.log(radioValue, username,password,email)

  },[radioValue]);

  return (
    <div>

      <NavigationBar></NavigationBar>

      <div className='Form'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="This will be your name in the chat" 
            value = {username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" 
             value = {password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          {radioValue == 1 ?
          <div>
           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com"  value = {email} readOnly/>
          </Form.Group>
            
          </div> 
          : 
          <div>
           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" 
             value = {email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
        
          </div>
          } 

        <Button as="input" type="submit" value="Submit" className='btn-space' />
          <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton className='btn-space'
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
        </Form>

        </div>
    </div>
  );
}

export default App;
