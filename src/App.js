import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const GET_TODOS = gql`
  {
    todos {
      data {
        _id
        text
        completed
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    createTodo(data: {text: $text, completed: false}) {
      _id
      text
      completed
    }
  }
`;

function App() {
  const [inputs, setInputs] = useState({
    text: '',
  });

  const handleChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.id]: event.target.value,
    }));
  };

  const {loading, error, data} = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: {addTodo},
      },
    ) {
      const {todos} = cache.readQuery({query: GET_TODOS});
      cache.writeQuery({
        query: GET_TODOS,
        data: {todos: todos.concat([addTodo])},
      });
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <div>
      <form>
        <label htmlFor='todo'>ADD TODO</label>
        <input
          type='text'
          id='text'
          value={inputs.text}
          onChange={handleChange}
        />
      </form>

      {data.todos.data.map(({_id, text, completed}) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

export default App;
