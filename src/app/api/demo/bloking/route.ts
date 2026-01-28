import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const POST = async () => {
    const response =  await generateText({
        model: google('gemini-2.5-flash'),
        prompt: 'Write a vegetarian lasagna recipe for 4 people.',
      });
    
    return Response.json({response})
}