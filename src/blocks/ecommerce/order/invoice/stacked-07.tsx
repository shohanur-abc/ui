import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarRange, Clock, Repeat, Sparkles } from "lucide-react"

interface ServiceDetail {
  label: string
  value: string
}

interface SubscriptionHeaderProps {
  planName: string
  planType: string
  status: string
  renewalDate: string
}

interface PlanDetailsProps {
  details: ServiceDetail[]
}

interface BillingHistoryProps {
  items: { date: string; amount: number; status: string }[]
  currency: string
}

interface UpcomingChargeProps {
  nextDate: string
  amount: number
  currency: string
  paymentMethod: string
}

interface FeaturesListProps {
  title: string
  features: string[]
}

const SubscriptionHeader = ({ planName, planType, status, renewalDate }: SubscriptionHeaderProps) => (
  <div className="space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
          <Sparkles className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{planName}</h1>
          <p className="text-sm text-muted-foreground">{planType}</p>
        </div>
      </div>
      <Badge variant="default">{status}</Badge>
    </div>
    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm">
      <Repeat className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Auto-renews on</span>
      <span className="font-medium">{renewalDate}</span>
    </div>
  </div>
)

const PlanDetails = ({ details }: PlanDetailsProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <p className="font-semibold">Plan Details</p>
    <div className="grid gap-2">
      {details.map((detail, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{detail.label}</span>
          <span className="font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
  </div>
)

const BillingHistory = ({ items, currency }: BillingHistoryProps) => (
  <div className="space-y-3">
    <p className="font-semibold">Billing History</p>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <CalendarRange className="size-4 text-muted-foreground" />
            <span className="text-sm">{item.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">{currency}{item.amount.toFixed(2)}</span>
            <Badge variant="outline" className="text-xs">{item.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const UpcomingCharge = ({ nextDate, amount, currency, paymentMethod }: UpcomingChargeProps) => (
  <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-3">
    <div className="flex items-center gap-2">
      <Clock className="size-4 text-primary" />
      <p className="font-semibold">Upcoming Charge</p>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-bold text-primary">{currency}{amount.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">on {nextDate}</p>
      </div>
      <Badge variant="secondary">{paymentMethod}</Badge>
    </div>
  </div>
)

const FeaturesList = ({ title, features }: FeaturesListProps) => (
  <div className="p-4 rounded-lg bg-muted/30 space-y-3">
    <p className="font-semibold">{title}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <div className="size-1.5 rounded-full bg-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function Main() {
  const header: SubscriptionHeaderProps = {
    planName: "Pro Plan",
    planType: "Annual Subscription",
    status: "Active",
    renewalDate: "February 15, 2025",
  }

  const planDetails: ServiceDetail[] = [
    { label: "Billing Period", value: "Yearly" },
    { label: "Started", value: "Feb 15, 2024" },
    { label: "Users", value: "Up to 10" },
    { label: "Storage", value: "100 GB" },
  ]

  const billingHistory = [
    { date: "Feb 15, 2024", amount: 199.00, status: "Paid" },
    { date: "Feb 15, 2023", amount: 179.00, status: "Paid" },
    { date: "Feb 15, 2022", amount: 159.00, status: "Paid" },
  ]

  const upcomingCharge: UpcomingChargeProps = {
    nextDate: "Feb 15, 2025",
    amount: 199.00,
    currency: "$",
    paymentMethod: "Visa •••• 4242",
  }

  const features: FeaturesListProps = {
    title: "Your Plan Includes",
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Team collaboration",
    ],
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="border-b">
            <SubscriptionHeader {...header} />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <PlanDetails details={planDetails} />
            <UpcomingCharge {...upcomingCharge} />
            <BillingHistory items={billingHistory} currency="$" />
            <FeaturesList {...features} />
            <Separator />
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Update Payment</Button>
              <Button variant="ghost" className="text-destructive">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
