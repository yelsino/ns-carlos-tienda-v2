
export interface Notificacion {
 id?: string
 show?: boolean
 type: number
 message: string
}

export interface NotificacionState {
notificaciones: Array<Notificacion>
}