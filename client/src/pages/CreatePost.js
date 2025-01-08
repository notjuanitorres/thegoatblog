import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
    ],
};

export default function CreatePost() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});

    async function createNewPost(ev) {
        ev.preventDefault();

        // Validation logic
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!summary.trim()) newErrors.summary = 'Summary is required.';
        if (!content.trim()) newErrors.content = 'Content is required.';
        if (!files || files.length === 0) newErrors.files = 'Please select a file.';

        setErrors(newErrors);

        // Stop form submission if there are errors
        if (Object.keys(newErrors).length > 0) return;

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        try {
            const response = await fetch('http://localhost:4000/post', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                alert('Failed to create post. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            alert('An error occurred while creating the post.');
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={createNewPost} style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Title Input */}
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                {errors.title && (
                    <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.title}</span>
                )}
            </div>

            {/* Summary Input */}
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="text" 
                    placeholder="Summary" 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)} 
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                {errors.summary && (
                    <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.summary}</span>
                )}
            </div>

            {/* File Input */}
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="file" 
                    onChange={(ev) => setFiles(ev.target.files)} 
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                {errors.files && (
                    <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.files}</span>
                )}
            </div>

            {/* Content Editor */}
            <div style={{ marginBottom: '15px' }}>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="snow"
                />
                {errors.content && (
                    <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.content}</span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Create Post
            </button>
        </form>
    );
}
