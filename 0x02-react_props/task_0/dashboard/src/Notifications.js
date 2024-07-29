// Notifications.js
import React from "react";
import "./Notifications.css";
import closeIcon from "./close.png";
import { getLatestNotification } from "./utils";

function Notifications() {
  const handleCloseClick = () => {
    console.log("Close button has been clicked");
  };

  return (
    <div className="Notifications">
      <button
        style={{ float: "right" }}
        aria-label="Close"
        onClick={handleCloseClick}
      >
        <img
          src={closeIcon}
          alt="close icon"
          style={{ width: "20px", height: "20px" }}
        />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
    </div>
  );
}

export default Notifications;
