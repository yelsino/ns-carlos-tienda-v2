import { createContext } from 'react'

interface SocketContextProps {
  socket: any
  online: boolean
  connectSocket: () => void
  disconnectSocket: () => void
}

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
)
