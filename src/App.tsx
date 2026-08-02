import { TaskProvider } from "./context/TaskContext";
import TaskDashboard from "./components/TaskDashboard";

function App() {
  return (
    <TaskProvider>
      <TaskDashboard />
    </TaskProvider>
  );
}

export default App;
