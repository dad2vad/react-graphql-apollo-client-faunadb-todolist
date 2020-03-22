import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const GET_TODOS = gql`
  query {
    getTodos {
      data {
        _id
        task
        isCompleted
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation createTodo($task: String!) {
    createTodo(data: {task: $task, isCompleted: false}) {
      _id
      task
      isCompleted
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
      task
      isCompleted
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
      const {getTodos} = cache.readQuery({query: GET_TODOS});
      getTodos.data = [createTodo, ...getTodos.data];
      cache.writeQuery({
        query: GET_TODOS,
        data: {getTodos},
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
      const {getTodos} = cache.readQuery({query: GET_TODOS});
      getTodos.data = [...getTodos.data].filter((todo) => todo._id !== deleteTodo._id);
      cache.writeQuery({
        query: GET_TODOS,
        data: {getTodos},
      });
    },
  });

  const [inputs, setInputs] = useState({
    task: '',
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
    addTodo({variables: {task: inputs.task}});
    setInputs((inputs) => ({
      ...inputs,
      task: '',
    }));
  };

  const handleDelete = (id) => {
    deleteTodo({variables: {id}});
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='todo'>ADD TODO</label>
        <input
          type='text'
          id='task'
          value={inputs.task}
          onChange={handleChange}
        />
        <button type='submit'>ADD TODO</button>
      </form>

      {data.getTodos.data.map(({_id, task, isCompleted}) => (
        <div key={_id}>
          {task}
          <button onClick={() => handleDelete(_id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
