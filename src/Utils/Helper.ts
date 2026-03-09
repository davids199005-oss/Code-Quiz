/**
 * Utilities for parsing GPT response text (e.g. extracting JSON array from markdown or prose).
 */
class Helper {
    /**
     * Extracts the first JSON array from a string (e.g. "Here is the result: [...]").
     * Throws if no valid array boundaries are found.
     */
    public extractJsonArray(text: string): string {
        const start = text.indexOf("[");
        if (start === -1) {
            throw new Error("Response does not contain a JSON array");
        }
        const end = text.lastIndexOf("]");
        if (end === -1 || end < start) {
            throw new Error("Response does not contain a JSON array");
        }
        const json = text.substring(start, end + 1);
        if (!json.trim().startsWith("[")) {
            throw new Error("Response does not contain a JSON array");
        }
        return json;
    }
}

export const helper = new Helper();
