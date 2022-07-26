import { useCallback, useEffect, useState } from 'react'
// import io from 'socket.io-client'
import { io, Socket } from 'socket.io-client'

interface DefaultEventsMap {}

export interface SocketProps {
  on: (action: string, callback: (data: any) => void) => void
  emit?: (action: string, data: object) => void
  disconnect: () => void
  connected: boolean
}

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<SocketProps>()
  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('token')

    const socketTemp: SocketProps = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token
      }
    })

    setSocket(socketTemp)
  }, [serverPath])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    if (socket) {
      setOnline(socket?.connected)
    }
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }
}
