'use client';
import React from 'react';
import { Button, ListGroupItem } from 'reactstrap';

import { Todo } from 'src/atoms/todos';

type TodoItemProps = {
  todo: Todo;
  remove: (id: string) => void;
};

const TodoItem = ({ todo, remove }: TodoItemProps) => (
  <ListGroupItem style={{ listStyle: 'none' }}>
    {todo.todo}
    <Button onClick={() => remove(todo.id)}>x</Button>
  </ListGroupItem>
);

export default TodoItem;
