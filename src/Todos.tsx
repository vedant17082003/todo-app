import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

type Todo = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

const Todos = () => {
    const { id } = useParams(); // Get userId from URL
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        console.log(`Fetching todos for user: ${id}`);
        fetch(`http://localhost:8000/todos?userId=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch todos for user ${id}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched todos:', data);
                // Ensure data is an array
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    setTodos([]);
                    console.error('Expected array but received:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
                toast.error('Error fetching todos.');
                setTodos([]);
            });
    }, [id]);

    // POST method: Add a new todo
    const addTodo = () => {
        const todo = {
            userId: Number(id),
            title: newTodo,
            completed: false
        };
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        })
            .then(response => response.json())
            .then(data => {
                setTodos([...todos, data]);
                toast.success('Todo added successfully!');
            })
            .catch(error => toast.error('Error adding todo: ' + error));
    };

    // PUT method: Update a todo
    const updateTodo = (todoId: number, updatedTodo: Partial<Todo>) => {
        fetch(`http://localhost:8000/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo),
        })
            .then(response => response.json())
            .then(() => {
                setTodos(todos.map(todo => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo)));
                toast.success('Todo updated successfully!');
            })
            .catch(error => toast.error('Error updating todo: ' + error));
    };

    // DELETE method: Remove a todo
    const deleteTodo = (todoId: number) => {
        fetch(`http://localhost:8000/todos/${todoId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== todoId));
                toast.success('Todo deleted successfully!');
            })
            .catch(error => toast.error('Error deleting todo: ' + error));
    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen">
            <h1 className=" text-black text-center text-3xl font-bold mb-6">User {id}'s Todos</h1>

            {/* Add New Todo */}
            <div className="mb-6">
                <TextField
                    label="New Todo"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                />
                <Button variant="contained" color="primary" onClick={addTodo}>
                    Add Todo
                </Button>
            </div>

            {/* List of Todos */}
            <div>
                {todos.length === 0 ? (
                    <p className='text-red-500'>No todos found for this user.</p>
                ) : (
                    todos.map((todo) => (
                        <div key={todo.id} className="flex items-center justify-between mb-4 bg-blue-600 p-4 rounded shadow">
                            <span>{todo.title}</span>
                            <div className="flex space-x-2">
                                <Button variant="contained" color="success" onClick={() => updateTodo(todo.id, { completed: !todo.completed })}>
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </Button>
                                <Button variant="contained" color="error" onClick={() => deleteTodo(todo.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Todos;
