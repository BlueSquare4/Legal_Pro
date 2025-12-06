import { Activity, AlertTriangle, ArrowRight, FileCheck2, FileClock, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const stats = [
  { title: "Documents Analyzed", value: "1,250", icon: FileCheck2 },
  { title: "Active Contracts", value: "89", icon: FileClock },
  { title: "High-Risk Issues", value: "12", icon: AlertTriangle, level: "destructive" },
];

const recentActivity = [
  { id: "123", name: "MSA_AcmeCorp_Q3-2024.pdf", status: "Analyzed", risk: "High", date: "2 hours ago" },
  { id: "124", name: "NDA_InnovateX_Final.docx", status: "Analyzed", risk: "Low", date: "1 day ago" },
  { id: "125", name: "Service-Agreement_ClientCo.pdf", status: "In Review", risk: "Medium", date: "3 days ago" },
  { id: "126", name: "Partnership_Agreement_v2.docx", status: "Generated", risk: "N/A", date: "5 days ago" },
];

const riskVariant: Record<string, "destructive" | "secondary" | "default"> = {
    High: "destructive",
    Medium: "secondary",
    Low: "default",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline text-3xl font-bold">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's a summary of your legal workspace.</p>
        </div>
        <Button asChild>
          <Link href="/generate"><Plus className="mr-2 h-4 w-4" /> Analyze Document</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.level === 'destructive' ? 'text-destructive' : ''}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Activity />
            Recent Activity
          </CardTitle>
          <CardDescription>A log of your recent document analyses and generations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.name}</TableCell>
                  <TableCell>{activity.status}</TableCell>
                  <TableCell>
                    {activity.risk !== "N/A" ? (
                         <Badge variant={riskVariant[activity.risk] || "outline"}>{activity.risk}</Badge>
                    ) : (
                        <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/analyze/${activity.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-end">
            <Button variant="ghost" asChild>
                <Link href="/contracts">View All Documents <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
