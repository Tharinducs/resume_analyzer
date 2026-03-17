export interface AIResponse {
    text: string
    json: <T = any>() => T
}

export function buildResponse(text:string = ""): AIResponse {
    return {
        text,
        json: <T = any>(): T => {
            const cleaned = text
                .replaceAll("```json", "")
                .replaceAll("```", "")
                .trim()
            return JSON.parse(cleaned) as T
        },
    }
}