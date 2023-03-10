import React, { useState } from 'react';

export function useFlashMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('purple');


  const show = (message,color) => {
    setMessage(message);
    setIsVisible(true);
    setColor(color);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return { isVisible, message,color, show, hide };

}