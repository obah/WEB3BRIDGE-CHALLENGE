import { CreateTask } from "./components/create-task";
import { ITask } from "./types";
import { TaskList } from "./components/task-list";
import { useEffect, useState } from "react";

export default function App() {
  const [activeTasks, setActiveTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

  useEffect(() => {
    const storedActiveTasks = localStorage.getItem("activeTasks");
    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedActiveTasks) {
      setActiveTasks(JSON.parse(storedActiveTasks));
    }

    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [activeTasks, completedTasks]);

  const handleSaveTask = (task: ITask) => {
    if (taskToEdit) {
      const updatedTasks = activeTasks.map((t) =>
        t.id === task.id ? task : t
      );
      setActiveTasks(updatedTasks);
      setTaskToEdit(null);
    } else {
      setActiveTasks([...activeTasks, task]);
    }
  };

  const handleEditTask = (task: ITask) => {
    setTaskToEdit(task);
  };

  const handleDeleteTask = (taskId: number) => {
    setActiveTasks(activeTasks.filter((t) => t.id !== taskId));
    setCompletedTasks(completedTasks.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId: number) => {
    const task = activeTasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      if (updatedTask.completed) {
        setCompletedTasks([...completedTasks, updatedTask]);
        setActiveTasks(activeTasks.filter((t) => t.id !== taskId));
      } else {
        setActiveTasks([...activeTasks, updatedTask]);
        setCompletedTasks(completedTasks.filter((t) => t.id !== taskId));
      }
    } else {
      const completedTask = completedTasks.find((t) => t.id === taskId);
      if (completedTask) {
        const updatedTask = {
          ...completedTask,
          completed: !completedTask.completed,
        };
        if (updatedTask.completed) {
          setCompletedTasks(
            completedTasks.map((t) => (t.id === taskId ? updatedTask : t))
          );
        } else {
          setActiveTasks([...activeTasks, updatedTask]);
          setCompletedTasks(completedTasks.filter((t) => t.id !== taskId));
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Web3Bridge Task Management App
      </h1>
      <CreateTask
        onSave={handleSaveTask}
        taskToEdit={taskToEdit || undefined}
      />
      <TaskList
        listName="Active Tasks"
        tasks={activeTasks}
        editFn={handleEditTask}
        deleteFn={handleDeleteTask}
        toggleFn={handleToggleComplete}
      />
      <TaskList
        listName="Completed Tasks"
        tasks={completedTasks}
        deleteFn={handleDeleteTask}
        toggleFn={handleToggleComplete}
      />
    </div>
  );
}
