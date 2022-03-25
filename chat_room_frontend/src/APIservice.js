

export default class  APIservice  {

   

    
    static Login (body){

        
        
        
            return fetch('http://127.0.0.1:8000/login/', {
                'method':'POST',
                headers:{
    
                    'Content-Type':'application/json'
                 
                
                },body:JSON.stringify(body)
    
            }).then(resp => resp.json())
    }

    static Register (body){

        
        
        
        return fetch('http://127.0.0.1:8000/api/users/', {
            'method':'POST',
            headers:{

                'Content-Type':'application/json'
             
            
            },body:JSON.stringify(body)

        }).then(resp => resp.json())
    }

    static get_messages(){
        
        return fetch(`http://127.0.0.1:8000/api/message/`, {
            'method':'GET',
            headers:{

                'Content-Type':'application/json'
             
            
            }

        }).then(resp => resp.json())
    }

    static get_all_user(){

        return fetch(`http://127.0.0.1:8000/api/users/`, {
            'method':'GET',
            headers:{

                'Content-Type':'application/json'
             
            
            }

        }).then(resp => resp.json())

    }

    static get_user_data (id){

        return fetch(`http://127.0.0.1:8000/api/users/${id}`, {
            'method':'GET',
            headers:{

                'Content-Type':'application/json'
             
            
            }

        }).then(resp => resp.json())

    }


    static add_message (body){

           
        return fetch('http://127.0.0.1:8000/api/message/', {
            'method':'POST',
            headers:{

                'Content-Type':'application/json'
             
            
            },body:JSON.stringify(body)

        }).then(resp => resp.json())
    }

    static get_history_messages (body){

           
        return fetch('http://127.0.0.1:8000/messages/', {
            'method':'POST',
            headers:{

                'Content-Type':'application/json'
             
            
            },body:JSON.stringify(body)

        }).then(resp => resp.json())
    }

  
}

