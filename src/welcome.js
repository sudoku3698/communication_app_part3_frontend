import React, { useState,useEffect } from 'react'
import { getLoggedInUser } from './db/datasource'

function Welcome() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    getLoggedInUser().then(responseData => {
      setLoggedInUser(responseData?.user)
    })
  }, [])

  const userName = loggedInUser ? loggedInUser.name : ''
  return (
    <div>
      <h1>Welcome {userName}</h1>
    </div>
  )
}

export default Welcome