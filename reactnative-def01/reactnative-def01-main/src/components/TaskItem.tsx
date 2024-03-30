import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';
import cancelIcon from '../assets/icons/cancel/cancel.png';

interface ITasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, newTaskTitle: string) => void;
}
// import { Container } from './styles';

const TaskItem: React.FC<ITasksItemProps> = ({
  task,
  index,
  removeTask,
  toggleTaskDone,
  updateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setNewTask] = useState(task.title);

  const removeConfirm = () =>
    Alert.alert('Exlucão', `Deseja excluir a task: ${task.title}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      { text: 'Sim', onPress: () => removeTask(task.id) },
    ]);

  function handleCancelEdit() {
    setIsEditing(!isEditing);
    setNewTask(task.title);
  }

  function handleEdit() {
    setIsEditing(!isEditing);
    updateTask(task.id, taskTitle);
  }

  function handleTaskDone() {
    if (isEditing) {
      return;
    }
    toggleTaskDone(task.id);
  }

  return (
    <ItemWrapper index={index}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={handleTaskDone}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            testID={`text-input-${task.title}`}
            editable={isEditing}
            style={[task.done ? styles.taskTextDone : styles.taskText]}
            value={taskTitle}
            onChangeText={setNewTask}
            onSubmitEditing={handleEdit}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            onPress={handleCancelEdit}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              testID={`edit-${index}`}
              style={{ marginRight: 10 }}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
            <TouchableOpacity testID={`trash-${index}`} onPress={removeConfirm}>
              <Image source={trashIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    height: 18,
    padding: 0,
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 18,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    padding: 0,
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});

export default TaskItem;
