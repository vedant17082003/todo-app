import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center p-6 bg-blue-500 min-h-screen">
            {/* Display user cards */}
            <div className="flex flex-wrap justify-center items-center">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        number={user.number}
                        street={user.street}
                        city={user.city}
                    />
                ))}
            </div>

            {/* Single Register button after all the user cards */}
            <Button
                variant="contained"
                color="success"
                style={{
                    width: '250px',  // Same width as the user card
                    marginTop: '20px',
                    borderRadius: '16px',
                }}
                onClick={() => navigate('/register')}
            >
                Register User
            </Button>
        </div>
    );
};

export default User;
