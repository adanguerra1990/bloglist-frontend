import { useState } from "react"

const Blog = ({ blog, onDelete, currentUserId, updateLikes }) => {
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
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <button onClick={toggleDetails}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <div>
            <p>{blog.url}</p>
            <p>likes: {blog.likes}</p>
            <button onClick={updateLikes}>like</button>
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