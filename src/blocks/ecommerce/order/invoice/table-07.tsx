import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building, Calendar, Clock, DollarSign } from "lucide-react"

interface MilestoneItem {
  milestone: string
  description: string
  percentage: number
  amount: number
  status: "completed" | "current" | "upcoming"
}

interface ProjectHeaderProps {
  projectName: string
  clientName: string
  invoiceNumber: string
  contractValue: number
  currency: string
}

interface ProgressOverviewProps {
  progress: number
  invoiced: number
  remaining: number
  currency: string
}

interface DateBlockProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

interface MilestoneTableProps {
  items: MilestoneItem[]
  currency: string
}

interface CurrentInvoiceProps {
  milestone: string
  amount: number
  dueDate: string
  currency: string
}

interface TermsListProps {
  title: string
  items: string[]
}

const ProjectHeader = ({ projectName, clientName, invoiceNumber, contractValue, currency }: ProjectHeaderProps) => (
  <div className="space-y-4">
    <div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-4">
      <div>
        <Badge variant="outline" className="mb-2">Progress Invoice</Badge>
        <h1 className="text-2xl font-bold">{projectName}</h1>
        <p className="text-muted-foreground">{clientName}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">{invoiceNumber}</p>
        <p className="text-2xl font-bold">{currency}{contractValue.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Total Contract Value</p>
      </div>
    </div>
  </div>
)

const ProgressOverview = ({ progress, invoiced, remaining, currency }: ProgressOverviewProps) => (
  <div className="p-4 rounded-lg bg-muted/40 space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Project Completion</span>
      <span className="text-sm font-bold">{progress}%</span>
    </div>
    <Progress value={progress} className="h-2" />
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Total Invoiced</p>
        <p className="font-semibold text-green-600">{currency}{invoiced.toLocaleString()}</p>
      </div>
      <div className="text-right">
        <p className="text-muted-foreground">Remaining</p>
        <p className="font-semibold">{currency}{remaining.toLocaleString()}</p>
      </div>
    </div>
  </div>
)

const DateBlock = ({ icon: Icon, label, value }: DateBlockProps) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border">
    <Icon className="size-5 text-muted-foreground" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

const MilestoneTable = ({ items, currency }: MilestoneTableProps) => (
  <div className="space-y-3">
    <h3 className="font-semibold">Milestone Breakdown</h3>
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[35%]">Milestone</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">%</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index} className={item.status === "current" ? "bg-primary/5" : ""}>
              <TableCell className="font-medium">{item.milestone}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{item.description}</TableCell>
              <TableCell className="text-center">{item.percentage}%</TableCell>
              <TableCell className="text-right">{currency}{item.amount.toLocaleString()}</TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant={item.status === "completed" ? "default" : item.status === "current" ? "secondary" : "outline"}
                  className="capitalize"
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
)

const CurrentInvoice = ({ milestone, amount, dueDate, currency }: CurrentInvoiceProps) => (
  <div className="p-4 rounded-lg border-2 border-primary bg-primary/5 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Current Invoice</p>
        <p className="font-semibold">{milestone}</p>
      </div>
      <DollarSign className="size-6 text-primary" />
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-3xl font-bold text-primary">{currency}{amount.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
      </div>
    </div>
  </div>
)

const TermsList = ({ title, items }: TermsListProps) => (
  <div className="space-y-2">
    <p className="text-sm font-semibold">{title}</p>
    <ul className="text-sm text-muted-foreground space-y-1">
      {items.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  </div>
)

export default function Main() {
  const projectData: ProjectHeaderProps = {
    projectName: "Enterprise ERP Implementation",
    clientName: "Global Manufacturing Corp.",
    invoiceNumber: "INV-PROJ-2024-003",
    contractValue: 250000,
    currency: "$",
  }

  const progressData: ProgressOverviewProps = {
    progress: 60,
    invoiced: 150000,
    remaining: 100000,
    currency: "$",
  }

  const dateBlocks = [
    { icon: Calendar, label: "Start Date", value: "Oct 1, 2023" },
    { icon: Clock, label: "Target Completion", value: "Apr 30, 2024" },
    { icon: Building, label: "Project Manager", value: "David Wilson" },
  ]

  const milestones: MilestoneItem[] = [
    { milestone: "Phase 1: Discovery", description: "Requirements & Analysis", percentage: 15, amount: 37500, status: "completed" },
    { milestone: "Phase 2: Design", description: "System Architecture", percentage: 20, amount: 50000, status: "completed" },
    { milestone: "Phase 3: Development", description: "Core Module Build", percentage: 25, amount: 62500, status: "current" },
    { milestone: "Phase 4: Integration", description: "System Integration", percentage: 20, amount: 50000, status: "upcoming" },
    { milestone: "Phase 5: Testing", description: "QA & UAT", percentage: 10, amount: 25000, status: "upcoming" },
    { milestone: "Phase 6: Deployment", description: "Go-Live & Support", percentage: 10, amount: 25000, status: "upcoming" },
  ]

  const currentInvoiceData: CurrentInvoiceProps = {
    milestone: "Phase 3: Development",
    amount: 62500,
    dueDate: "February 15, 2024",
    currency: "$",
  }

  const terms: TermsListProps = {
    title: "Payment Terms",
    items: [
      "Payment due within 15 days of invoice date",
      "Late payments subject to 1.5% monthly interest",
      "All milestones require client sign-off before invoicing",
    ],
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="border-b">
            <ProjectHeader {...projectData} />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid @lg:grid-cols-2 gap-6">
              <ProgressOverview {...progressData} />
              <div className="space-y-3">
                {dateBlocks.map((block, index) => (
                  <DateBlock key={index} {...block} />
                ))}
              </div>
            </div>
            <Separator />
            <MilestoneTable items={milestones} currency="$" />
            <div className="grid @md:grid-cols-2 gap-6">
              <CurrentInvoice {...currentInvoiceData} />
              <TermsList {...terms} />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 text-sm text-muted-foreground">
            <p>For questions regarding this invoice, contact projects@consultant.com</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
