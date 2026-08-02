import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Container, Button } from "react-bootstrap";

const NavigationBar = () => {
  const { logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <Navbar expand="lg" className="custom-navbar mb-4 border-bottom">
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Text className="ms-auto align-items-center gap-3">
          {isLoading ? (
            <span className="text-light">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <span className="custom-nav-text me-2">
                Welcome, <strong>{user?.name || user?.email}</strong>
              </span>
              <Button
                variant="dark"
                size="sm"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </>
          ) : null}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
