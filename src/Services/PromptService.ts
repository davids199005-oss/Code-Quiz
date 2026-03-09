import { InputModel } from "../Models/InputModel";
import { Prompt } from "../Models/Prompt";
import { QnA } from "../Models/QnA";
import { helper } from "../Utils/Helper";
import { gptService } from "./GptService";

/**
 * Builds prompts for GPT and parses the completion into a list of QnA items.
 */
class PromptService {
    /**
     * Requests job-interview Q&A from GPT and returns a validated array of QnA.
     * Throws with a user-friendly message if the response is invalid.
     */
    public async getQnA(input: InputModel): Promise<QnA[]> {
        const prompt: Prompt = {
            systemContent: `You are an expert in development programming technologies 
                specialized in job-interview questions.`,
            userContent: `Write me ${input.count} job-interview questions
                in a ${input.level} difficulty level,
                in the field of ${input.technology} programming technology.
                return back only a JSON array containing questions and answers.
                The JSON must be in the following format: 
                [{"question": "question 1", "answer": "answer 1"}, {"question": "question 2", "answer": "answer 2"},...]
                `,
        };

        const completion = await gptService.getCompletion(prompt);

        const json = helper.extractJsonArray(completion);
        if (!json.trim()) {
            throw new Error("Could not extract question list from response");
        }
        let parsed: unknown;
        try {
            parsed = JSON.parse(json);
        } catch {
            throw new Error("Response is not valid JSON");
        }
        if (!Array.isArray(parsed)) {
            throw new Error("Invalid response format: expected an array with question and answer fields");
        }
        const qnaArray: QnA[] = parsed.map((item: unknown, index: number) => {
            if (item === null || typeof item !== "object" || Array.isArray(item)) {
                throw new Error(`Invalid response format: item ${index + 1} is not an object`);
            }
            const obj = item as Record<string, unknown>;
            const question = obj.question;
            const answer = obj.answer;
            if (typeof question !== "string" || typeof answer !== "string") {
                throw new Error(
                    "Invalid response format: expected array of objects with string fields question and answer"
                );
            }
            return { question, answer };
        });

        return qnaArray;
    }
}

export const promptService = new PromptService();
