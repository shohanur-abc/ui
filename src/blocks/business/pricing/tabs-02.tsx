"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sparkles, Star } from "lucide-react";

interface PricingPlan {
  name: string;
  badge?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  savingsLabel?: string;
  description: string;
  features: { text: string; included: boolean }[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

const Header = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) => (
  <div className="text-center mb-12">
    <Badge variant="secondary" className="mb-4">
      <Sparkles className="h-3 w-3 mr-1" />
      {badge}
    </Badge>
    <h2 className="text-3xl @md:text-4xl @xl:text-5xl font-bold text-foreground mb-4">{title}</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const BillingToggle = ({
  isYearly,
  onToggle,
  monthlyLabel,
  yearlyLabel,
}: {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
  monthlyLabel: string;
  yearlyLabel: string;
}) => (
  <div className="flex justify-center mb-12">
    <Tabs value={isYearly ? "yearly" : "monthly"} onValueChange={(v) => onToggle(v === "yearly")}>
      <TabsList className="bg-muted/50 p-1">
        <TabsTrigger value="monthly" className="px-6">{monthlyLabel}</TabsTrigger>
        <TabsTrigger value="yearly" className="px-6">
          {yearlyLabel}
          <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary text-xs">
            Save 20%
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

const PricingCard = ({
  plan,
  isYearly,
}: {
  plan: PricingPlan;
  isYearly: boolean;
}) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <Card
      className={`relative overflow-hidden ${
        plan.highlighted
          ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-xl shadow-primary/10"
          : ""
      }`}
    >
      {plan.badge && (
        <div className="absolute top-4 right-4">
          <Badge variant={plan.highlighted ? "default" : "secondary"}>
            <Star className="h-3 w-3 mr-1" />
            {plan.badge}
          </Badge>
        </div>
      )}
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-foreground">{price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          {isYearly && plan.savingsLabel && (
            <p className="text-sm text-primary mt-1">{plan.savingsLabel}</p>
          )}
        </div>

        <Button
          className="w-full mb-8"
          variant={plan.highlighted ? "default" : "outline"}
          asChild
        >
          <a href={plan.cta.href}>{plan.cta.label}</a>
        </Button>

        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 text-sm ${
                feature.included ? "text-foreground" : "text-muted-foreground line-through"
              }`}
            >
              <Check
                className={`h-4 w-4 shrink-0 ${
                  feature.included ? "text-primary" : "text-muted-foreground/50"
                }`}
              />
              {feature.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default function Main() {
  const [isYearly, setIsYearly] = useState(false);

  const header = {
    badge: "New Pricing",
    title: "Plans That Scale With You",
    subtitle: "From startups to enterprises, we have a plan that fits your needs.",
  };

  const plans: PricingPlan[] = [
    {
      name: "Basic",
      monthlyPrice: "$15",
      yearlyPrice: "$12",
      savingsLabel: "Save $36/year",
      description: "Essential features for personal use",
      features: [
        { text: "Up to 3 projects", included: true },
        { text: "1GB cloud storage", included: true },
        { text: "Email support", included: true },
        { text: "API access", included: false },
        { text: "Custom domains", included: false },
      ],
      cta: { label: "Start Free Trial", href: "#" },
    },
    {
      name: "Growth",
      badge: "Popular",
      monthlyPrice: "$39",
      yearlyPrice: "$31",
      savingsLabel: "Save $96/year",
      description: "Advanced features for growing teams",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "50GB cloud storage", included: true },
        { text: "Priority support", included: true },
        { text: "API access", included: true },
        { text: "Custom domains", included: true },
      ],
      cta: { label: "Start Free Trial", href: "#" },
      highlighted: true,
    },
    {
      name: "Scale",
      monthlyPrice: "$99",
      yearlyPrice: "$79",
      savingsLabel: "Save $240/year",
      description: "Enterprise-grade for large teams",
      features: [
        { text: "Everything in Growth", included: true },
        { text: "Unlimited storage", included: true },
        { text: "24/7 phone support", included: true },
        { text: "SSO & SAML", included: true },
        { text: "Dedicated manager", included: true },
      ],
      cta: { label: "Contact Sales", href: "#" },
    },
  ];

  return (
    <section className="@container" data-theme="pricing">
      <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
        <Header {...header} />
        <BillingToggle
          isYearly={isYearly}
          onToggle={setIsYearly}
          monthlyLabel="Monthly"
          yearlyLabel="Yearly"
        />
        <div className="grid @md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
