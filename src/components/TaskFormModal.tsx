// TaskFormModal.tsx
import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import type { Task } from "../types/tasks";

interface TaskFormModalProps {
  show: boolean;
  onHide: () => void;
  onAddTask: (newTask: Omit<Task, "id">) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  show,
  onHide,
  onAddTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Pending");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required!");
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setError(null);
    onHide();
  };

  const handleClose = () => {
    setError(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label>
              Title <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Set up Auth0 provider"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskFormModal;
