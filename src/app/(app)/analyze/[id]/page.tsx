import {
  AlertTriangle,
  FileText,
  Gavel,
  ShieldCheck,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const contractData = {
  id: "123",
  name: "MSA_AcmeCorp_Q3-2024.pdf",
  type: "Master Service Agreement",
  riskScore: 78,
  riskLevel: "High",
  riskSummary: [
    { category: "Liability", issue: "Uncapped liability for service provider.", severity: "High" },
    { category: "Payment Terms", issue: "Net-90 payment terms are longer than standard.", severity: "Medium" },
    { category: "IP Rights", issue: "Vague definition of pre-existing intellectual property.", severity: "High" },
    { category: "Termination", issue: "Client can terminate for convenience with no penalty.", severity: "Medium" },
    { category: "Confidentiality", issue: "Unilateral confidentiality obligations.", severity: "Low" },
  ],
  clauses: [
    {
      id: "c1",
      title: "7. Limitation of Liability",
      explanation: "This clause limits your financial responsibility if something goes wrong. However, it's currently uncapped, meaning your liability is unlimited.",
      implications: "You could be sued for an unlimited amount of money, potentially bankrupting your business.",
      suggestion: "Negotiate to cap liability at the total value of the contract or 12 months of service fees.",
    },
    {
      id: "c2",
      title: "4. Payment Terms",
      explanation: "The client has 90 days to pay you after receiving an invoice.",
      implications: "This could negatively impact your cash flow, as you're waiting three months for payment.",
      suggestion: "Propose Net-30 or Net-45 terms, which are more standard for freelancers and small businesses.",
    },
     {
      id: "c3",
      title: "11. Intellectual Property",
      explanation: "The contract gives the client ownership of all intellectual property created during the project, without distinguishing pre-existing IP.",
      implications: "You might inadvertently transfer ownership of your own tools, libraries, or other valuable IP to the client.",
      suggestion: "Clearly define and exclude 'Background IP' or 'Pre-existing IP' from the transfer of ownership.",
    },
  ],
  compliance: {
    gdpr: {
      compliant: false,
      issues: ["No clear data processing agreement (DPA).", "Data retention policy is not defined.", "Fails to specify a legal basis for processing personal data."],
    },
    ccpa: {
      compliant: true,
      issues: [],
    }
  },
  riskDistribution: [
    { name: 'Liability', value: 40, fill: "hsl(var(--destructive))" },
    { name: 'Payment', value: 20, fill: "hsl(var(--chart-4))" },
    { name: 'IP', value: 25, fill: "hsl(var(--destructive))" },
    { name: 'Termination', value: 10, fill: "hsl(var(--chart-4))" },
    { name: 'Other', value: 5, fill: "hsl(var(--chart-2))" },
  ]
};

const severityVariant: Record<string, "destructive" | "secondary" | "default"> = {
    High: "destructive",
    Medium: "secondary",
    Low: "default",
}

export default function AnalyzeContractPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch contract data based on params.id
    const data = contractData;

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="font-headline text-2xl">{data.name}</CardTitle>
                            <CardDescription>{data.type}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="risk-analysis">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                    <TabsTrigger value="risk-analysis"><AlertTriangle className="mr-2" />Risk Analysis</TabsTrigger>
                    <TabsTrigger value="clause-explorer"><Gavel className="mr-2" />Clause Explorer</TabsTrigger>
                    <TabsTrigger value="compliance"><ShieldCheck className="mr-2" />Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="risk-analysis" className="mt-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                         <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="font-headline">Overall Risk Score</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center">
                                <div className="relative h-32 w-32">
                                    <svg className="absolute inset-0 -rotate-90 transform" viewBox="0 0 36 36">
                                        <circle
                                            className="text-muted/50"
                                            cx="18" cy="18" r="15.9155"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <circle
                                            className="text-destructive"
                                            strokeDasharray={`${data.riskScore}, 100`}
                                            cx="18" cy="18" r="15.9155"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold">{data.riskScore}</span>
                                        <Badge variant="destructive" className="mt-1">{data.riskLevel}</Badge>
                                    </div>
                                </div>
                                <p className="mt-4 text-center text-sm text-muted-foreground">
                                    A high score indicates significant risks that require attention.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="font-headline">Risk Distribution</CardTitle>
                                <CardDescription>How risk is distributed across different categories.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{}} className="h-48 w-full">
                                    <ResponsiveContainer>
                                        <BarChart data={data.riskDistribution} layout="vertical" margin={{ left: 10, right: 30 }}>
                                            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--foreground))" }} width={80} />
                                            <Tooltip
                                                cursor={{ fill: 'hsl(var(--muted))' }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="font-headline">Risk Summary</CardTitle>
                            <CardDescription>Key issues identified by the AI analysis.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {data.riskSummary.map((risk, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${risk.severity === 'High' ? 'text-destructive' : 'text-amber-500'}`} />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold">{risk.category}</h4>
                                                <Badge variant={severityVariant[risk.severity] || "default"}>{risk.severity}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{risk.issue}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="clause-explorer" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Clause-by-Clause Explanation</CardTitle>
                            <CardDescription>Click on a clause to get a plain English explanation and suggestions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {data.clauses.map((clause) => (
                                    <AccordionItem value={clause.id} key={clause.id}>
                                        <AccordionTrigger className="text-left font-semibold hover:no-underline">{clause.title}</AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-2">
                                            <div>
                                                <h5 className="font-medium text-sm">Plain English Explanation</h5>
                                                <p className="text-sm text-muted-foreground">{clause.explanation}</p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h5 className="font-medium text-sm">Implications for You</h5>
                                                <p className="text-sm text-muted-foreground">{clause.implications}</p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h5 className="font-medium text-sm">Alternative Suggestion</h5>
                                                <p className="text-sm text-muted-foreground">{clause.suggestion}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="compliance" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Automated Compliance Check</CardTitle>
                            <CardDescription>Analysis against major regulations like GDPR and CCPA.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-lg font-semibold">GDPR</h4>
                                    {data.compliance.gdpr.compliant ? (
                                        <Badge variant="outline"><CheckCircle className="mr-1 h-3 w-3" /> Compliant</Badge>
                                    ) : (
                                        <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Non-Compliant</Badge>
                                    )}
                                </div>
                                {data.compliance.gdpr.issues.length > 0 && (
                                     <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                                        {data.compliance.gdpr.issues.map((issue, index) => (
                                            <li key={index}>{issue}</li>
                                        ))}
                                    </ul>
                                )}
                           </div>
                           <Separator/>
                           <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-lg font-semibold">CCPA</h4>
                                     {data.compliance.ccpa.compliant ? (
                                        <Badge variant="outline"><CheckCircle className="mr-1 h-3 w-3" /> Compliant</Badge>
                                    ) : (
                                        <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Non-Compliant</Badge>
                                    )}
                                </div>
                                {data.compliance.ccpa.issues.length > 0 ? (
                                     <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                                        {data.compliance.ccpa.issues.map((issue, index) => (
                                            <li key={index}>{issue}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No CCPA compliance issues found.</p>
                                )}
                           </div>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
