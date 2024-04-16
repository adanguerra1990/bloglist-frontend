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

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create', response.data.user)

 const user = await getUser(response.data.user)
 console.log(user)

  response.data.user = user

  return response.data
}

export default { getAll, getUser, create, setToken }