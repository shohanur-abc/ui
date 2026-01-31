import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { AlertCircle, Calendar, CheckCircle, Clock, FileText, Flag, Target, User, Users } from "lucide-react"

interface ProjectOverviewProps {
  projectName: string
  projectCode: string
  client: string
  projectManager: string
  startDate: string
  endDate: string
  status: string
  progress: number
}

interface MilestoneProps {
  name: string
  dueDate: string
  status: string
  amount: number
  invoiced: boolean
}

interface TimeEntryProps {
  date: string
  teamMember: string
  task: string
  hours: number
  rate: number
  billable: boolean
}

interface ExpenseProps {
  date: string
  category: string
  description: string
  amount: number
  reimbursable: boolean
}

interface ProjectBudgetProps {
  budgetTotal: number
  laborBudget: number
  laborSpent: number
  expenseBudget: number
  expenseSpent: number
  currency: string
}

interface InvoiceSummaryProps {
  invoiceNumber: string
  period: string
  laborCharges: number
  expenses: number
  previousBalance: number
  totalDue: number
  currency: string
}

const ProjectOverview = ({ projectName, projectCode, client, projectManager, startDate, endDate, status, progress }: ProjectOverviewProps) => (
  <Card>
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{projectName}</h2>
          <p className="text-sm text-muted-foreground font-mono">{projectCode}</p>
        </div>
        <Badge variant={status === "Active" ? "default" : status === "On Hold" ? "secondary" : "outline"}>
          {status}
        </Badge>
      </div>
      <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <User className="size-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Client</p>
            <p className="font-medium">{client}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">PM</p>
            <p className="font-medium">{projectManager}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Start</p>
            <p className="font-medium">{startDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Target className="size-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">End</p>
            <p className="font-medium">{endDate}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Project Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </CardContent>
  </Card>
)

const MilestonesTable = ({ milestones, currency }: { milestones: MilestoneProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Flag className="size-4" />
        Project Milestones
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Milestone</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Invoiced</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {milestones.map((milestone, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{milestone.name}</TableCell>
              <TableCell>{milestone.dueDate}</TableCell>
              <TableCell>
                <Badge variant={milestone.status === "Complete" ? "default" : milestone.status === "In Progress" ? "secondary" : "outline"} className="gap-1">
                  {milestone.status === "Complete" && <CheckCircle className="size-3" />}
                  {milestone.status === "In Progress" && <Clock className="size-3" />}
                  {milestone.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{currency}{milestone.amount.toLocaleString()}</TableCell>
              <TableCell className="text-center">
                {milestone.invoiced ? (
                  <CheckCircle className="size-4 text-green-500 mx-auto" />
                ) : (
                  <Clock className="size-4 text-muted-foreground mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const TimeEntriesTable = ({ entries, currency }: { entries: TimeEntryProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Clock className="size-4" />
        Time Entries (Current Period)
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Date</TableHead>
            <TableHead>Team Member</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="text-center">Hours</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index} className={!entry.billable ? "opacity-50" : ""}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.teamMember}</TableCell>
              <TableCell>
                {entry.task}
                {!entry.billable && <Badge variant="outline" className="ml-2 text-xs">Non-billable</Badge>}
              </TableCell>
              <TableCell className="text-center">{entry.hours}</TableCell>
              <TableCell className="text-right">{currency}{entry.rate}</TableCell>
              <TableCell className="text-right font-medium">
                {entry.billable ? `${currency}${(entry.hours * entry.rate).toFixed(2)}` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const ExpensesTable = ({ expenses, currency }: { expenses: ExpenseProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <FileText className="size-4" />
        Project Expenses
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Billable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{expense.date}</TableCell>
              <TableCell><Badge variant="outline">{expense.category}</Badge></TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">{currency}{expense.amount.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                {expense.reimbursable ? (
                  <CheckCircle className="size-4 text-green-500 mx-auto" />
                ) : (
                  <AlertCircle className="size-4 text-muted-foreground mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const ProjectBudget = ({ budgetTotal, laborBudget, laborSpent, expenseBudget, expenseSpent, currency }: ProjectBudgetProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base">Budget Summary</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Labor Budget</span>
          <span>{currency}{laborSpent.toLocaleString()} / {currency}{laborBudget.toLocaleString()}</span>
        </div>
        <Progress value={(laborSpent / laborBudget) * 100} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Expense Budget</span>
          <span>{currency}{expenseSpent.toLocaleString()} / {currency}{expenseBudget.toLocaleString()}</span>
        </div>
        <Progress value={(expenseSpent / expenseBudget) * 100} className="h-2" />
      </div>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Total Budget</span>
        <span>{currency}{budgetTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Total Spent</span>
        <span>{currency}{(laborSpent + expenseSpent).toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm font-medium text-green-600">
        <span>Remaining</span>
        <span>{currency}{(budgetTotal - laborSpent - expenseSpent).toLocaleString()}</span>
      </div>
    </CardContent>
  </Card>
)

const InvoiceSummary = ({ invoiceNumber, period, laborCharges, expenses, previousBalance, totalDue, currency }: InvoiceSummaryProps) => (
  <Card className="bg-primary text-primary-foreground">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base text-primary-foreground">Invoice Summary</CardTitle>
        <span className="font-mono text-sm opacity-80">{invoiceNumber}</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm opacity-80">Billing Period: {period}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="opacity-80">Labor Charges</span>
          <span>{currency}{laborCharges.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Reimbursable Expenses</span>
          <span>{currency}{expenses.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Previous Balance</span>
          <span>{currency}{previousBalance.toLocaleString()}</span>
        </div>
      </div>
      <Separator className="bg-primary-foreground/20" />
      <div className="flex justify-between font-bold text-2xl">
        <span>Total Due</span>
        <span>{currency}{totalDue.toLocaleString()}</span>
      </div>
      <Button variant="secondary" className="w-full">Pay Invoice</Button>
    </CardContent>
  </Card>
)

export default function Main() {
  const project: ProjectOverviewProps = {
    projectName: "Digital Transformation Initiative",
    projectCode: "PRJ-2024-DTI-001",
    client: "Global Manufacturing Corp",
    projectManager: "Sarah Chen",
    startDate: "Jan 15, 2024",
    endDate: "Jun 30, 2024",
    status: "Active",
    progress: 35,
  }

  const milestones: MilestoneProps[] = [
    { name: "Discovery & Planning", dueDate: "Feb 1", status: "Complete", amount: 25000, invoiced: true },
    { name: "System Architecture", dueDate: "Feb 28", status: "Complete", amount: 35000, invoiced: true },
    { name: "Core Development", dueDate: "Apr 15", status: "In Progress", amount: 75000, invoiced: false },
    { name: "Integration & Testing", dueDate: "May 31", status: "Pending", amount: 40000, invoiced: false },
    { name: "Deployment & Training", dueDate: "Jun 30", status: "Pending", amount: 25000, invoiced: false },
  ]

  const timeEntries: TimeEntryProps[] = [
    { date: "Feb 12", teamMember: "John Smith", task: "Backend API Development", hours: 8, rate: 175, billable: true },
    { date: "Feb 12", teamMember: "Lisa Wang", task: "UI Component Design", hours: 6, rate: 150, billable: true },
    { date: "Feb 13", teamMember: "John Smith", task: "Database Schema Design", hours: 8, rate: 175, billable: true },
    { date: "Feb 13", teamMember: "Mike Johnson", task: "Code Review", hours: 2, rate: 200, billable: true },
    { date: "Feb 14", teamMember: "Lisa Wang", task: "Team Meeting", hours: 1, rate: 150, billable: false },
  ]

  const expenses: ExpenseProps[] = [
    { date: "Feb 10", category: "Software", description: "Cloud Service Subscription", amount: 850.00, reimbursable: true },
    { date: "Feb 12", category: "Travel", description: "Client site visit - airfare", amount: 450.00, reimbursable: true },
    { date: "Feb 12", category: "Meals", description: "Client dinner", amount: 185.50, reimbursable: true },
  ]

  const budget: ProjectBudgetProps = {
    budgetTotal: 200000,
    laborBudget: 175000,
    laborSpent: 68500,
    expenseBudget: 25000,
    expenseSpent: 4850,
    currency: "$",
  }

  const summary: InvoiceSummaryProps = {
    invoiceNumber: "INV-2024-0156",
    period: "Feb 1 - Feb 15, 2024",
    laborCharges: 5975,
    expenses: 1485.50,
    previousBalance: 0,
    totalDue: 7460.50,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-6">
          <ProjectOverview {...project} />
          <MilestonesTable milestones={milestones} currency="$" />
          <TimeEntriesTable entries={timeEntries} currency="$" />
          <ExpensesTable expenses={expenses} currency="$" />
          <div className="grid @md:grid-cols-2 gap-4">
            <ProjectBudget {...budget} />
            <InvoiceSummary {...summary} />
          </div>
        </div>
      </div>
    </section>
  )
}
