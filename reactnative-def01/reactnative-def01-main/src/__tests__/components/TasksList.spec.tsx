import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TasksList } from '../../components/TasksList';
import { Alert } from 'react-native';

let tasks: {
  id: number;
  title: string;
  done: boolean;
}[] = [];

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;
let mockedUpdateTask: jest.Mock;

describe('MyTasksList', () => {
  beforeAll(() => {
    tasks = [
      {
        id: new Date().getTime(),
        title: 'Primeiro todo',
        done: false,
      },
      {
        id: new Date().getTime() + 1,
        title: 'Segundo todo',
        done: false,
      },
      {
        id: new Date().getTime() + 2,
        title: 'Terceiro todo',
        done: true,
      },
    ];

    mockedRemoveTask = jest.fn();
    mockedToggleTaskDone = jest.fn();
    mockedUpdateTask = jest.fn();
  });

  it('should be able to render all tasks', () => {
    const { getByTestId } = render(
      <TasksList
        tasks={tasks}
        removeTask={mockedRemoveTask}
        toggleTaskDone={mockedToggleTaskDone}
        updateTask={mockedUpdateTask}
      />
    );

    getByTestId(`text-input-Primeiro todo`);
    getByTestId(`text-input-Segundo todo`);
    getByTestId(`text-input-Terceiro todo`);
  });

  it('should be able to handle "removeTask" event', () => {
    const { getByTestId } = render(
      <TasksList
        tasks={tasks}
        removeTask={mockedRemoveTask}
        toggleTaskDone={mockedToggleTaskDone}
        updateTask={mockedUpdateTask}
      />
    );
    const firstTaskTrashIcon = getByTestId('trash-0');

    fireEvent(firstTaskTrashIcon, 'press');
  });

  it('should be able to handle "toggleTaskDone" event', () => {
    const { getByTestId } = render(
      <TasksList
        tasks={tasks}
        removeTask={mockedRemoveTask}
        toggleTaskDone={mockedToggleTaskDone}
        updateTask={mockedUpdateTask}
      />
    );
    const secondTask = getByTestId('text-input-Segundo todo');

    fireEvent.press(secondTask);

    expect(mockedToggleTaskDone).toHaveBeenCalledWith(tasks[1].id);
  });
});
