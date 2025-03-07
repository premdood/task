import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(`https://task-backend-five-teal.vercel.app/api/greet?name=${name}`);
      if (response.ok) {
        const { message } = await response.json();
        setData(message);
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setData(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        type='text'
        value={name}
        htmlFor='name'
        className='input'
        onChange={handleChange}
        placeholder='Enter your name'
      />
      <button className='btn' disabled={loading}>
        Get Greeting
      </button>
      {data && (
        <p
          className='message'
          style={{
            color: error ? 'red' : 'green',
          }}
        >
          {data}
        </p>
      )}
    </form>
  );
}

export default App;
