import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  console.log('blog', blog)

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>
            {blog.author}
            <br />
            {blog.url}
            <br />
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
            <br />
            Added by: {blog.user.name}
          </div>
        </div>
      )}

    </div>
  )
}

export default Blog