import { config } from 'dotenv';
config();

import '@/ai/flows/generate-contract-from-description.ts';
import '@/ai/flows/summarize-risk-factors.ts';
import '@/ai/flows/explain-contract-clause.ts';
import '@/ai/flows/check-compliance-with-gdpr.ts';