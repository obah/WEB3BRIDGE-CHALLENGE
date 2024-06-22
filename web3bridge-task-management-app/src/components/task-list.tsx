import { ITask } from "../types";
import { TaskItem } from "./task-item";

interface Props {
  listName: string;
  tasks: ITask[];
  editFn?: (task: ITask) => void;
  deleteFn: (taskId: number) => void;
  toggleFn: (taskId: number) => void;
}

export function TaskList({
  listName,
  tasks,
  editFn,
  deleteFn,
  toggleFn,
}: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{listName}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editFn={editFn}
            deleteFn={deleteFn}
            toggleFn={toggleFn}
          />
        ))}
      </div>
    </div>
  );
}
