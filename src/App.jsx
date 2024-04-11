import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, []);

  const handdleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      console.error('loggin filed', exeption)
    }
  }

  const addBlog = event => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))        
        setTitle('')
        setAuthor('')
        setUrl('')
      })

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handdleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Usename'
              autoComplete='current-username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              autoComplete='current-password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name} logged in</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Ceeate New</h2>
        <form onSubmit={addBlog}>
          <div>
            <label>Title</label>
            <input
              type='text'
              name='title'
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type='text'
              name='author'
              value={author}
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label>Url</label>
            <input
              type='text'
              value={url}
              name='url'
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>Create</button>
        </form>
      </div>

      <h2>blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App