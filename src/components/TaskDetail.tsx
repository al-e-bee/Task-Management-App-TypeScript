// TaskDetail.tsx
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Badge, Stack, Alert } from "react-bootstrap";
import type { Task } from "../types/tasks";

interface TaskDetailProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onBack: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onUpdateTask,
  onBack,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Task>(task);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(task);
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }
    setError(null);
    onUpdateTask({
      ...formData,
      title: formData.title.trim(),
      description: formData.description ? formData.description.trim() : "",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setError(null);
    setFormData(task);
    setIsEditing(false);
  };

  const getBadgeVariant = (status: Task["status"]) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="no-hover shadow-sm mt-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Button variant="outline-secondary" size="sm" onClick={onBack}>
          Back to Dashboard
        </Button>
        <Badge bg={getBadgeVariant(formData.status)}>{formData.status}</Badge>
      </Card.Header>

      <Card.Body>
        {!isEditing ? (
          <div>
            <Card.Title className="display-6">{task.title}</Card.Title>
            <Card.Text className="mt-3 text-muted">
              {task.description || "No description provided."}
            </Card.Text>

            <Stack direction="horizontal" gap={2} className="mt-4">
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Task
              </Button>
            </Stack>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
              <Button variant="outline-secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskDetail;
