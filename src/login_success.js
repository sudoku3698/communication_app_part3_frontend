import React,{ useState,useEffect } from 'react'
import { getLoggedInUser } from './db/datasource'
function LoginSucess() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    getLoggedInUser().then(responseData => {
      setLoggedInUser(responseData?.user)
    })
  }, [])
  return (
    <div className='text-center'>
      <h1>Login Successfully </h1>
      <h2>Welcome, {loggedInUser?.name}</h2>
    </div>
  )
}

export default LoginSucess