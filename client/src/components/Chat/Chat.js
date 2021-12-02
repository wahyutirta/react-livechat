import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
    const location = useLocation();

    useEffect(() => {
        const data = queryString.parse(location.search);

        console.log(location);
        console.log(data);
    })
    return (
        <h1>Chat</h1>
    )
}

export default Chat;