import { INotificacion } from 'interfaces/Notificacion'
import { createContext } from 'react'

interface NotificacionContextProps {
  notificaciones: Array<INotificacion>
  removeNotificacion : (id:string) => {ok:boolean}
  setNotificacion :  (notificacion: INotificacion) => void
}

export const NotificacionContext = createContext<NotificacionContextProps>(
  {} as NotificacionContextProps
)
