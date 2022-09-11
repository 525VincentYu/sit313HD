import React, { useState } from 'react';
import './PostPage.css';
import { db, storage } from '../firebase';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from 'firebase/storage';
import { v4 } from 'uuid';
import { Button, Form, Input } from 'semantic-ui-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
function Condition1() {
  const date = new Date();
  let navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!form.Title) {
      errors.Title = 'Title is Required';
    }
    if (!form.Description) {
      errors.Description = 'Problem is Required';
    }

    if (!form.Tags) {
      errors.Tags = 'Tags is Required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    //setIsSubmit(true);

    await addDoc(collection(db, 'questions'), {
      ...form,
      Date: date.toLocaleDateString(),
    });
    //setForm(null);
    navigate('../');
    alert('Post uploaded!');
  };

  const onChange = (e) => {
    const { value, name } = e.target;

    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{
          height: 'auto',
          background: 'white',
          display: 'block',
          boxshadow: 'blue',
        }}
      >
        <div className='titles'>
          Title
          <input
            type='text'
            onChange={handleChange}
            className='iiput'
            name='Title'
            value={form.Title}
            placeholder='Start your question with how, what, why, etc.'
          />
        </div>
        {errors.Title && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Title}
          </Alert>
        )}
        <div className='titles'>Describe your problem</div>
        {errors.Description && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Description}
          </Alert>
        )}
        <textarea
          onChange={handleChange}
          className='problem'
          name='Description'
          value={form.Description}
          type='text'
        />

        <div className='titles'>
          Tags
          <input
            onChange={handleChange}
            className='iiput'
            name='Tags'
            value={form.Tags}
            type='text'
            placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
          />
        </div>
        {errors.Tags && (
          <Alert style={{ marginTop: '10px' }} variant='danger'>
            {errors.Tags}
          </Alert>
        )}
        <Button primary type='submit' className='pls'>
          Post
        </Button>
      </Form>
    </div>
  );
}
export default Condition1;
