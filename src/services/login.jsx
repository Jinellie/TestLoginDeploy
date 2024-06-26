import axios from 'axios'
const baseUrl = 'https://autenticacion-global-dreamlab.azurewebsites.net/api/user/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data
}

export default { login }