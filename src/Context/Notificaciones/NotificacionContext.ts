import { Notificacion } from 'interfaces/Notificacion'
import { createContext } from 'react'

interface NotificacionContextProps {
  notificaciones: Array<Notificacion>
  removeNotificacion : (id:string) => {ok:boolean}
  setNotificacion :  (notificacion: Notificacion) => void
}

export const NotificacionContext = createContext<NotificacionContextProps>(
  {} as NotificacionContextProps
)
