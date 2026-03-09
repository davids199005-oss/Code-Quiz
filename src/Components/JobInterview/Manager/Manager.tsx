import { useRef, useState } from "react";
import { InputModel } from "../../../Models/InputModel";
import { promptService } from "../../../Services/PromptService";
import { Input } from "../Input/Input";
import { Output } from "../Output/Output";
import { QnA } from "../../../Models/QnA";
import { Spinner } from "../../SharedArea/Spinner/Spinner";

/**
 * Orchestrates the Q&A flow: form submit triggers GPT request, shows spinner while loading,
 * and displays results. Uses requestIdRef to ignore stale responses when user clicks Go again.
 */
export function Manager() {
    const [qna, setQna] = useState<QnA[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const requestIdRef = useRef(0);

    async function askGpt(input: InputModel) {
        const currentId = ++requestIdRef.current;
        try {
            setLoading(true);
            const result = await promptService.getQnA(input);
            if (currentId !== requestIdRef.current) return;
            setQna(result);
            setLoading(false);
        }
        catch (err: unknown) {
            console.error("QnA request failed:", err);
            if (currentId !== requestIdRef.current) return;
            alert("Could not load questions. Check your connection and try again.");
            setLoading(false);
        }
    }

    return (
        <div className="d-flex flex-column gap-4">
            <Input go={askGpt} loading={loading} />
            {loading && <Spinner />}
            {!loading && <Output qna={qna} />}
        </div>
    );
}
