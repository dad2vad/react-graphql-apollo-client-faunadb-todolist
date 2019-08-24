import React from 'react';
import {useQuery} from '@apollo/react-hooks';
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

function App() {
  const {loading, error, data} = useQuery(GET_TODOS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <div>
      {data.todos.data.map(({_id, text, completed}) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

export default App;
