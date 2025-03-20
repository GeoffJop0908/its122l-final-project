import React from 'react';
import { AnimatePresence } from 'motion/react';
import Success from './Success';
import Error from './Error';
import useAlertStore from '../store/useAlertStore';

export default function Alerts() {
  const messages = useAlertStore((state) => state.messages);

  return (
    <div className="fixed bottom-5 z-100 flex flex-col gap-3 left-1/2 transform -translate-x-1/2">
      <AnimatePresence>
        {messages.map((message, index) => {
          if (message.type === 'error') {
            return <Error key={index} message={message.message} />;
          } else if (message.type === 'success') {
            return <Success message={message.message} />;
          }
        })}
      </AnimatePresence>
    </div>
  );
}
