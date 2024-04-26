import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getUser = async (userId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`/api/users/${userId}`, config)
  return response.data
}

const getBlogById = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)

  const user = await getUser(response.data.user)

  response.data.user = user

  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const updateLikes = async (id) => {  
  const blog = await getBlogById(id)

  const updateLikes = blog.likes + 1

  const updateResponse = await axios.put(`${baseUrl}/${id}`, { likes: updateLikes })

  return updateResponse.data
}

export default { getAll, getUser, create, updateLikes, deleteBlog, setToken, getBlogById }