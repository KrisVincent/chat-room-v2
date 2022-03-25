import React, {useState,useEffect,useRef} from 'react'
import APIservice from '../APIservice';
import NavigationBar from './NavigationBar'
import {useCookies} from 'react-cookie'
import{ useNavigate} from 'react-router-dom'
import {
  ListGroup,
  Form,
  Button
} from 'react-bootstrap';

function History() {

  const [ chat, setChat ] = useState([])
  const [id,setID,removeID] = useCookies(['id']);
  let history = useNavigate();
  

  useEffect(()=> {
        //This checks if someone is already logged in
        if( Object.keys(id).length === 0)
        {
     
         history("/")
         
        }

        APIservice.get_history_messages({"id": id["id"]})
        .then(resp => setChat(resp))
        .catch(err => alert(err))

   },[])


  return (
    <div>
        <NavigationBar/>

        <div className='history-message-box'>
          <div className = "history-messages">
          <ListGroup as="ol">
          
          {chat.map(chat => {
             return(
            <ListGroup.Item as="li" key={chat.message_id}> 
            
                  <h6>{chat.client_name}</h6>
                  <a href="#" >{chat.content}</a><br/>
                  <span>Date Sent: {chat.date_created}</span>
            </ListGroup.Item>

            )
            })}
            

         

          </ListGroup>
          </div>
          
        </div>

    </div>
  )
}

export default History