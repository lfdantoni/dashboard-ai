import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('gemini.apiKey');
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async analyzePrompt(
    prompt: string,
    imageBase64?: string,
    mimeType?: string,
  ): Promise<string> {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    // Validate image parameters
    if (imageBase64 && !mimeType) {
      throw new BadRequestException(
        'mimeType is required when imageBase64 is provided',
      );
    }

    if (!imageBase64 && mimeType) {
      throw new BadRequestException(
        'imageBase64 is required when mimeType is provided',
      );
    }

    try {
      let contents: any;

      // Build contents based on whether an image is provided
      if (imageBase64 && mimeType) {
        contents = [
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64,
            },
          },
          { text: prompt },
        ];
      } else {
        contents = prompt;
      }

      const response = await this.genAI.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: contents,
      });

      return response.text;
    } catch (error) {
      throw new BadRequestException(
        `Error processing request with Gemini: ${error.message}`,
      );
    }
  }
}
