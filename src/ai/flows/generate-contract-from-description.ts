'use server';

/**
 * @fileOverview Generates a contract from a natural language description.
 *
 * - generateContractFromDescription - A function that generates a contract from a description.
 * - GenerateContractInput - The input type for the generateContractFromDescription function.
 * - GenerateContractOutput - The return type for the generateContractFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContractInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A natural language description of the contract requirements, including the parties involved, services provided, payment terms, and duration.'
    ),
});
export type GenerateContractInput = z.infer<typeof GenerateContractInputSchema>;

const GenerateContractOutputSchema = z.object({
  contract: z
    .string()
    .describe(
      'The generated contract in a suitable format (e.g., Markdown, DOCX, or PDF content as a base64 string).'
    ),
});
export type GenerateContractOutput = z.infer<typeof GenerateContractOutputSchema>;

export async function generateContractFromDescription(
  input: GenerateContractInput
): Promise<GenerateContractOutput> {
  return generateContractFromDescriptionFlow(input);
}

const generateContractPrompt = ai.definePrompt({
  name: 'generateContractPrompt',
  input: {schema: GenerateContractInputSchema},
  output: {schema: GenerateContractOutputSchema},
  prompt: `You are an AI legal assistant tasked with generating simple contracts based on user descriptions.

  Based on the following description, create a contract that covers the key aspects of the agreement.
  The contract should be clear, concise, and easy to understand for non-legal professionals.

  Description: {{{description}}}

  Output the contract in Markdown format.
  `,
});

const generateContractFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateContractFromDescriptionFlow',
    inputSchema: GenerateContractInputSchema,
    outputSchema: GenerateContractOutputSchema,
  },
  async input => {
    const {output} = await generateContractPrompt(input);
    return output!;
  }
);
