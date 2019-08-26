import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const GET_TODOS = gql`
  query {
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
  mutation CreateATodo($text: String!) {
    createTodo(data: {text: $text, completed: false}) {
      _id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteATodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
      text
      completed
    }
  }
`;

function App() {
  const {loading, error, data} = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: {createTodo},
      },
    ) {
      const {todos} = cache.readQuery({query: GET_TODOS});
      todos.data = [createTodo, ...todos.data];
      cache.writeQuery({
        query: GET_TODOS,
        data: {todos},
      });
    },
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(
      cache,
      {
        data: {deleteTodo},
      },
    ) {
      const {todos} = cache.readQuery({query: GET_TODOS});
      todos.data = [...todos.data].filter(todo => todo.id !== deleteTodo)
      cache.writeQuery({
        query: GET_TODOS,
        data: {todos},
      });
    },
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo({variables: {text: inputs.text}});
    setInputs((inputs) => ({
      ...inputs,
      text: '',
    }));
  };

  const handleDelete = (event) => {
    delete
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='todo'>ADD TODO</label>
        <input
          type='text'
          id='text'
          value={inputs.text}
          onChange={handleChange}
        />
        <button type='submit'>ADD TODO</button>
      </form>

      {data.todos.data.map(({_id, text, completed}) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

export default App;
