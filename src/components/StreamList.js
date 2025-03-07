import React, { useState, useEffect } from 'react';

function StreamList() {
  const [streams, setStreams] = useState([]);
  const [streamName, setStreamName] = useState('');
  const [streamGenre, setStreamGenre] = useState('');

  useEffect(() => {
    const storedStreams = JSON.parse(localStorage.getItem('streams')) || [];
    setStreams(storedStreams);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStream = { name: streamName, genre: streamGenre, completed: false };
    const updatedStreams = [...streams, newStream];
    setStreams(updatedStreams);
    localStorage.setItem('streams', JSON.stringify(updatedStreams));
    setStreamName('');
    setStreamGenre('');
  };

  const handleDelete = (index) => {
    const updatedStreams = streams.filter((_, i) => i !== index);
    setStreams(updatedStreams);
    localStorage.setItem('streams', JSON.stringify(updatedStreams));
  };

  const handleToggleComplete = (index) => {
    const updatedStreams = streams.map((stream, i) =>
      i === index ? { ...stream, completed: !stream.completed } : stream
    );
    setStreams(updatedStreams);
    localStorage.setItem('streams', JSON.stringify(updatedStreams));
  };

  return (
    <div className="stream-list">
      <h2>Stream List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stream Name"
          value={streamName}
          onChange={(e) => setStreamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={streamGenre}
          onChange={(e) => setStreamGenre(e.target.value)}
        />
        <button type="submit">Add Stream</button>
      </form>
      <ul>
        {streams.map((stream, index) => (
          <li key={index} className={stream.completed ? 'completed' : ''}>
            {stream.name} - {stream.genre}
            <button onClick={() => handleToggleComplete(index)}>
              {stream.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
