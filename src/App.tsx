import { useAuth0 } from "@auth0/auth0-react";
import { Container, Card, Button } from "react-bootstrap";
import { TaskProvider } from "./context/TaskContext";
import TaskDashboard from "./components/TaskDashboard";
import NavigationBar from "./components/Navbar";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return (
    <TaskProvider>
      <NavigationBar />
      {isLoading ? (
        <Container className="text-center mt-5">
          <h3>Loading application...</h3>
        </Container>
      ) : isAuthenticated ? (
        <TaskDashboard />
      ) : (
        <Container className="mt-5 text-center">
          <Card className="p-5 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
            <h2>Welcome to Task Manager</h2>
            <p className="text-muted mt-2">
              Please log in to manage your tasks and dashboard.
            </p>
            <div className="mt-3">
              <Button variant="primary" onClick={() => loginWithRedirect()}>
                Login / Sign Up
              </Button>
            </div>
          </Card>
        </Container>
      )}
    </TaskProvider>
  );
}

export default App;
