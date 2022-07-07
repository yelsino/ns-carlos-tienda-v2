// const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = import.meta.env.VITE_SOME_KEY
interface Props {
  endpoint: string
  body?: object
  method?: string
}

export const fetchSinToken = async ({
  endpoint,
  body,
  method = 'GET'
}: Props) => {
  const url = `${baseUrl}/api/${endpoint}`

  if (method === 'GET') {
    const resp = await fetch(url)
    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await resp.json()
  }
}

export const fetchConToken = async ({
  endpoint,
  body,
  method = 'GET'
}: Props) => {
  const url = `${baseUrl}/api/${endpoint}`
  const token = localStorage.getItem('token') || ''

  if (method === 'GET') {
    const resp = await fetch(url, {
      headers: {
        'x-token': token
      }
    })
    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'x-token': token
      },
      body: JSON.stringify(body)
    })

    return await resp.json()
  }
}
