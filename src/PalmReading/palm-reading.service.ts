import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import fetch from 'node-fetch';

export interface UserProfile {
  fullName?: string;
  birthDate?: string;
  age?: number;
}

@Injectable()
export class PalmReadingService {
  private readonly apiKey: string = process.env.GEMINI_API_KEY!;
  private readonly baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

  async analyzePalmPhoto(imageBase64: string, userProfile: UserProfile): Promise<string> {
    if (!imageBase64) {
      throw new HttpException('Palm image base64 data is required', HttpStatus.BAD_REQUEST);
    }

    const prompt = this.createPalmReadingPrompt(userProfile);

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new HttpException(
        `Gemini API Error: ${error.error?.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]) {
      throw new HttpException('No palm reading generated', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return data.candidates[0].content.parts[0].text;
  }

  private createPalmReadingPrompt(userProfile: UserProfile): string {
    return `
You are a master palm reader with 30+ years of experience. Analyze this palm image with deep spiritual insight.

USER CONTEXT:
${userProfile.fullName ? `Name: ${userProfile.fullName}` : ''}
${userProfile.birthDate ? `Birth Date: ${userProfile.birthDate}` : ''}
${userProfile.age ? `Age: ${userProfile.age}` : ''}

ANALYZE THESE PALM FEATURES:
- Life Line: health, vitality, major life changes, longevity
- Heart Line: love patterns, emotional nature, relationships
- Head Line: intelligence, thinking style, career talents, decision-making
- Fate Line: destiny, life purpose, career path, major opportunities

Provide detailed, positive, and empowering insights for Love, Career, Health, and Destiny.
    `;
  }
}
