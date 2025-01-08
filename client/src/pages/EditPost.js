// EditPost.js
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [cover, setCover] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    
    let validationErrors = {};
    if (!title.trim()) validationErrors.title = 'Title is required';
    if (!summary.trim()) validationErrors.summary = 'Summary is required';
    if (!content.trim()) validationErrors.content = 'Content is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || 'Failed to update post' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred while updating the post' });
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <div className="post-form">
        <h1>Edit Post</h1>
        
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <input
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={ev => setTitle(ev.target.value)}
        />
        {errors.title && (
          <div className="error-message">{errors.title}</div>
        )}

        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        />
        {errors.summary && (
          <div className="error-message">{errors.summary}</div>
        )}

        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
        />
        {errors.file && (
          <div className="error-message">{errors.file}</div>
        )}

        <Editor value={content} onChange={setContent} />
        {errors.content && (
          <div className="error-message">{errors.content}</div>
        )}

        <button style={{ marginTop: '5px' }}>Edit Post</button>
      </div>
    </form>
  );
}