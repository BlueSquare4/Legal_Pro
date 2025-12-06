"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import type { CheckComplianceWithGDPROutput } from "@/ai/flows/check-compliance-with-gdpr";
import { checkComplianceWithGDPR } from "@/ai/flows/check-compliance-with-gdpr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  documentText: z.string().min(100, {
    message: "Please provide document text with at least 100 characters for analysis.",
  }),
});

export default function CompliancePage() {
  const [complianceResult, setComplianceResult] = useState<CheckComplianceWithGDPROutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setComplianceResult(null);
    try {
      const result = await checkComplianceWithGDPR(values);
      setComplianceResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem checking compliance. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Automated Compliance Checking</h1>
        <p className="text-muted-foreground">
          Paste your document text to check for compliance with GDPR regulations.
        </p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Document Text</CardTitle>
              <CardDescription>
                Paste the full text of your policy or contract for GDPR analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="documentText"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'This Privacy Policy describes how your personal information is collected, used, and shared...'"
                        className="min-h-[250px] font-code text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" />
                )}
                Check Compliance
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Checking for GDPR compliance...</p>
        </div>
      )}

      {complianceResult && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">GDPR Compliance Report</CardTitle>
            <div className="flex items-center gap-2 pt-2">
              <span className="font-semibold">Status:</span>
              {complianceResult.isCompliant ? (
                <Badge variant="outline"><CheckCircle className="mr-1 h-3 w-3" /> Compliant</Badge>
              ) : (
                <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Non-Compliant</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Explanation</h3>
              <p className="text-sm text-muted-foreground">{complianceResult.explanation}</p>
            </div>

            {complianceResult.complianceChecklist && complianceResult.complianceChecklist.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Identified Issues & Recommendations</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {complianceResult.complianceChecklist.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
