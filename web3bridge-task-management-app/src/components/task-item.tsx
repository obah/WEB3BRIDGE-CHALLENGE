import { ITask } from "../types";
import { DeleteIcon, EditIcon } from "./ui/icons";

interface Props {
  task: ITask;
  editFn?: (task: ITask) => void;
  deleteFn: (taskId: number) => void;
  toggleFn: (taskId: number) => void;
}

export function TaskItem({ task, editFn, deleteFn, toggleFn }: Props) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleFn(task.id)}
          className="mr-2"
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.title}
        </span>
        <span className="ml-4 text-sm text-gray-500">{task.dueDate}</span>
      </div>
      <div className="flex gap-2">
        {editFn && (
          <button onClick={() => editFn(task)} className="text-blue-500">
            <EditIcon />
          </button>
        )}
        <button onClick={() => deleteFn(task.id)} className="text-red-500">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
