import React, { useState, useEffect } from 'react'
import './css/chat.css'
import { getLoggedInUser, getChats, createChat } from './db/datasource'
export default function Chats() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getLoggedInUser().then(responseData => {
      setLoggedInUser(responseData?.user)
    })
  }, [])

  useEffect(() => {
    if(loggedInUser){

      getChats().then(responseData => {
        setChats(responseData)
      })
    }
  }, [loggedInUser])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message) {
      return
    }
    const date = new Date()
    const time = date.toISOString().slice(0, 19).replace('T', ' ');
    const chat = {
      username: loggedInUser.name,
      message: message,
      date: time
    }
    createChat(chat).then((data) => {
      const newChat = {...data?.data?.data}
      delete newChat.id
      setChats([...chats, newChat])
    })
    setMessage('')
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-default">
            <div className="card-header">Chats</div>
            <div className="card-body p-0">
              <ul className="chat-box list-unstyled" ref={(element) => {
                if (element) {
                  element.scrollTop = element.scrollHeight;
                }
              }}>
                {chats && chats.map((chat, index) => (
                  <li key={index} className="p-2">
                    <div className={`align-items-center d-flex mb-3 ${chat.username === loggedInUser.name ? 'justify-content-end' : ''}`}>
                      <div className={`d-flex flex-column bg-light col-md-8 ${chat.username === loggedInUser.name ? 'border border-primary rounded-end' : 'border border-secondary rounded-start'}`}>
                        <div className="d-flex align-items-center p-2">
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mt-1">
                            {chat.message}
                          </div>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                          <strong>{chat.username}</strong>
                          <div className="text-muted small mx-2">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(chat.date))}</div>
                        </div>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <form onSubmit={handleSubmit} className="d-flex">
                <span className="mt-2 ms-auto mx-2">{loggedInUser?.name}</span>
                <input className="form-control me-2 md-8" type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." />
                <button className="btn btn-primary" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
