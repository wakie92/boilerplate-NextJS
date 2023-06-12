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
import { uniqueId } from 'lodash-es';
import { useAtom, useSetAtom } from 'jotai';

import { derivedTodoAtom, removeTodoAtom } from 'src/atoms/todos';

import TodoItem from './TodoItem';

const Todo = () => {
  const [text, changeText] = useState('');

  const [derivedAtom, setDerivedAtom] = useAtom(derivedTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);

  const handleAddTodo = () => {
    setDerivedAtom({ id: uniqueId(), todo: text });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };

  const removeItem = (id: string) => {
    removeTodo({ id });
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
            {derivedAtom.map((todo, i) => (
              <TodoItem key={`#${i.toString()}-todo`} todo={todo} remove={removeItem} />
            ))}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default Todo;
