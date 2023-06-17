import React from 'react'
import NotificationContext from '../context/NotificaitonProvider';

function useNotification() {
  return  React.useContext(NotificationContext)
}

export default useNotification;