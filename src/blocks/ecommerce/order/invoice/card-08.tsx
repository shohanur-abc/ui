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
import { Calendar, CheckCircle, Clock, Hammer, HardHat, Home, Phone, Receipt, Ruler, User } from "lucide-react"

interface ContractorCardProps {
  companyName: string
  licenseNumber: string
  phone: string
  email: string
}

interface ProjectCardProps {
  name: string
  address: string
  startDate: string
  estimatedCompletion: string
  progress: number
}

interface PhaseCardProps {
  name: string
  status: string
  completedDate?: string
  amount: number
  currency: string
}

interface MaterialsCardProps {
  items: { name: string; quantity: string; cost: number }[]
  total: number
  currency: string
}

interface InvoiceSummaryCardProps {
  invoiceNumber: string
  laborTotal: number
  materialsTotal: number
  permitFees: number
  tax: number
  total: number
  paidToDate: number
  currentDue: number
  currency: string
}

const ContractorCard = ({ companyName, licenseNumber, phone, email }: ContractorCardProps) => (
  <Card className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-500/20">
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <HardHat className="size-4" />
        Contractor
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
          <Hammer className="size-6 text-white" />
        </div>
        <div>
          <p className="font-semibold">{companyName}</p>
          <p className="text-sm text-muted-foreground">Lic# {licenseNumber}</p>
        </div>
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Phone className="size-3" />
          <span>{phone}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{email}</p>
    </CardContent>
  </Card>
)

const ProjectCard = ({ name, address, startDate, estimatedCompletion, progress }: ProjectCardProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Home className="size-4" />
        Project Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Started</p>
          <p className="font-medium">{startDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Est. Completion</p>
          <p className="font-medium">{estimatedCompletion}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </CardContent>
  </Card>
)

const PhaseCard = ({ name, status, completedDate, amount, currency }: PhaseCardProps) => {
  const isComplete = status === "Complete"
  const isInProgress = status === "In Progress"

  return (
    <Card className={isInProgress ? "border-primary" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-full flex items-center justify-center ${isComplete ? "bg-green-500/10" : isInProgress ? "bg-primary/10" : "bg-muted"}`}>
              {isComplete ? <CheckCircle className="size-5 text-green-500" /> : 
               isInProgress ? <Clock className="size-5 text-primary" /> :
               <Ruler className="size-5 text-muted-foreground" />}
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <div className="flex items-center gap-2">
                <Badge variant={isComplete ? "default" : isInProgress ? "secondary" : "outline"}>
                  {status}
                </Badge>
                {completedDate && <span className="text-xs text-muted-foreground">{completedDate}</span>}
              </div>
            </div>
          </div>
          <p className="font-bold text-lg">{currency}{amount.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const MaterialsCard = ({ items, total, currency }: MaterialsCardProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base">Materials & Supplies</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm">
          <div>
            <span className="font-medium">{item.name}</span>
            <span className="text-muted-foreground ml-2">({item.quantity})</span>
          </div>
          <span>{currency}{item.cost.toFixed(2)}</span>
        </div>
      ))}
      <Separator />
      <div className="flex justify-between font-semibold">
        <span>Materials Total</span>
        <span>{currency}{total.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
)

const InvoiceSummaryCard = ({ invoiceNumber, laborTotal, materialsTotal, permitFees, tax, total, paidToDate, currentDue, currency }: InvoiceSummaryCardProps) => (
  <Card className="bg-primary text-primary-foreground">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2 text-primary-foreground">
          <Receipt className="size-4" />
          Invoice Summary
        </CardTitle>
        <span className="font-mono text-sm opacity-80">{invoiceNumber}</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="opacity-80">Labor</span>
          <span>{currency}{laborTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Materials</span>
          <span>{currency}{materialsTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Permit Fees</span>
          <span>{currency}{permitFees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Tax</span>
          <span>{currency}{tax.toLocaleString()}</span>
        </div>
      </div>
      <Separator className="bg-primary-foreground/20" />
      <div className="flex justify-between font-bold">
        <span>Contract Total</span>
        <span>{currency}{total.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="opacity-80">Paid to Date</span>
        <span className="text-green-300">-{currency}{paidToDate.toLocaleString()}</span>
      </div>
      <div className="pt-2 border-t border-primary-foreground/20">
        <p className="text-sm opacity-80">Current Amount Due</p>
        <p className="text-3xl font-bold">{currency}{currentDue.toLocaleString()}</p>
      </div>
      <Button variant="secondary" className="w-full">Pay Invoice</Button>
    </CardContent>
  </Card>
)

export default function Main() {
  const contractor: ContractorCardProps = {
    companyName: "Quality Home Builders",
    licenseNumber: "C-123456",
    phone: "(555) 456-7890",
    email: "info@qualityhomebuilders.com",
  }

  const project: ProjectCardProps = {
    name: "Kitchen Remodel",
    address: "456 Maple Street, Portland, OR 97201",
    startDate: "Jan 15, 2024",
    estimatedCompletion: "Apr 30, 2024",
    progress: 65,
  }

  const phases: PhaseCardProps[] = [
    { name: "Demolition", status: "Complete", completedDate: "Jan 22", amount: 2500, currency: "$" },
    { name: "Plumbing Rough-In", status: "Complete", completedDate: "Feb 5", amount: 4500, currency: "$" },
    { name: "Electrical Rough-In", status: "Complete", completedDate: "Feb 12", amount: 3800, currency: "$" },
    { name: "Cabinet Installation", status: "In Progress", amount: 8500, currency: "$" },
    { name: "Countertops & Finishes", status: "Pending", amount: 6200, currency: "$" },
  ]

  const materials = [
    { name: "Custom Cabinets", quantity: "15 units", cost: 12500 },
    { name: "Quartz Countertop", quantity: "45 sq ft", cost: 3600 },
    { name: "Tile Backsplash", quantity: "30 sq ft", cost: 850 },
    { name: "Plumbing Fixtures", quantity: "Faucet, Sink", cost: 1200 },
  ]

  const summary: InvoiceSummaryCardProps = {
    invoiceNumber: "INV-2024-0456",
    laborTotal: 25500,
    materialsTotal: 18150,
    permitFees: 850,
    tax: 1452,
    total: 45952,
    paidToDate: 18000,
    currentDue: 8500,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Hammer className="size-5 text-primary" />
            <h1 className="text-xl font-bold">Construction Invoice</h1>
          </div>
          <div className="grid @md:grid-cols-2 gap-4">
            <ContractorCard {...contractor} />
            <ProjectCard {...project} />
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Project Phases</h3>
            {phases.map((phase, index) => (
              <PhaseCard key={index} {...phase} />
            ))}
          </div>
          <div className="grid @md:grid-cols-2 gap-4">
            <MaterialsCard items={materials} total={18150} currency="$" />
            <InvoiceSummaryCard {...summary} />
          </div>
        </div>
      </div>
    </section>
  )
}
