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

  const pendingTasks = tasks.filter((t) => t.status === "Pending");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  const renderTaskColumn = (
    columnTitle: string,
    columnTasks: Task[],
    borderHeaderColor: string,
  ) => (
    <Col lg={4} md={12} className="mb-4">
      <div className="p-3 rounded border h-100 shadow-sm">
        <div
          className="d-flex justify-content-between align-items-center mb-3 pb-2"
          style={{ borderBottom: `3px solid ${borderHeaderColor}` }}
        >
          <h5 className="mb-0 fw-bold">{columnTitle}</h5>
          <Badge bg="dark" pill>
            {columnTasks.length}
          </Badge>
        </div>

        {columnTasks.length === 0 ? (
          <p className="text-muted text-center py-4 small">
            No tasks in this stage
          </p>
        ) : (
          columnTasks.map((task) => (
            <Card key={task.id} className="mb-3 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="h6 fw-bold">{task.title}</Card.Title>
                <Card.Text className="text-muted small text-truncate">
                  {task.description || "No description provided."}
                </Card.Text>
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="outline-primary"
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
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Col>
  );

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
          <Row className="mb-4 align-items-center">
            <Col className="d-flex justify-content-center">
              <h2 className="main-title">Tasks</h2>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                className="create-task-btn"
              >
                Add Task
              </Button>
            </Col>
          </Row>

          <Row>
            {renderTaskColumn("Pending", pendingTasks, "#2b52ff")}
            {renderTaskColumn("In Progress", inProgressTasks, "#ffc107")}
            {renderTaskColumn("Completed", completedTasks, "#198754")}
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
