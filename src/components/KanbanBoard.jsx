import React, { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { IconPlus } from "@tabler/icons-react";

function KanbanBoard({ state }) {
  console.log(state);

  const defaultCols =
    state?.state?.columns?.map((col) => ({
      id: col?.id,
      title: col?.title,
    })) || [];

  const defaultTasks =
    state?.state?.tasks?.map((task) => ({
      id: task?.id,
      columnId: task?.columnId,
      content: task?.content,
    })) || [];

  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState(defaultTasks);

  return (
    <div className="mt-5 min-h-screen w-72 text-white">
      <DndContext
        sensors={useSensors(
          useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
        )}
      >
        <div className="m-auto flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
          <button
            onClick={() => createNewColumn()}
            className="flex h-[60px] w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-green-500 hover:ring-2"
          >
            <IconPlus />
            Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
