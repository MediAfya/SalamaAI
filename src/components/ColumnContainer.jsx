import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { IconPlus, IconTrash } from "@tabler/icons-react";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="dragging-style"></div>;
  }

  return (
    <div ref={setNodeRef} style={style} className="column-container">
      {/* Column Title and Edit Mode */}
      <div {...attributes} {...listeners} onClick={() => setEditMode(true)} className="column-header">
        {!editMode && column.title}
        {editMode && (
          <input
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => { if (e.key === "Enter") setEditMode(false); }}
          />
        )}
        <button onClick={() => deleteColumn(column.id)}>
          <IconTrash />
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </SortableContext>
      </div>

      {/* Add Task Button */}
      <button onClick={() => createTask(column.id)} className="add-task-button">
        <IconPlus /> Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
