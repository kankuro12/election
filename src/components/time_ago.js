import React, { useState, useEffect } from 'react';

const TimeAgo = ({ datetime }) => {
  const [timeAgo, setTimeAgo] = useState('');


  useEffect(() => {
    const date = new Date(datetime);
    const interval = setInterval(() => {
      const seconds = Math.floor((new Date() - date) / 1000);
      if (seconds < 60) {
        setTimeAgo(`${seconds} seconds ago`);
      } else if (seconds < 3600) {
        setTimeAgo(`${Math.floor(seconds / 60)} minutes ago`);
      } else if (seconds < 86400) {
        setTimeAgo(`${Math.floor(seconds / 3600)} hours ago`);
      } else {
        setTimeAgo(`${Math.floor(seconds / 86400)} days ago`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [datetime]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
