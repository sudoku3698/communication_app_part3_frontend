import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { getDocuments,API_URL,addDocument,updateDocument,deleteDocument } from './db/datasource'
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
    console.log(editMode)
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
      filename: ''
    });
    handleModalShow();
  }
  const handleEdit = (index) => {
    const document = documents[index];
    setEditMode(true);
    setEditIndex(index);
    setInputs({
      label: document.label,
      filename: document.filename
    });
    handleModalShow();
  };

  const handleAddEdit = (event) => {
    event.preventDefault();
    const error = {};
    if (!inputs.label) {
      error.label = 'Label is required';
    }
    if (!inputs.filename) {
      error.filename = 'Filename is required';
    }
    if (Object.keys(error).length > 0) {
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
          ...inputs
        };
        setDocuments(updatedDocuments);
        setEditMode(false);
        setEditIndex(null);
      });
    } else {
      const formData = new FormData(event.target);
      addDocument(formData).then((response) => {
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
          ...inputs,
          id: response.data.id
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
      <div className="modal" style={{display: showModal ? 'block' : 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editMode ? 'Edit Document' : 'Add Document'}</h5>
              <button type="button" className="btn-close" onClick={handleModalClose}></button>
            </div>
            <form onSubmit={handleAddEdit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="label" className="form-label">Label</label>
                  <input type="text" className="form-control" id="label" name="label" value={inputs.label} onChange={handleInputChange} />
                  {errors.label && <div className="invalid-feedback">{errors.label}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="filename" className="form-label">Filename</label>
                  <input type="file" className="form-control" id="filename" name="filename" accept=".pdf,.doc,.docx,.txt" onChange={e => handleInputChange({target: {name: 'filename', value: e.target.files[0]}})} />
                  {errors.filename && <div className="invalid-feedback">{errors.filename}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="submit" className="btn btn-primary">{editMode ? 'Save Changes' : 'Add Document'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Label</th>
            <th>Filename</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index}>
              <td>{document.label}</td>
              <td><a href={`${API_URL}${document.filename}`} download target="_blank" rel="noopener noreferrer">Download</a></td>
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
