import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        let error = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) error.name = 'Name Required';
        if (!email) {
            error.email = 'Email Required';
        } else if (!emailRegex.test(email)) {
            error.email = 'Invalid Email Format';
        }
        if (!password) error.password = 'Password Required';
        if (password !== confirmPassword) error.confirmPassword = 'Passwords Do Not Match';

        if (Object.keys(error).length === 0) {
            // Handle successful signup (e.g., API call)
            console.log(formData);
            navigate('/chatting');
        } else {
            setErrors(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <div className="card p-4">
                        <h2 className="card-title text-center mb-4">Sign Up</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="text-danger fs-6">{errors.name}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    placeholder="Your Email"
                                    onChange={(e) => {
                                        setErrors({ ...errors, email: '' });
                                        handleChange(e);
                                    }}
                                />
                                {errors.email && <p className="text-danger fs-6">{errors.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    placeholder="Your Password"
                                    onChange={(e) => {
                                        setErrors({ ...errors, password: '' });
                                        handleChange(e);
                                    }}
                                />
                                {errors.password && <p className="text-danger fs-6">{errors.password}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={(e) => {
                                        setErrors({ ...errors, confirmPassword: '' });
                                        handleChange(e);
                                    }}
                                />
                                {errors.confirmPassword && <p className="text-danger fs-6">{errors.confirmPassword}</p>}
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
