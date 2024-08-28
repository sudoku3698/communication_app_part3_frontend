import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { getUsers,getLoggedInUser,deleteUser,updateUser} from './db/datasource'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    getLoggedInUser().then(responseData => {
      setLoggedInUser(responseData?.user)
    })
  }, [])

  useEffect(() => {
    if(loggedInUser){
      getUsers().then((data) => {
        setUsers(data)
      }).catch((error) => {
        if (error.response.status === 403) {
          setUsers([])
        }
      })
    }
  }, [loggedInUser])

  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({})

  const handleClose = () => {
    setShow(false);
    setError({})
  }
  const handleShow = () => {
    setShow(true);
    setError({})
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users]
    const userToDelete = updatedUsers[index]


    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${userToDelete.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (!result.isConfirmed) {
        return
      }
      deleteUser(userToDelete.id).then((response) => {
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          return
        }else{
          updatedUsers.splice(index, 1)
          setUsers(updatedUsers)
          Swal.fire({
            title: 'Deleted!',
            text: `${userToDelete.name} has been deleted.`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }
        
      })
      
    })

  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setName(users[index].name)
    setEmail(users[index].email)
    handleShow()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = {};
    if (editIndex !== null) {
      if (!name) {
        error.name = 'Please enter a name';
      }
      if (!email) {
        error.email = 'Please enter an email';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.email = 'Invalid email address';
      }

      if (Object.keys(error).length > 0) {
        setError(error);
        return;
      } else {
        setError({});
      }
      const updatedUsers = [...users]
      const currentUser = updatedUsers[editIndex]
      const isEmailUnique = updatedUsers.every(user => user.email !== email || user.email === currentUser.email)
      if (!isEmailUnique) {
        setError('Email must be unique except self')
        return
      }
    }
    if (editIndex === null) {
      // setUsers([...users, { name, email }])
    } else {
      const updatedUsers = [...users]
      const userToUpdate=updatedUsers[editIndex];
       updateUser({ name, email },userToUpdate.id).then((response) => {
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          return
        }else{
          updatedUsers[editIndex] = { ...updatedUsers[editIndex], name: name, email: email }
          setUsers(updatedUsers)
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }
      })
    }
    setEditIndex(null)
    setName('')
    setEmail('')
    handleClose()
  }


  return (<>
    <h2>Users</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => handleEdit(index)} className="btn btn-primary btn-sm me-2">Edit</button>
              {loggedInUser !== null && loggedInUser.email !== users[index].email && (
                <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} isInvalid={error.name} />
            <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={error.email} disabled={loggedInUser?.email === email} />
            <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
  )
}