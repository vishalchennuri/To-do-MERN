import React, { useEffect, useState } from "react";
import { FaTrash, FaCheckCircle, FaRegCircle, FaPlus, FaList } from "react-icons/fa";
import Create from "./Create";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:4000/get")
      .then((result) => {
        setTodos(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/delete/${id}`)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id, status) => {
    const newStatus = !status;
    axios
      .put(`http://localhost:4000/update/${id}`, { status: newStatus })
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-body" style={{ backgroundColor: "#fff" }}>
            {/* Header */}
            <div className="text-center mb-4">
              <FaList className="display-4 text-primary mb-3" />
              <h2 className="text-primary fw-bold animate__animated animate__fadeIn">
                My Todo List
              </h2>
            </div>

            {/* Create Todo Section */}
            <div className="animate__animated animate__fadeInUp">
              <Create onAdd={fetchData} />
            </div>

            {/* Todo List */}
            <div className="mt-4">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : todos.length === 0 ? (
                <div className="text-center py-4 animate__animated animate__fadeIn">
                  <div className="text-muted">
                    <FaPlus className="display-4 mb-3 text-primary opacity-50" />
                    <h4>No tasks yet! Add your first todo.</h4>
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  {todos.map((todo, index) => (
                    <div
                      key={todo._id}
                      className="col-12 animate__animated animate__fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="card border-0 shadow-sm hover-shadow transition-all">
                        <div className="card-body d-flex align-items-center justify-content-between p-3">
                          <div className="d-flex align-items-center flex-grow-1">
                            <div
                              className="me-3 cursor-pointer"
                              onClick={() => handleToggleStatus(todo._id, todo.status)}
                              style={{ cursor: "pointer" }}
                            >
                              {todo.status ? (
                                <FaCheckCircle className="text-success fs-4" />
                              ) : (
                                <FaRegCircle className="text-primary fs-4" />
                              )}
                            </div>
                            <span
                              className={`fs-5 ${
                                todo.status ? "text-decoration-line-through text-muted" : ""
                              }`}
                            >
                              {todo.task}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDelete(todo._id)}
                            className="btn btn-outline-danger btn-sm rounded-circle"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;