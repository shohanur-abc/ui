import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Activity, Calendar, Heart, Pill, Stethoscope, User } from "lucide-react"

interface PatientCardProps {
  name: string
  dob: string
  patientId: string
  insurance: string
}

interface ProviderCardProps {
  name: string
  specialty: string
  facility: string
  npi: string
}

interface ServiceCardProps {
  code: string
  description: string
  date: string
  quantity: number
  charge: number
  currency: string
}

interface InsuranceBreakdownProps {
  totalCharges: number
  insurancePayment: number
  adjustments: number
  patientResponsibility: number
  currency: string
}

interface AccountSummaryProps {
  statementNumber: string
  statementDate: string
  dueDate: string
  amountDue: number
  currency: string
}

const PatientCard = ({ name, dob, patientId, insurance }: PatientCardProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <User className="size-4" />
        Patient Information
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Patient Name</p>
        <p className="font-medium">{name}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Date of Birth</p>
        <p className="font-medium">{dob}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Patient ID</p>
        <p className="font-mono font-medium">{patientId}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Insurance</p>
        <p className="font-medium">{insurance}</p>
      </div>
    </CardContent>
  </Card>
)

const ProviderCard = ({ name, specialty, facility, npi }: ProviderCardProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Stethoscope className="size-4" />
        Provider Information
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Provider</p>
        <p className="font-medium">{name}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Specialty</p>
        <p className="font-medium">{specialty}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Facility</p>
        <p className="font-medium">{facility}</p>
      </div>
      <div>
        <p className="text-muted-foreground">NPI</p>
        <p className="font-mono font-medium">{npi}</p>
      </div>
    </CardContent>
  </Card>
)

const ServiceCard = ({ code, description, date, quantity, charge, currency }: ServiceCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">{code}</Badge>
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
          <p className="font-medium">{description}</p>
          <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
        </div>
        <p className="font-bold text-lg">{currency}{charge.toFixed(2)}</p>
      </div>
    </CardContent>
  </Card>
)

const InsuranceBreakdownCard = ({ totalCharges, insurancePayment, adjustments, patientResponsibility, currency }: InsuranceBreakdownProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Heart className="size-4" />
        Insurance Summary
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Charges</span>
          <span>{currency}{totalCharges.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Insurance Payment</span>
          <span>-{currency}{insurancePayment.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Adjustments</span>
          <span>-{currency}{adjustments.toFixed(2)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between font-bold">
        <span>Patient Responsibility</span>
        <span className="text-primary">{currency}{patientResponsibility.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
)

const AccountSummaryCard = ({ statementNumber, statementDate, dueDate, amountDue, currency }: AccountSummaryProps) => (
  <Card className="bg-primary text-primary-foreground">
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="opacity-80">Statement #{statementNumber}</span>
        <span className="opacity-80">{statementDate}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm opacity-80">Amount Due by {dueDate}</p>
        <p className="text-4xl font-bold">{currency}{amountDue.toFixed(2)}</p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1">Pay Online</Button>
        <Button variant="secondary" className="flex-1">Payment Plan</Button>
      </div>
    </CardContent>
  </Card>
)

export default function Main() {
  const patient: PatientCardProps = {
    name: "Robert Johnson",
    dob: "March 15, 1978",
    patientId: "PT-789456",
    insurance: "Blue Cross Blue Shield",
  }

  const provider: ProviderCardProps = {
    name: "Dr. Sarah Williams, MD",
    specialty: "Internal Medicine",
    facility: "City Medical Center",
    npi: "1234567890",
  }

  const services: ServiceCardProps[] = [
    { code: "99213", description: "Office Visit - Established Patient", date: "Feb 10, 2024", quantity: 1, charge: 175.00, currency: "$" },
    { code: "36415", description: "Blood Draw - Venipuncture", date: "Feb 10, 2024", quantity: 1, charge: 25.00, currency: "$" },
    { code: "80053", description: "Comprehensive Metabolic Panel", date: "Feb 10, 2024", quantity: 1, charge: 85.00, currency: "$" },
  ]

  const insurance: InsuranceBreakdownProps = {
    totalCharges: 285.00,
    insurancePayment: 199.50,
    adjustments: 45.50,
    patientResponsibility: 40.00,
    currency: "$",
  }

  const account: AccountSummaryProps = {
    statementNumber: "STM-2024-5678",
    statementDate: "Feb 15, 2024",
    dueDate: "Mar 15, 2024",
    amountDue: 40.00,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-5 text-primary" />
            <h1 className="text-xl font-bold">Medical Statement</h1>
          </div>
          <div className="grid @md:grid-cols-2 gap-4">
            <PatientCard {...patient} />
            <ProviderCard {...provider} />
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Services Rendered</h3>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="grid @md:grid-cols-2 gap-4">
            <InsuranceBreakdownCard {...insurance} />
            <AccountSummaryCard {...account} />
          </div>
        </div>
      </div>
    </section>
  )
}
