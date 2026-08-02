// TaskDashboard.tsx
// Implement a dashboard interface for managing tasks, including features like task lists, creation, editing, and deletion.
import { useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import type { Task } from "../types/tasks";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Setup Auth0",
    description: "Configure auth provider",
    status: "Pending",
    priority: "High",
  },
  {
    id: "2",
    title: "Build Dashboard",
    description: "Display list of tasks",
    status: "In Progress",
    priority: "High",
  },
];

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Task Dashboard</h2>
        </Col>
      </Row>

      <Row>
        {tasks.map((task) => (
          <Col md={4} key={task.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  Status: {task.status}
                </Card.Subtitle>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete Task
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskDashboard;
