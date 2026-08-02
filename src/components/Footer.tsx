// Footer.tsx

import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-3 mt-auto">
      <Container className="text-center">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Task Manager App. Built with React,
          TypeScript, React-Bootstrap, & Auth0.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
