import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import './style.css'

const Notification = ({ notification, onClose }) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    let _image = null
    if (notification.notification.image) {
      _image = notification.notification.image
    } else if (notification.notification.icon) {
      _image = notification.notification.icon
    } else if (
      notification.data &&
      notification.data['gcm.notification.imageUrl']
    ) {
      _image = notification.data['gcm.notification.imageUrl']
    }
    setImage(_image)
  }, [notification])

  return (
    <aside className="data-flyout">
      <h2>Notification</h2>
      <div>
        <div className="heading">
          {image && (
            <div className="img-container">
              <img src={image} />
            </div>
          )}
          <h3>{notification.notification.title}</h3>
        </div>
        <p>{notification.notification.body}</p>
      </div>
      <div className="buttons">
        <a className="button close" onClick={() => onClose()}>
          Close
        </a>
        {notification.notification.click_action && (
          <Link to={notification.notification.click_action} className="button">
            Show more &rarr;
          </Link>
        )}
      </div>
    </aside>
  )
}

export default Notification
