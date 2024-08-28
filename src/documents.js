import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { getDocuments, API_URL, addDocument, updateDocument, deleteDocument } from './db/datasource'
export default function Documents() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [inputs, setInputs] = useState({
    label: '',
    filename: ''
  });
  const [errors, setErrors] = useState({});
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data)
    }).catch((error) => {
    })
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const handleDelete = (index) => {

    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${documents[index].label}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((confirmDelete) => {
      if (!confirmDelete.isConfirmed) {
        return;
      }
      deleteDocument(documents[index].id).then((response) => {
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setDocuments(updatedDocuments);
      });
    });

  };

  const handleAdd = () => {
    setEditMode(false);
    setEditIndex(null);
    setInputs({
      label: '',
      filename: null
    });
    handleModalShow();
  }
  const handleEdit = (index) => {
    const document = documents[index];
    setEditMode(true);
    setEditIndex(index);
    setInputs({
      label: document.label,
      filename: ""
    });
    handleModalShow();
  };

  const handleAddEdit = (event) => {
    event.preventDefault();
    const error = {};
    if (!inputs.label) {
      error.label = 'Label is required';
    }
    if (!editMode && !inputs.filename) {
      error.filename = 'Filename is required';
    }
    if (Object.keys(error).length > 0) {
      console.log(error)
      setErrors(error);
      return;
    } else {
      setErrors({});
    }
    if (editMode) {
      updateDocument(documents[editIndex].id, inputs).then((response) => {
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
        const updatedDocuments = [...documents];
        updatedDocuments[editIndex] = {
          id: documents[editIndex].id,
          label: inputs.label,
          filename: response?.data?.filename || documents[editIndex].filename
        };
        setDocuments(updatedDocuments);
        setEditMode(false);
        setEditIndex(null);
      });
    } else {

      addDocument(inputs).then((response) => {
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
        const newDocument = {
          label: inputs.label,
          filename: response?.data?.filename || inputs.filename,
          id: response.data?.data?.id
        };
        setDocuments([...documents, newDocument]);
      });
    }
    handleModalClose();
    setInputs({
      label: '',
      filename: ''
    });
  };

  return (
    <div>
      <h2>Documents</h2>
      <div className='d-flex justify-content-between mb-3'>
        <Button onClick={handleAdd} className='ms-auto'>Add Document</Button>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Form onSubmit={handleAddEdit}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Document' : 'Add Document'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Label</Form.Label>
              <Form.Control type="text" name="label" value={inputs.label} onChange={handleInputChange} isInvalid={errors.label} />
              <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Filename</Form.Label>
              <Form.Control type="file" name="filename" accept=".pdf,.doc,.docx,.txt" onChange={e => handleInputChange({ target: { name: 'filename', value: e.target.files } })} isInvalid={errors.filename} />
              <Form.Control.Feedback type="invalid">{errors.filename}</Form.Control.Feedback>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>Close</Button>
            <Button variant="primary" type="submit">{editMode ? 'Save Changes' : 'Add Document'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Label</th>
            <th>Filename</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents && documents.map((document, index) => (
            <tr key={index}>
              <td>{document.label}</td>
              <td><a href={`${API_URL}download?filename=${encodeURIComponent(document.filename)}`} download="download" target="_blank" rel="noopener noreferrer">Download</a></td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(index)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
