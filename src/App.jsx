import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null) 

  const blogFormRef = useRef()

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
      blogService.setToken(user.token)
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
      setNotificationMessage('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000);
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog.user.id)
        blogService.getUser(returnedBlog.user.id)
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`New blog added: ${blogObject.title} by ${blogObject.author}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000);
      })
      .catch(error => {
        setNotificationMessage('Error creating the blog')
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000);
      })
  }

  const handleLogout = () => {
    setNotificationMessage(`${user.name} has been logged out successfully.`)
    setNotificationType('success')

    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const updateBlog = (likes) => {
    setBlogs(blogs.map(blog => blog.id === likes.id ? likes : blog));
 }
  

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} type={notificationType} />
        <LoginForm
          onSubmit={handdleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <h3>{user.name} logged in</h3>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel={'Create'} ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>


      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateBlog}/>
        )}
      </div>
    </div>
  )
}

export default App