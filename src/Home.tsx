import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col items-start justify-center text-white p-6"
            style={{
                backgroundImage: `url('1.jpg')`, // Replace with actual path
            }}
        >
            <h1 className="text-4xl font-bold mb-6 text-shadow-md">
                Post and Todo App
            </h1>

            <div className="flex flex-row items-start space-x-4">
                {/* Button to navigate to User Page */}
                <Button
                    variant="contained"
                    color="success" // MUI color prop for green
                    onClick={() => navigate('/user')}
                    className="w-full max-w-xs"
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    User
                </Button>

                {/* Button to navigate to Registration Page */}
                <Button
                    variant="contained"
                    color="primary" // MUI color prop for blue
                    onClick={() => navigate('/register')}
                    className="w-full max-w-md" // Adjust the max width as needed
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    Register
                </Button>

            </div>
        </div>
    );
};

export default Home;
