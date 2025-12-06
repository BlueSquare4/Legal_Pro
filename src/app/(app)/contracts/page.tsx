import { ArrowRight, File, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

const allContracts = [
  { id: "123", name: "MSA_AcmeCorp_Q3-2024.pdf", type: "MSA", risk: "High", status: "Analyzed", lastUpdated: "2024-07-20" },
  { id: "124", name: "NDA_InnovateX_Final.docx", type: "NDA", risk: "Low", status: "Analyzed", lastUpdated: "2024-07-19" },
  { id: "125", name: "Service-Agreement_ClientCo.pdf", type: "Service", risk: "Medium", status: "In Review", lastUpdated: "2024-07-17" },
  { id: "126", name: "Partnership_Agreement_v2.docx", type: "Partnership", risk: "N/A", status: "Generated", lastUpdated: "2024-07-15" },
  { id: "127", name: "Lease_Agreement_Office.pdf", type: "Lease", risk: "Medium", status: "Archived", lastUpdated: "2024-06-28" },
  { id: "128", name: "Employment_Offer_Jane_Doe.docx", type: "Employment", risk: "Low", status: "Analyzed", lastUpdated: "2024-06-25" },
];

const riskVariant: Record<string, "destructive" | "secondary" | "default"> = {
    High: "destructive",
    Medium: "secondary",
    Low: "default",
};

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline text-3xl font-bold">All Documents</h1>
          <p className="text-muted-foreground">Search, filter, and manage all your contracts.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search documents..." className="pl-8" />
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Analyzed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>In Review</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Generated</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.name}</TableCell>
                  <TableCell><Badge variant="outline">{contract.type}</Badge></TableCell>
                  <TableCell>
                    {contract.risk !== "N/A" ? (
                         <Badge variant={riskVariant[contract.risk] || "outline"}>{contract.risk}</Badge>
                    ) : (
                        <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{contract.status}</TableCell>
                  <TableCell>{contract.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/analyze/${contract.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
