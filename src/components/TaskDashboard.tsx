// TaskDashboard.tsx
// Implement a dashboard interface for managing tasks, including features like task lists, creation, editing, and deletion.
import { useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import type { Task } from "../types/tasks";
import TaskDetail from "./TaskDetail";
import TaskFormModal from "./TaskModal";
import { useTasks } from "../context/TaskContext";

const TaskDashboard = () => {
  const { tasks, deleteTask, updateTask, addTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = (id: string) => {
    deleteTask(id);
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask);
    setSelectedTask(updatedTask);
  };

  return (
    <Container className="mt-4">
      {selectedTask ? (
        <Row className="justify-content-center">
          <Col md={8}>
            <TaskDetail
              task={selectedTask}
              onUpdateTask={handleUpdateTask}
              onBack={() => setSelectedTask(null)}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row className="mb-3 align-items-center">
            <Col className="d-flex justify-content-center">
              <h2 className="main-title">Task Dashboard</h2>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                className="create-task-btn"
              >
                + Create Task
              </Button>
            </Col>
          </Row>

          <Row>
            {tasks.map((task) => (
              <Col md={4} key={task.id} className="mb-3">
                <Card
                  className="card h-100 shadow-sm"
                  style={{
                    borderLeft: `5px solid ${task.status === "Completed" ? "#10b981" : task.status === "In Progress" ? "#f59e0b" : "#6b7280"}`,
                  }}
                >
                  <Card.Body className="d-flex flex-column align-items-center p-2">
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text className="text-truncate">
                      {task.description}
                    </Card.Text>
                    <Card.Subtitle className="mb-3 text-muted">
                      Status: <strong>{task.status}</strong>
                    </Card.Subtitle>
                    <div className="mt-auto mb-2 d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete Task
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <TaskFormModal
            show={showCreateModal}
            onHide={() => setShowCreateModal(false)}
            onAddTask={addTask}
          />
        </>
      )}
    </Container>
  );
};

export default TaskDashboard;
