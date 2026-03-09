import { useForm } from "react-hook-form";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { InputModel } from "../../../Models/InputModel";

type InputProps = {
    loading: boolean;
    go: (data: InputModel) => void;
};

/** Form to choose technology, difficulty level, and number of questions. Submits to parent via go(). */
export function Input(props: InputProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputModel>({
        defaultValues: { technology: "", level: "", count: 5 },
    });

    function send(input: InputModel) {
        props.go(input);
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Form onSubmit={handleSubmit(send)}>
                    <Row className="g-3">
                        <Col md={4}>
                            <Form.Group controlId="technology">
                                <Form.Label>Programming Technology</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. React, TypeScript"
                                    {...register("technology", { required: "Please enter a technology" })}
                                />
                                {errors.technology?.message && (
                                    <Form.Text className="text-danger d-block mt-1">
                                        {errors.technology.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="level">
                                <Form.Label>Difficulty Level</Form.Label>
                                <Form.Select {...register("level", { required: "Please select a level" })}>
                                    <option value="">Select...</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </Form.Select>
                                {errors.level?.message && (
                                    <Form.Text className="text-danger d-block mt-1">
                                        {errors.level.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="count">
                                <Form.Label>Questions</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    max={10}
                                    {...register("count", {
                                        valueAsNumber: true,
                                        required: "Please enter a number",
                                        min: { value: 1, message: "Min 1" },
                                        max: { value: 10, message: "Max 10" },
                                    })}
                                />
                                {errors.count?.message && (
                                    <Form.Text className="text-danger d-block mt-1">
                                        {errors.count.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end">
                            <Button
                                type="submit"
                                variant="warning"
                                className="w-100 btn-warning"
                                disabled={props.loading}
                            >
                                Go
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
