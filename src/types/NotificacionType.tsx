import { INotificacion } from "interfaces/notificacion.interface";

export type NotificacionAction =
  | { type: 'UPDATE_NOTIFICATION'; payload: string }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: INotificacion }

