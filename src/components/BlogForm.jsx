import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={newTitle}
                        onChange={ event => setNewTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type='text'
                        name='author'
                        value={newAuthor}
                        onChange={ event => setNewAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <label>Url</label>
                    <input
                        type='text'
                        value={newUrl}
                        name='url'
                        onChange={ event => setNewUrl(event.target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
}

export default BlogForm;
