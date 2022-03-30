import React, {useState,useEffect,useRef} from 'react'
import io from "socket.io-client"
import APIservice from '../APIservice';
import NavigationBar from './NavigationBar'
import {useCookies} from 'react-cookie'
import{ useNavigate} from 'react-router-dom'
import {
  ListGroup,
  Form,
  Button
} from 'react-bootstrap';


function ChatRoom() {

  
	const [ chat, setChat ] = useState([])
  const [allUsers, setAll] = useState([])
  const [msg, setMsg] = useState("")
  const [ user, setUser] = useState();
  const [id,setID,removeID] = useCookies(['id']);
  let history = useNavigate();

  const socket = useRef()

  //connect when successfully logged in
  useEffect(() => {


    if( Object.keys(id).length === 0)
   {

    history("/")
    
   }

   //set all user data
   APIservice.get_user_data(id["id"])
   .then(resp => setUser(resp))

   APIservice.get_messages()
   .then(resp => setChat(resp))

   APIservice.get_all_user()
   .then(resp => setAll(resp))

    socket.current = io("ws://localhost:9013");

    socket.current.on("connnection", () => {
     
    });



    
  }, []);

  //keep listening for emits
  useEffect(() => {

      socket.current.on("message", ({name, message, id, todaysDate }) => {
       
        setChat([ ...chat, {"id": id, "client_name":name, "content": message, "date_created": todaysDate } ])
      
			})

     
   
    })

  const sendMSG = (e) =>{

    const name = user.username
    const message = msg
    let user_id = id["id"]
    const offsetInMinutes = 2 * 60 ;
    const todaysDate = new Date(new Date().getTime() + offsetInMinutes * 60000).toISOString();

    let temp = allUsers.find((y) => y.id == user_id)
  
    APIservice.add_message({
      "client_id": user_id,
      "client_name": temp.username,
      "content": message,
      "date_created": todaysDate
    })
    .then(resp => console.log(resp))
    .catch(err => alert(err))

		socket.current.emit("message", { name, message,user_id, todaysDate })

    setMsg("")

		e.preventDefault()
    
    

  }

  


  return (
    
   
    <div>
       <NavigationBar></NavigationBar>
        <div className='message-box'>
          <div className = "messages">
          <ListGroup as="ol">
          {chat.map(chat => {
             return(
            <div>
              {id["id"] == chat.client_id
                ?
                <ListGroup.Item as="li" key={chat.message_id} variant = "success"> 
                    <h6>{chat.client_name}</h6>
                    <p >{chat.content}</p>
                    <span>Date Sent: {chat.date_created}</span>
                </ListGroup.Item>

                : 

                <ListGroup.Item as="li" key={chat.message_id + 1}>
                  <h6>{chat.client_name}</h6>
                  <p >{chat.content}</p>
                      <span>Date Sent: {chat.date_created}</span>
                </ListGroup.Item> } 

            
               
                 
            </div>
            )
            })}
            

          </ListGroup>
          </div>
          <Form className= {sendMSG} key = {8788}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Send Message!</Form.Label>
              <Form.Control  as="input" rows={3} value= {msg} onChange={e => setMsg(e.target.value)}/>
          
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={sendMSG}>Send!</Button>
        </div>
        
    </div>
  )
}

export default ChatRoom