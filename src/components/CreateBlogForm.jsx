import React from 'react';

const CreateBlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleSubmit}) => {
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type='text'
                        name='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label>Url</label>
                    <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
}

export default CreateBlogForm;
