import React, { useEffect, useState } from "react";
import { FaTrash, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import Create from "./Create";
import axios from "axios";

function Home() {
    const [todos, setTodos] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:4000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
            .then(() => fetchData())
            .catch(err => console.log(err));
    };

    const handleToggleStatus = (id, status) => {
        const newStatus = !status; // Toggle the status
        axios.put(`http://localhost:4000/update/${id}`, { status: newStatus })
            .then(() => fetchData())
            .catch(err => console.log(err));
    };

    return (
        <div className="mt-3 home">
            <h2 className="">ToDo List</h2>
            <Create onAdd={fetchData} />
            {todos.length === 0
                ? <div><h2>No Record</h2></div>
                : todos.map(todo => (
                    <div key={todo._id} className="bg-dark text-white d-flex justify-content-between align-items-center w-25 mx-auto p-2 mb-2 rounded">
                        <div>
                        {todo.status
                                ? <FaCheckSquare onClick={() => handleToggleStatus(todo._id, todo.status)} className="ml-2 " />
                                : <FaRegSquare onClick={() => handleToggleStatus(todo._id, todo.status)} className="ml-2 " />
                            }
                            <span className="" style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>{todo.task}</span>
                           
                        </div>
                        <button onClick={() => handleDelete(todo._id)} className="btn btn-danger"><FaTrash /></button>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
