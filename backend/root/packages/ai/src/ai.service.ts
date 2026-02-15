import { GenerateTextProps } from "./type.js";

export default abstract class AIService {
  abstract generateText(props: GenerateTextProps): Promise<string>;
}


