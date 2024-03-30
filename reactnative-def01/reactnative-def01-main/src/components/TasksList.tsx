import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, newTaskTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  updateTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            index={index}
            task={item}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
            updateTask={updateTask}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
