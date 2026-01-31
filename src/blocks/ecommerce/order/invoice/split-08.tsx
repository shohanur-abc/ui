import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Dumbbell, Heart, Sparkles, Zap } from "lucide-react"

interface MembershipPerkProps {
  text: string
}

interface GymInfoProps {
  name: string
  location: string
  membershipType: string
  perks: MembershipPerkProps[]
}

interface MemberDetailsProps {
  memberId: string
  name: string
  startDate: string
  renewalDate: string
  status: string
}

interface BillingInfoProps {
  monthlyFee: number
  initiationFee: number
  promoDiscount: number
  firstMonthTotal: number
  currency: string
}

interface WelcomeMessageProps {
  title: string
  message: string
}

const GymInfo = ({ name, location, membershipType, perks }: GymInfoProps) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 space-y-4">
    <div className="flex items-center gap-3">
      <div className="size-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
        <Dumbbell className="size-7 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
    </div>
    <Badge variant="secondary" className="gap-1">
      <Sparkles className="size-3" />
      {membershipType}
    </Badge>
    <div className="space-y-2">
      {perks.map((perk, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <Check className="size-4 text-green-500" />
          <span>{perk.text}</span>
        </div>
      ))}
    </div>
  </div>
)

const MemberDetails = ({ memberId, name, startDate, renewalDate, status }: MemberDetailsProps) => (
  <div className="p-4 rounded-lg bg-muted/40 space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Member ID</p>
        <p className="font-mono font-bold">{memberId}</p>
      </div>
      <Badge variant="default" className="gap-1">
        <Heart className="size-3" />
        {status}
      </Badge>
    </div>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Member</p>
        <p className="font-medium">{name}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Start Date</p>
        <p className="font-medium">{startDate}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Next Billing</p>
        <p className="font-medium">{renewalDate}</p>
      </div>
    </div>
  </div>
)

const BillingInfo = ({ monthlyFee, initiationFee, promoDiscount, firstMonthTotal, currency }: BillingInfoProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <p className="font-semibold">First Month Charges</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Monthly Membership</span>
        <span>{currency}{monthlyFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Initiation Fee</span>
        <span>{currency}{initiationFee.toFixed(2)}</span>
      </div>
      {promoDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Promo Discount</span>
          <span>-{currency}{promoDiscount.toFixed(2)}</span>
        </div>
      )}
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>First Month Total</span>
      <span className="text-primary">{currency}{firstMonthTotal.toFixed(2)}</span>
    </div>
    <p className="text-xs text-muted-foreground text-center">
      Then {currency}{monthlyFee.toFixed(2)}/month
    </p>
  </div>
)

const WelcomeMessage = ({ title, message }: WelcomeMessageProps) => (
  <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-2">
    <div className="flex items-center gap-2">
      <Zap className="size-5 text-primary" />
      <p className="font-semibold">{title}</p>
    </div>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
)

export default function Main() {
  const perks: MembershipPerkProps[] = [
    { text: "Unlimited gym access" },
    { text: "All group fitness classes" },
    { text: "Personal trainer session (monthly)" },
    { text: "Sauna & spa access" },
    { text: "Towel service" },
    { text: "Guest passes (2/month)" },
  ]

  const gym: GymInfoProps = {
    name: "FitLife Gym",
    location: "Downtown - 123 Fitness Ave",
    membershipType: "Premium Membership",
    perks,
  }

  const member: MemberDetailsProps = {
    memberId: "GYM-2024-7890",
    name: "Alex Thompson",
    startDate: "Feb 20, 2024",
    renewalDate: "Mar 20, 2024",
    status: "Active",
  }

  const billing: BillingInfoProps = {
    monthlyFee: 79.99,
    initiationFee: 49.00,
    promoDiscount: 49.00,
    firstMonthTotal: 79.99,
    currency: "$",
  }

  const welcome: WelcomeMessageProps = {
    title: "Welcome to FitLife!",
    message: "Your membership is now active. Download our mobile app to book classes, track workouts, and connect with trainers.",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="grid @lg:grid-cols-5 gap-6">
              <div className="@lg:col-span-2 space-y-4">
                <GymInfo {...gym} />
              </div>
              <div className="@lg:col-span-3 space-y-4">
                <h2 className="text-xl font-bold">Membership Confirmation</h2>
                <MemberDetails {...member} />
                <BillingInfo {...billing} />
                <WelcomeMessage {...welcome} />
                <div className="flex gap-3">
                  <Button className="flex-1">Download Member Card</Button>
                  <Button variant="outline" className="flex-1">Book a Class</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
