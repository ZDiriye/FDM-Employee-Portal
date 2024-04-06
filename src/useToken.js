import React, {useState} from 'react'


const useToken = () => {
    const getToken =() =>{
        const tokenString = sessionStorage.getItem('token')
        
        try {
            const userToken = JSON.parse(tokenString);
            return userToken?.token;
          } catch (e) {
            console.error('Error parsing token from sessionStorage', e);
            return null;
          }
          
        
    } 

    const [token, setToken] = useState(() => getToken());
    //const [token, setToken] = useState(getToken())
    
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
      }
      return {
        setToken: saveToken,
        token
      }
    }

export default useToken