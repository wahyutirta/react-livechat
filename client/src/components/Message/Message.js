import React from 'react';

import './Message.css';


const Message = ({ message : {user, text}, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="MessageText colorWhite">{text}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <p className="sentText">{text}</p>
                <div className="messageBox backgroundLight">
                </div>
                    <p className="MessageText colorDark">{user}</p>
            </div>
        )
        
        )
    
}

export default Message;