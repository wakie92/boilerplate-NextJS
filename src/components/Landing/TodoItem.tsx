'use client';
import React from 'react';
import { Button, ListGroupItem } from 'reactstrap';

type TodoItemProps = {
  todo: any;
  remove: (todo: any) => void;
};

const TodoItem = ({ todo, remove }: TodoItemProps) => (
  <ListGroupItem style={{ listStyle: 'none' }}>
    {todo.text}
    <Button onClick={() => remove(todo)}>x</Button>
  </ListGroupItem>
);

export default TodoItem;
