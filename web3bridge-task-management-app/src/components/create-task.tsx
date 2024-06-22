import { ITask } from "../types";
import React, { useState, useEffect } from "react";

interface Props {
  onSave: (task: ITask) => void;
  taskToEdit?: ITask;
}

export function CreateTask({ onSave, taskToEdit }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ITask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      dueDate,
      completed: taskToEdit ? taskToEdit.completed : false,
    };
    onSave(newTask);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
