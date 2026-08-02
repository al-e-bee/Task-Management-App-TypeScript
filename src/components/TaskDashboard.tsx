// TaskDashboard.tsx
// Implement a dashboard interface for managing tasks, including features like task lists, creation, editing, and deletion.
import { useState } from "react";
import { Col, Container, Row, Card, Button, Badge } from "react-bootstrap";
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
            <Col>
              <h2>Task Dashboard</h2>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
              >
                + Create Task
              </Button>
            </Col>
          </Row>

          <Row>
            {tasks.map((task) => (
              <Col md={4} key={task.id} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text className="text-truncate">
                      {task.description}
                    </Card.Text>
                    <Card.Subtitle className="mb-3">
                      <Badge
                        bg={
                          task.status === "Completed"
                            ? "success"
                            : task.status === "In Progress"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        Status: {task.status}
                      </Badge>
                    </Card.Subtitle>
                    <div className="mt-auto mb-3 d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </Button>
                    </div>
                    <Button
                      variant="outline-danger"
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
