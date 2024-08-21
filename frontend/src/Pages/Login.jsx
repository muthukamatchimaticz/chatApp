import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState();


    const handleChange = (e) => {
        e.preventDefault();

        let { name, value } = e.target;

        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        var error = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email)
            error.email = "Email Required"

        if (!formData.password)
            error.password = "Password Required"

        setErrors(error);

        navigate("/chatting");


    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <div className="card p-4">
                        <h2 className="card-title text-center mb-4">User Login</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    className="form-control"
                                    value={formData.email}
                                    placeholder="User Email"
                                    onChange={(e) => {
                                        setErrors({ ...errors, email: "" })
                                        handleChange(e)
                                    }}
                                />
                                {errors?.email && <p className='text-danger fs-6'>{errors?.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    className="form-control"
                                    value={formData.password}
                                    placeholder="User Password"
                                    onChange={(e) => {
                                        setErrors({ ...errors, password: "" })
                                        handleChange(e)
                                    }}
                                />
                                {errors?.password && <p className='text-danger fs-6'>{errors?.password}</p>}
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
