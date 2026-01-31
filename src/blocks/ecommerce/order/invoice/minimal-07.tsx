import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Gift, Heart, Sparkles } from "lucide-react"

interface DonationHeaderProps {
  receiptNumber: string
  date: string
  taxDeductible: boolean
}

interface OrganizationInfoProps {
  name: string
  taxId: string
  address: string
}

interface DonorInfoProps {
  name: string
  email: string
}

interface DonationDetailsProps {
  amount: number
  currency: string
  frequency: string
  campaign: string
  paymentMethod: string
}

const DonationHeader = ({ receiptNumber, date, taxDeductible }: DonationHeaderProps) => (
  <div className="text-center space-y-3">
    <div className="inline-flex size-16 rounded-full bg-pink-500/10 items-center justify-center mx-auto">
      <Heart className="size-8 text-pink-500 fill-pink-500" />
    </div>
    <div>
      <p className="text-xl font-bold">Thank You!</p>
      <p className="text-muted-foreground">Donation Receipt</p>
    </div>
    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
      <span>{receiptNumber}</span>
      <span>•</span>
      <span>{date}</span>
    </div>
    {taxDeductible && (
      <Badge variant="secondary" className="gap-1">
        <Sparkles className="size-3" />
        Tax Deductible
      </Badge>
    )}
  </div>
)

const OrganizationInfo = ({ name, taxId, address }: OrganizationInfoProps) => (
  <div className="text-center text-sm space-y-1">
    <p className="font-semibold">{name}</p>
    <p className="text-muted-foreground">Tax ID: {taxId}</p>
    <p className="text-muted-foreground">{address}</p>
  </div>
)

const DonorInfo = ({ name, email }: DonorInfoProps) => (
  <div className="text-sm">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Donor</p>
    <p className="font-medium">{name}</p>
    <p className="text-muted-foreground">{email}</p>
  </div>
)

const DonationDetails = ({ amount, currency, frequency, campaign, paymentMethod }: DonationDetailsProps) => (
  <div className="space-y-4">
    <div className="text-center py-4">
      <p className="text-4xl font-bold text-primary">{currency}{amount.toFixed(2)}</p>
      <Badge variant="outline" className="mt-2">{frequency}</Badge>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Campaign</span>
        <span className="font-medium">{campaign}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Payment Method</span>
        <span>{paymentMethod}</span>
      </div>
    </div>
  </div>
)

export default function Main() {
  const header: DonationHeaderProps = {
    receiptNumber: "DON-2024-5678",
    date: "February 14, 2024",
    taxDeductible: true,
  }

  const organization: OrganizationInfoProps = {
    name: "Hope Foundation International",
    taxId: "12-3456789",
    address: "100 Charity Way, New York, NY 10001",
  }

  const donor: DonorInfoProps = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
  }

  const donation: DonationDetailsProps = {
    amount: 100.00,
    currency: "$",
    frequency: "One-Time",
    campaign: "Emergency Relief Fund",
    paymentMethod: "Visa ****4521",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-sm px-4 @sm:px-6 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <DonationHeader {...header} />
          <Separator />
          <OrganizationInfo {...organization} />
          <Separator />
          <DonorInfo {...donor} />
          <DonationDetails {...donation} />
          <div className="p-3 rounded-lg bg-pink-500/5 border border-pink-500/20 text-center">
            <p className="text-sm">Your generosity makes a difference! 💝</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" size="sm">Download PDF</Button>
            <Button className="flex-1 gap-2" size="sm">
              <Gift className="size-4" />
              Donate Again
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
