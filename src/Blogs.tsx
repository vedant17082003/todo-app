import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

type Blog = {
    id: number;
    blogid: number;
    title: string;
    body: string;
    completed: boolean;
};

const Blogs = () => {
    const { id } = useParams(); // Get userId or blogid from URL
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [newTitle, setNewTitle] = useState<string>("");
    const [newBody, setNewBody] = useState<string>("");

    useEffect(() => {
        console.log(`Fetching blogs for user: ${id}`);
        fetch(`http://localhost:8000/blogs?blogid=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch blogs for user ${id}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched blogs:', data);
                if (Array.isArray(data)) {
                    setBlogs(data);
                } else {
                    setBlogs([]);
                    console.error('Expected array but received:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
                toast.error('Error fetching blogs.');
                setBlogs([]);
            });
    }, [id]);

    // POST method: Add a new blog
    const addBlog = () => {
        const blog = {
            blogid: Number(id),
            title: newTitle,
            body: newBody,
            completed: false
        };

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog),
        })
            .then(response => response.json())
            .then(data => {
                setBlogs([...blogs, data]);
                toast.success('Blog added successfully!');
                setNewTitle(""); // Clear the title input field
                setNewBody(""); // Clear the body input field
            })
            .catch(error => toast.error('Error adding blog: ' + error));
    };

    // PUT method: Update a blog
    const updateBlog = (blogid: number, updatedBlog: Partial<Blog>) => {
        fetch(`http://localhost:8000/blogs/${blogid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBlog),
        })
            .then(response => response.json())
            .then(() => {
                setBlogs(blogs.map(blog => (blog.id === blogid ? { ...blog, ...updatedBlog } : blog)));
                toast.success('Blog updated successfully!');
            })
            .catch(error => toast.error('Error updating blog: ' + error));
    };

    // DELETE method: Remove a blog
    const deleteBlog = (blogid: number) => {
        fetch(`http://localhost:8000/blogs/${blogid}`, {
            method: 'DELETE',
        })
            .then(() => {
                setBlogs(blogs.filter(blog => blog.id !== blogid));
                toast.success('Blog deleted successfully!');
            })
            .catch(error => toast.error('Error deleting blog: ' + error));
    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen">
            <h1 className="text-black text-center text-3xl font-bold mb-6">User {id}'s Blogs</h1>

            {/* Add New Blog */}
            <div className="mb-6">
                <TextField
                    label="Title"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                />
                <TextField
                    label="Body"
                    value={newBody}
                    onChange={e => setNewBody(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    className="mb-4"
                />
                <Button variant="contained" color="primary" onClick={addBlog}>
                    Add Blog
                </Button>
            </div>

            {/* List of Blogs */}
            <div>
                {blogs.length === 0 ? (
                    <p className='text-red-500'>No blogs found for this user.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col mb-4 bg-blue-600 p-4 rounded shadow">
                            <h2 className="text-white text-xl font-semibold">{blog.title}</h2>
                            <p className="text-white">{blog.body}</p>
                            <div className="flex space-x-2 mt-4">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => updateBlog(blog.id, { completed: !blog.completed })}
                                >
                                    {blog.completed ? 'Undo' : 'Complete'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteBlog(blog.id)}
                                >
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

export default Blogs;
