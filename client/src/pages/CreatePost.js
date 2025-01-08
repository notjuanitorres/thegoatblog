import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function CreatePost() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});

    async function createNewPost(ev) {
        ev.preventDefault();

        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!summary.trim()) newErrors.summary = 'Summary is required.';
        if (!content.trim()) newErrors.content = 'Content is required.';
        if (!files || files.length === 0) newErrors.files = 'Please select a file.';

        setErrors(newErrors);

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
                credentials: 'include',
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
        <form onSubmit={createNewPost}>
            <div className="post-form">
                {/* Title Input */}
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    {errors.title && (
                        <span className="error-message">{errors.title}</span>
                    )}
                </div>

                {/* Summary Input */}
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Summary" 
                        value={summary} 
                        onChange={(e) => setSummary(e.target.value)} 
                    />
                    {errors.summary && (
                        <span className="error-message">{errors.summary}</span>
                    )}
                </div>

                {/* File Input */}
                <div className="input-group">
                    <input 
                        type="file" 
                        onChange={(ev) => setFiles(ev.target.files)} 
                    />
                    {errors.files && (
                        <span className="error-message">{errors.files}</span>
                    )}
                </div>

                {/* Content Editor */}
                <div className="editor-container">
                    <Editor value={content} onChange={setContent} />
                    {errors.content && (
                        <span className="error-message">{errors.content}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Create Post
                </button>
            </div>
        </form>
    );
}