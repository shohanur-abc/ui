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
import { Calendar, CheckCircle, Clock, DollarSign, Target } from "lucide-react"

interface ProjectCardProps {
  name: string
  client: string
  startDate: string
  endDate: string
  progress: number
}

interface MilestoneCardProps {
  name: string
  dueDate: string
  amount: number
  status: string
  currency: string
}

interface InvoiceSummaryCardProps {
  invoiceNumber: string
  currentMilestone: string
  amountDue: number
  dueDate: string
  currency: string
}

interface PaymentHistoryItemProps {
  date: string
  amount: number
  milestone: string
  currency: string
}

const ProjectCard = ({ name, client, startDate, endDate, progress }: ProjectCardProps) => (
  <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{client}</p>
        </div>
        <Badge variant="secondary">{progress}% Complete</Badge>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="size-3" />
          <span>Started: {startDate}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Target className="size-3" />
          <span>Due: {endDate}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

const MilestoneCard = ({ name, dueDate, amount, status, currency }: MilestoneCardProps) => {
  const isComplete = status === "Completed"
  const isCurrent = status === "Current"

  return (
    <Card className={isCurrent ? "border-primary" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-full flex items-center justify-center ${isComplete ? "bg-green-500/10 text-green-500" : isCurrent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {isComplete ? <CheckCircle className="size-5" /> : <Clock className="size-5" />}
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">{currency}{amount.toLocaleString()}</p>
            <Badge variant={isComplete ? "default" : isCurrent ? "secondary" : "outline"}>
              {status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const InvoiceSummaryCard = ({ invoiceNumber, currentMilestone, amountDue, dueDate, currency }: InvoiceSummaryCardProps) => (
  <Card className="bg-primary text-primary-foreground">
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm opacity-80">{invoiceNumber}</p>
        <Badge variant="secondary">Due {dueDate}</Badge>
      </div>
      <div className="space-y-1">
        <p className="text-sm opacity-80">Invoice for: {currentMilestone}</p>
        <p className="text-4xl font-bold">{currency}{amountDue.toLocaleString()}</p>
      </div>
      <Button variant="secondary" className="w-full">Pay Now</Button>
    </CardContent>
  </Card>
)

const PaymentHistoryCard = ({ payments, currency }: { payments: PaymentHistoryItemProps[]; currency: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base flex items-center gap-2">
        <DollarSign className="size-4" />
        Payment History
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {payments.map((payment, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium">{payment.milestone}</p>
            <p className="text-muted-foreground">{payment.date}</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="size-3 text-green-500" />
            {currency}{payment.amount.toLocaleString()}
          </Badge>
        </div>
      ))}
    </CardContent>
  </Card>
)

export default function Main() {
  const project: ProjectCardProps = {
    name: "E-Commerce Platform",
    client: "RetailMax Inc.",
    startDate: "Jan 15, 2024",
    endDate: "May 30, 2024",
    progress: 45,
  }

  const milestones: MilestoneCardProps[] = [
    { name: "Discovery & Planning", dueDate: "Jan 31", amount: 5000, status: "Completed", currency: "$" },
    { name: "Design Phase", dueDate: "Feb 28", amount: 8000, status: "Current", currency: "$" },
    { name: "Development Phase", dueDate: "Apr 15", amount: 15000, status: "Upcoming", currency: "$" },
    { name: "Testing & Launch", dueDate: "May 30", amount: 7000, status: "Upcoming", currency: "$" },
  ]

  const invoice: InvoiceSummaryCardProps = {
    invoiceNumber: "INV-2024-0089",
    currentMilestone: "Design Phase",
    amountDue: 8000,
    dueDate: "Feb 28",
    currency: "$",
  }

  const payments: PaymentHistoryItemProps[] = [
    { date: "Jan 15, 2024", amount: 5000, milestone: "Discovery & Planning", currency: "$" },
  ]

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-4">
          <ProjectCard {...project} />
          <div className="grid @lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Milestones</h3>
              {milestones.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Current Invoice</h3>
              <InvoiceSummaryCard {...invoice} />
              <PaymentHistoryCard payments={payments} currency="$" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
