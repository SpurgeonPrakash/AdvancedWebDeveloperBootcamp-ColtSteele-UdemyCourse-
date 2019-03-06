import React from 'react';

const Todo = ({task, removeTodo}) => (
  <li>{task}<button onClick={removeTodo}>Remove</button></li>
)

export default Todo;
