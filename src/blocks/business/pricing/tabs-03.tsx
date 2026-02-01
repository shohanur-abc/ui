"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Users, User, Building2, Rocket } from "lucide-react";

interface PricingPlan {
  name: string;
  icon: React.ElementType;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  cta: { label: string; href: string; variant: "default" | "outline" | "secondary" };
  recommended?: boolean;
}

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl @md:text-4xl @xl:text-5xl font-bold text-foreground mb-4">{title}</h2>
    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

const PricingCard = ({
  plan,
  isYearly,
}: {
  plan: PricingPlan;
  isYearly: boolean;
}) => {
  const Icon = plan.icon;
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <Card className={`relative h-full ${plan.recommended ? "border-primary ring-1 ring-primary/20" : ""}`}>
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4">Recommended</Badge>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${plan.recommended ? "bg-primary/20" : "bg-muted"}`}>
            <Icon className={`h-5 w-5 ${plan.recommended ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-140px)]">
        <div className="mb-6">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground text-sm ml-1">
            /{isYearly ? "year" : "month"}
          </span>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        <Button variant={plan.cta.variant} className="w-full" asChild>
          <a href={plan.cta.href}>{plan.cta.label}</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function Main() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const title = "Transparent Pricing for Every Team";
  const subtitle =
    "Whether you're a solo creator or an enterprise team, we have the right plan for you. All plans include a 30-day money-back guarantee.";

  const plans: PricingPlan[] = [
    {
      name: "Solo",
      icon: User,
      monthlyPrice: "$12",
      yearlyPrice: "$120",
      description: "Perfect for freelancers and solo creators",
      features: [
        "1 team member",
        "5 active projects",
        "10GB storage",
        "Basic analytics",
        "Community support",
      ],
      cta: { label: "Start Free", href: "#", variant: "outline" },
    },
    {
      name: "Team",
      icon: Users,
      monthlyPrice: "$49",
      yearlyPrice: "$490",
      description: "Ideal for small to medium teams",
      features: [
        "Up to 10 members",
        "Unlimited projects",
        "100GB storage",
        "Advanced analytics",
        "Priority email support",
        "Team collaboration tools",
      ],
      cta: { label: "Start Free", href: "#", variant: "default" },
      recommended: true,
    },
    {
      name: "Business",
      icon: Building2,
      monthlyPrice: "$149",
      yearlyPrice: "$1,490",
      description: "For larger teams with advanced needs",
      features: [
        "Up to 50 members",
        "Unlimited everything",
        "1TB storage",
        "Custom analytics",
        "24/7 priority support",
        "Admin controls",
        "Audit logs",
      ],
      cta: { label: "Start Free", href: "#", variant: "outline" },
    },
    {
      name: "Enterprise",
      icon: Rocket,
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "Custom solutions for enterprise organizations",
      features: [
        "Unlimited members",
        "Unlimited everything",
        "Unlimited storage",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "On-premise option",
        "Custom training",
      ],
      cta: { label: "Contact Sales", href: "#", variant: "secondary" },
    },
  ];

  return (
    <section className="@container" data-theme="pricing">
      <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
        <Header title={title} subtitle={subtitle} />

        <div className="flex justify-center mb-12">
          <Tabs
            value={billingPeriod}
            onValueChange={(v) => setBillingPeriod(v as "monthly" | "yearly")}
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly billing</TabsTrigger>
              <TabsTrigger value="yearly">
                Annual billing
                <Badge variant="secondary" className="ml-2 text-xs bg-accent text-accent-foreground">
                  2 months free
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} isYearly={billingPeriod === "yearly"} />
          ))}
        </div>
      </div>
    </section>
  );
}
