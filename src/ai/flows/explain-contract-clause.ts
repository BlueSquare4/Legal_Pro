'use server';

/**
 * @fileOverview Explains a contract clause in plain English.
 *
 * - explainContractClause - A function that handles the contract clause explanation process.
 * - ExplainContractClauseInput - The input type for the explainContractClause function.
 * - ExplainContractClauseOutput - The return type for the explainContractClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainContractClauseInputSchema = z.object({
  contractText: z.string().describe('The full text of the contract.'),
  clause: z.string().describe('The specific clause to explain.'),
});
export type ExplainContractClauseInput = z.infer<typeof ExplainContractClauseInputSchema>;

const ExplainContractClauseOutputSchema = z.object({
  plainEnglishExplanation: z
    .string()
    .describe('A plain English explanation of the clause.'),
  implications: z.string().describe('The implications of the clause for the user.'),
  alternativeSuggestions: z.string().describe('Alternative suggestions for the clause.'),
});
export type ExplainContractClauseOutput = z.infer<typeof ExplainContractClauseOutputSchema>;

export async function explainContractClause(input: ExplainContractClauseInput): Promise<ExplainContractClauseOutput> {
  return explainContractClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainContractClausePrompt',
  input: {schema: ExplainContractClauseInputSchema},
  output: {schema: ExplainContractClauseOutputSchema},
  prompt: `You are an AI legal assistant that explains contract clauses in plain English.

  Given the following contract text and a specific clause, provide a plain English explanation of the clause, explain the implications of the clause for the user, and suggest alternative suggestions for the clause.

  Contract Text:
  {{contractText}}

  Clause:
  {{clause}}

  Respond in a well formatted way with the following sections:

  Plain English Explanation:
  <plain english explanation>

  Implications:
  <implications>

  Alternative Suggestions:
  <alternative suggestions>`,
});

const explainContractClauseFlow = ai.defineFlow(
  {
    name: 'explainContractClauseFlow',
    inputSchema: ExplainContractClauseInputSchema,
    outputSchema: ExplainContractClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
