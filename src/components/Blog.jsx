import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, onDelete, currentUserId }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      const updateBlog = await blogService.updateLikes(blog.id)
      updateLikes(updateBlog)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handdleDeleteBlog = async () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        onDelete()
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  }

  return (
    <div style={blogStyle} className="container-blog">
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>            
            <p>{blog.url}</p>            
            <p>likes: {blog.likes}</p>
            <button onClick={handleLike}>like</button>            
            <p>Added by: {blog.user.name}</p>            
            {currentUserId && blog.user.id === currentUserId && (
              <button onClick={handdleDeleteBlog}>Remove</button>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Blog