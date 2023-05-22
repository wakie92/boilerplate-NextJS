'use client';

import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ListGroup,
} from 'reactstrap';

import TodoItem from './TodoItem';

const todos = [];
const Todo = () => {
  const [text, changeText] = useState('');

  const handleAddTodo = () => {
    if (text !== '') {
      changeText('');
    }
  };

  const handleTextChange = value => {
    changeText(value);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleAddTodo}>
          <FormGroup>
            <Label>Add ToDo:</Label>
            <Input onChange={handleTextChange} name="addTodoInput" value={text} />
            <FormFeedback>Required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button disabled={text === ''} onClick={handleAddTodo}>
              Submit
            </Button>
          </FormGroup>
        </Form>
        <br />
        <div>
          <ListGroup>
            {todos.map((todo, i) => (
              <TodoItem key={`#${i.toString()}-todo`} todo={todo} remove={() => changeText('')} />
            ))}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default Todo;
