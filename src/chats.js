import React, { useState, useEffect } from 'react'
import './css/chat.css'
import { getToken, getChats, setDbChats } from './db/datasource'
export default function Chats() {
  const [loggedInUser] = useState(getToken())
  const [chats, setChats] = useState(getChats())
  const [message, setMessage] = useState('')

  useEffect(() => {
    setDbChats(chats)
  }, [chats])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message) {
      return
    }
    const date = new Date()
    const hour = date.getHours() % 12 || 12;
    const amPm = (date.getHours() < 12) ? "AM" : "PM";
    const time = `${hour}:${date.getMinutes().toString().padStart(2, '0')} ${amPm}`
    const chat = {
      userName: loggedInUser.name,
      message: message,
      time: time
    }
    setChats([...chats, chat])
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
                  console.log(element.scrollHeight)
                  element.scrollTop = element.scrollHeight;
                }
              }}>
                {chats.map((chat, index) => (
                  <li key={index} className="p-2">
                    <div className={`align-items-center d-flex mb-3 ${chat.userName === loggedInUser.name ? 'justify-content-end' : ''}`}>
                      <div className={`d-flex flex-column bg-light col-md-8 ${chat.userName === loggedInUser.name ? 'border border-primary rounded-end' : 'border border-secondary rounded-start'}`}>
                        <div className="d-flex align-items-center p-2">
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mt-1">
                            {chat.message}
                          </div>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                          <strong>{chat.userName}</strong>
                          <div className="text-muted small mx-2">{chat.time}</div>
                        </div>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <form onSubmit={handleSubmit} className="d-flex">
                <span className="mt-2 ms-auto mx-2">{loggedInUser.name}</span>
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
