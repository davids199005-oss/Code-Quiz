import { Accordion } from "react-bootstrap";
import { QnA } from "../../../Models/QnA";
import "./Output.css";

type OutputProps = {
    qna: QnA[];
};

/** Renders the list of Q&A items in an accordion (question in header, answer in body). */
export function Output(props: OutputProps) {
    return (
        <Accordion defaultActiveKey="0" className="mt-4">
            {props.qna.map((item, index) => (
                <Accordion.Item eventKey={String(index)} key={index}>
                    <Accordion.Header>
                        Question #{index + 1}: {item.question}
                    </Accordion.Header>
                    <Accordion.Body className="Output-answer">
                        {item.answer}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
