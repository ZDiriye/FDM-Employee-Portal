import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAccountForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        accountType: 'employee' // Default values
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('http://localhost:3001/api/accounts/add', formData);
            console.log('Account created successfully:', response.data);
            alert("Account created");
            setFormData({
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                accountType: 'employee'
            });
        } catch (error) {
            console.error('Error creating account:', error);
            
        }
    };

    return (
        <div>
            
            <h2>Create New Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="accountType">Account Type:</label>
                    <select 
                        id="accountType" 
                        name="accountType" 
                        value={formData.accountType} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                        <option value="consultant">Consultant</option>
                    </select>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}
