'use server';

/**
 * @fileOverview A GDPR compliance checker AI agent.
 *
 * - checkComplianceWithGDPR - A function that handles the GDPR compliance check process.
 * - CheckComplianceWithGDPRInput - The input type for the checkComplianceWithGDPR function.
 * - CheckComplianceWithGDPROutput - The return type for the checkComplianceWithGDPR function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckComplianceWithGDPRInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to check for GDPR compliance.'),
});
export type CheckComplianceWithGDPRInput = z.infer<typeof CheckComplianceWithGDPRInputSchema>;

const CheckComplianceWithGDPROutputSchema = z.object({
  isCompliant: z
    .boolean()
    .describe('Whether the document is compliant with GDPR regulations.'),
  complianceChecklist: z
    .array(z.string())
    .describe(
      'A checklist of missing or non-compliant clauses with respect to GDPR regulations.'
    ),
  explanation: z
    .string()
    .describe('An explanation of the compliance check results and identified issues.'),
});
export type CheckComplianceWithGDPROutput = z.infer<typeof CheckComplianceWithGDPROutputSchema>;

export async function checkComplianceWithGDPR(input: CheckComplianceWithGDPRInput): Promise<CheckComplianceWithGDPROutput> {
  return checkComplianceWithGDPRFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkComplianceWithGDPRPrompt',
  input: {schema: CheckComplianceWithGDPRInputSchema},
  output: {schema: CheckComplianceWithGDPROutputSchema},
  prompt: `You are an expert legal consultant specializing in GDPR compliance.

You will analyze the provided document text and determine its compliance with GDPR regulations.
Provide a compliance checklist outlining any missing or non-compliant clauses.
Explain the compliance check results and any identified issues in detail.

Document Text: {{{documentText}}}`,
});

const checkComplianceWithGDPRFlow = ai.defineFlow(
  {
    name: 'checkComplianceWithGDPRFlow',
    inputSchema: CheckComplianceWithGDPRInputSchema,
    outputSchema: CheckComplianceWithGDPROutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
