import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Notifications = ({ notifications }) => {
  return (
    <ul className="notifications truncate">
      { notifications && notifications.map(notification => {
        return (
          <li key={notification.id}>
            <span className="blue-text text-darken-3">{notification.user} </span>
            <span>{notification.action} </span>

            { notification.title && notification.url ?
            <Link to={'/' + notification.authorId + '/posts/' + notification.url}>{notification.title}</Link>
            : null }

            { notification.title && !notification.url ? 
            notification.title
            : null }

            <div className="grey-text note-date">
              {moment(notification.time.toDate()).fromNow()}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Notifications