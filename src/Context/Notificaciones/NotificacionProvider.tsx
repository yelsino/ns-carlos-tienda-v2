import { useReducer } from 'react'
import { notificacionReducer } from './NotificacionReducer'
import { NotificacionContext } from './NotificacionContext'
import { INotificacion, NotificacionState } from 'interfaces/Notificacion'



interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: NotificacionState = {
  notificaciones: [],
}

export const NotificacionProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(notificacionReducer, INITIAL_STATE)

  const setNotificacion = (props:INotificacion) => {
    const finditem = state.notificaciones.find(v => v.message === props.message);
    if (finditem) removeNotificacion(finditem.id);
     dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `${Date.now()}${(Math.random() * 10)}`,
        show: true,
        ...props
      }
    })
  }

  const removeNotificacion = (id:string) => {

    Promise.resolve(() => {
      dispatch({
        type: 'UPDATE_NOTIFICATION',
        payload: id
      });

    }).then(() => {
        return dispatch({
          type: 'REMOVE_NOTIFICATION',
          payload: id
        })
    })
    return { ok: true }
  }


  return (
    <NotificacionContext.Provider
      value={{
        notificaciones: state.notificaciones,
        removeNotificacion,
        setNotificacion,
      }}
    >
      {children}
    </NotificacionContext.Provider>
  )
}

