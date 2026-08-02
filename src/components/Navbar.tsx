import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";

const NavigationBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  return (
    <Navbar expand="lg" className="custom-navbar mb-4">
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-3">
          {isLoading ? (
            <span className="text-light">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <span className="text-light me-2">
                Welcome, <strong>{user?.name || user?.email}</strong>
              </span>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
