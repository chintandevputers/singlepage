// LoginPage.tsx
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone_number: ''
    });

    const [errors, setErrors] = useState({});

    const inputs = [
        {
            id: 1,
            name: "first_name",
            type: "text",
            placeholder: "First Name",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: "First Name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "last_name",
            type: "text",
            placeholder: "Last Name",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Last Name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "date_of_birth",
            type: "date",
            placeholder: "Birthday",
            label: "Birthday",
        },
        {
            id: 4,
            name: "phone_number",
            type: "text",
            placeholder: "Phone Number",
            label: "Phone Number",
        },
    ];

    const validateInput = (name: string, value: string) => {
        const input = inputs.find(input => input.name === name);
        if (!input) return true;

        if (input.required && !value.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: `${input.label} is required`
            }));
            return false;
        }

        if (input.pattern && !new RegExp(input.pattern).test(value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: input.errorMessage
            }));
            return false;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValid = true;
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                isValid = validateInput(key, values[key as keyof typeof values]) && isValid;
            }
        }

        if (isValid) {
            const response = await axios.post('http://127.0.0.1:8001/customers/', values);
            console.log('Login successful!', response.data);
            console.log("values", values);
            // Here you can add your login logic
            onLogin();
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        validateInput(name, value);
    };

    return (
        <div className='form-container'>
            <h2 className="title">Login Page</h2>
            <form className='form' onSubmit={handleSubmit}>
                {inputs.map(input => (
                    <>
                        <label>{input.label}</label>
                        <input
                            className="input"
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            value={values[input.name as keyof typeof values]}
                            onChange={onChange}
                        />
                        {errors[input.name as keyof typeof errors] && <span style={{ color: 'red' }}>{errors[input.name as keyof typeof errors]}</span>}
                    </>
                ))}
                <button className="form-btn" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
