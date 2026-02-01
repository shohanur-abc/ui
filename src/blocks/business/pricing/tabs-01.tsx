"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Zap } from "lucide-react";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  cta: { label: string; href: string };
  popular?: boolean;
}

interface TabOption {
  value: string;
  label: string;
}

const Eyebrow = ({ label, icon: Icon }: { label: string; icon: React.ElementType }) => (
  <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary mb-4">
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </div>
);

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl @md:text-4xl @xl:text-5xl font-bold text-foreground mb-4">{title}</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const BillingTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (value: string) => void;
}) => (
  <div className="flex justify-center mb-10">
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-[300px] grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </div>
);

const PricingCard = ({
  plan,
  billingPeriod,
}: {
  plan: PricingPlan;
  billingPeriod: "monthly" | "yearly";
}) => {
  const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <Card className={`relative ${plan.popular ? "border-primary shadow-lg shadow-primary/20" : ""}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center pt-8">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-6">
          <span className="text-4xl @lg:text-5xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
        </div>
        <ul className="space-y-3 text-left">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${plan.popular ? "" : "variant-outline"}`}
          variant={plan.popular ? "default" : "outline"}
          asChild
        >
          <a href={plan.cta.href}>{plan.cta.label}</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Main() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const eyebrow = { label: "Simple Pricing", icon: Zap };
  const title = "Choose Your Plan";
  const subtitle = "Start with a 14-day free trial. No credit card required.";

  const tabs: TabOption[] = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const plans: PricingPlan[] = [
    {
      name: "Starter",
      description: "Perfect for individuals",
      monthlyPrice: "$9",
      yearlyPrice: "$90",
      features: ["5 projects", "5GB storage", "Basic analytics", "Email support"],
      cta: { label: "Get Started", href: "#" },
    },
    {
      name: "Professional",
      description: "Best for growing teams",
      monthlyPrice: "$29",
      yearlyPrice: "$290",
      features: ["Unlimited projects", "50GB storage", "Advanced analytics", "Priority support", "Team collaboration"],
      cta: { label: "Get Started", href: "#" },
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: "$99",
      yearlyPrice: "$990",
      features: ["Everything in Pro", "Unlimited storage", "Custom integrations", "24/7 phone support", "SLA guarantee"],
      cta: { label: "Contact Sales", href: "#" },
    },
  ];

  return (
    <section className="@container" data-theme="pricing">
      <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
        <Eyebrow {...eyebrow} />
        <Header title={title} subtitle={subtitle} />
        <BillingTabs
          tabs={tabs}
          activeTab={billingPeriod}
          onTabChange={(v) => setBillingPeriod(v as "monthly" | "yearly")}
        />
        <div className="grid @md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} billingPeriod={billingPeriod} />
          ))}
        </div>
      </div>
    </section>
  );
}
