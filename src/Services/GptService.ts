import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { Prompt } from "../Models/Prompt";
import { appConfig } from "../Utils/AppConfig";

/**
 * Wrapper for OpenAI Chat Completions API. Sends a prompt and returns the model response text.
 */
class GptService {
    private openai = new OpenAI({
        apiKey: appConfig.chatGptApiKey,
        dangerouslyAllowBrowser: true,
    });

    /**
     * Sends the given prompt to GPT and returns the first completion content.
     * Throws if the response has no content.
     */
    public async getCompletion(prompt: Prompt): Promise<string> {
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: prompt.systemContent },
                { role: "user", content: prompt.userContent },
            ],
        };

        const response = await this.openai.chat.completions.create(body);

        const completion = response.choices?.[0]?.message?.content;
        if (!completion) {
            throw new Error("No completion received from GPT");
        }
        return completion;
    }
}

export const gptService = new GptService();
