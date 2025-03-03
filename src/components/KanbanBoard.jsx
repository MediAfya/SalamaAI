import { useState } from "react";

export function useKanbanActions(initialColumns, initialTasks) {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function updateTask(id, content) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, content } : task)),
    );
  }

  function createNewColumn() {
    const newColumn = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id) {
    setColumns(columns.filter((col) => col.id !== id));
    setTasks(tasks.filter((task) => task.columnId !== id));
  }

  function updateColumn(id, title) {
    setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)));
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  return {
    columns,
    setColumns,
    tasks,
    setTasks,
    createTask,
    deleteTask,
    updateTask,
    createNewColumn,
    deleteColumn,
    updateColumn,
  };
}
