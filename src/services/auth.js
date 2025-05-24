import { v4 as uuid } from 'uuid'
import { api } from './api'

const delay = (amount = 2000) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest({ user, password }) {
  // await delay()
  try {
    const response = await api.post('/api/v1/login', { user, password })
    console.log('auth>>', response)

    const token = response.data.token
    console.log('token', token)

    return {
      token: token,
      user: {
        name: 'B. Santana',
        email: 'bruno@mail.com',
        avatar_url: 'https://github.com/bsantana.png'
      }
    }
  } catch (err) {
    console.log(err.message)
    console.log(err.response.data)
    throw err;
  }
}

export async function recoveryUserInformation(data) {
  // await delay()

  return {
    token: uuid(),
    user: {
      name: 'B. Santana',
      email: 'bruno@mail.com',
      avatar_url: 'https://github.com/bsantana.png'
    }
  }
}