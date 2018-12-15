import React from 'react'
import moment from 'moment'

const Notifications = ({ notifications }) => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          { notifications ? 
            <span className="card-title">Notifications</span>          
            : null }
          
          <ul className="notifications">
            { notifications && notifications.map(item => {
              return (
                <li key={item.id}>
                  <span className="pink-text">{item.user} </span>
                  <span>{item.content}</span>
                  <div className="grey-text note-date">
                    {moment(item.time.toDate()).fromNow()}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications