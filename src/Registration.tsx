import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
    const [id, changeid] = useState<number | ''>(0);
    const [name, namechange] = useState<string>("");
    const [password, passwordchange] = useState<string>("");
    const [email, emailchange] = useState<string>("");
    const [street, streetchange] = useState<string>("");
    const [city, citychange] = useState<string>("");
    const [number, numberchange] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let regobj = { id, name, password, email, number, street, city };

        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regobj),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                toast.success("Registered successfully");
                // Navigate to user page after successful registration
                navigate('/user');
            })
            .catch((error) => {
                toast.error("Failed to register: " + error.message);
            });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-6">
                        <h1 className="text-4xl font-bold text-center text-black">Create user</h1>
                    </div>

                    {/* Flex for Full Name and Password */}
                    <div className="flex gap-x-6">
                        {/* Full Name */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => namechange(e.target.value)}
                                placeholder="Enter your full name"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => passwordchange(e.target.value)}
                                placeholder="Enter the password"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Flex for User Name and Email */}
                    <div className="flex gap-x-6">
                        {/* User Name */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">User ID</label>
                            <input
                                type="text"
                                value={id}
                                onChange={e => changeid(Number(e.target.value))}
                                placeholder="Enter the id"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => emailchange(e.target.value)}
                                placeholder="Enter the email"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Flex for Street and City */}
                    <div className="flex gap-x-6">
                        {/* Street */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">Street</label>
                            <input
                                type="text"
                                value={street}
                                onChange={e => streetchange(e.target.value)}
                                placeholder="Enter the street"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* City */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-black font-semibold">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={e => citychange(e.target.value)}
                                placeholder="Enter the city"
                                className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Phone Number</label>
                        <input
                            type="text"
                            value={number}
                            onChange={e => numberchange(e.target.value)}
                            placeholder="Enter the phone number"
                            className="text-black p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Register Button */}
                    <div className="flex justify-center mt-6">
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
