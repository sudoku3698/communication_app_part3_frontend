import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Users from './users';
import Welcome from './welcome';
import Documents from './documents';
import Register from './register';
import Chats from './chats';
import Nav from './nav';
import Login from './login';
import Landing from './landing';
import NotFound from './notfound';
import RegisterSuccessful from './register_successful';
import LoginSucess from './login_success';
import { getToken } from './db/datasource';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequireAuth><Nav /></RequireAuth>}>
              <Route path="welcome" element={<RequireAuth><Welcome /></RequireAuth>} />
              <Route path="login_success" element={<RequireAuth><LoginSucess /></RequireAuth>} />

              <Route index element={(<RequireAuth><Welcome /></RequireAuth>)} />
              <Route path="chats" element={<RequireAuth><Chats /></RequireAuth>} />
              <Route path="users" element={<RequireAuth><Users /></RequireAuth>} />
              <Route path="documents" element={<RequireAuth><Documents /></RequireAuth>} />
            </Route>
            <Route path="register" element={<GuestAuth><Register /></GuestAuth>} />
            <Route path="success_register" element={<GuestAuth><RegisterSuccessful /></GuestAuth>} />
            <Route path="login" element={<GuestAuth><Login /></GuestAuth>} />
            <Route path="landing" element={<GuestAuth><Landing /></GuestAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}



function GuestAuth({ children }) {
  const user = getToken()
  return !user ? children : <Navigate to="/" />
}

function RequireAuth({ children }) {
  const user = getToken()
  return user ? children : <Navigate to="/login" />
}

export default Main;

