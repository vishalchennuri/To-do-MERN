import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAdd }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post('http://localhost:4000/add', { task })
      .then(() => {
        // Call the callback function passed from the parent component
        onAdd();
        // Clear the input field after adding the task
        setTask('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='text-center mt-3'>
      <div className='d-block mx-auto mt-5 mb-3 w-50'>
        <input type="text" placeholder='Enter Task' className='form-control' value={task} onChange={(e) => setTask(e.target.value)} />
      </div>
      <button className='btn btn-dark mb-3' onClick={handleAdd} type='button'>Add</button>
    </div>
  );
}

export default Create;
