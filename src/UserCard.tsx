import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface UserCardProps {
    id: number;
    name: string;
    email: string;
    number: string;
    street: string;
    city: string;
}

const CustomCard = styled(Card)(({ theme }) => ({
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px', // Rounded corners
    width: '250px', // Square card
    height: '120px', // Ensures the card is a square
    margin: '16px 8px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
}));

const UserCard = ({ name }: UserCardProps) => {
    return (
        <CustomCard className="inter-var mx-auto">
            <CardContent className="bg-gray-50 dark:bg-gray-300 dark:border-white/[0.2] p-4">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                    className="text-2xl font-bold text-black"
                >
                    {name || 'No Name Provided'}
                </Typography>

                <div className="flex justify-center mt-4">
                    <Button variant="contained" color="primary" fullWidth>
                        TODO
                    </Button>
                </div>
            </CardContent>
        </CustomCard>
    );
};

export default UserCard;
