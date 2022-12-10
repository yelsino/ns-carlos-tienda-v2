
export interface INotificacion {
  id?: string
  show?: boolean
  type: number
  message: string
}

export interface NotificacionState {
 notificaciones: Array<INotificacion>
}