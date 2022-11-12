import { NotificacionContext } from 'Context/Notificaciones/NotificacionContext';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import Notificacion from './Notificacion';

const Notificaciones = () => {
  const notificacionRoot = document.getElementById('notificacion-root');

  const notificacionContext = useContext(NotificacionContext);
  const { notificaciones } = notificacionContext;

  return createPortal(
    <div className='fixed bottom-10 left-4  '>
      {notificaciones.map(v => (
        <Notificacion
          key={v.id}
          data={v}
        />
      ))}
    </div>,
    notificacionRoot
  );
}

export default Notificaciones;