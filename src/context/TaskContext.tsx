// TaskContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/tasks";

// Define the shape of the Context State and Actions
interface TaskContextType {
  tasks: Task[];
  addTask: (newTask: Omit<Task, "id">) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

// 1. Create the Context object
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 2. Create the Provider Component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTaskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// 3. Create a Custom Hook for easy access & type safety
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
