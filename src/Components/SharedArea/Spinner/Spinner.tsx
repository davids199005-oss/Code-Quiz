import { Spinner as BSSpinner } from "react-bootstrap";

/** Loading indicator shown while a GPT request is in progress. */
export function Spinner() {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="text-center">
                <BSSpinner animation="border" role="status" />
                <p className="mt-2 mb-0 text-muted small">Loading…</p>
            </div>
        </div>
    );
}
