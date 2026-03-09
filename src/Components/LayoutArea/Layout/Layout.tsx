import { Container, Navbar } from "react-bootstrap";
import { Manager } from "../../JobInterview/Manager/Manager";

/** Root layout: navbar, header image, and main content area. */
export function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="warning" variant="light" className="shadow-sm">
                <Container>
                    <Navbar.Brand as="h1" className="mb-0 fs-4 fw-semibold">
                        Code Quiz
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <header className="bg-light overflow-hidden">
                <img
                    src="/header.jpg"
                    alt="Code Quiz"
                    className="w-100 d-block"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                />
            </header>
            <main className="flex-grow-1 py-4">
                <Container>
                    <Manager />
                </Container>
            </main>
        </div>
    );
}
