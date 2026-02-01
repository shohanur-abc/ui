"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ArrowRight } from "lucide-react";

interface PricingPlan {
  name: string;
  tagline: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

const Header = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="text-center mb-16">
    <p className="text-primary font-semibold mb-3">{eyebrow}</p>
    <h2 className="text-4xl @md:text-5xl @xl:text-6xl font-bold text-foreground mb-6">{title}</h2>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const PricingRow = ({
  plan,
  isYearly,
  isLast,
}: {
  plan: PricingPlan;
  isYearly: boolean;
  isLast: boolean;
}) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`grid @lg:grid-cols-[1fr_auto_1fr] gap-8 items-center py-10 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      {/* Plan Info */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
          {plan.featured && (
            <Badge className="bg-primary text-primary-foreground">Best Value</Badge>
          )}
        </div>
        <p className="text-sm text-primary font-medium mb-2">{plan.tagline}</p>
        <p className="text-muted-foreground">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="text-center @lg:px-12">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-foreground">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          per {isYearly ? "year" : "month"}
        </p>
      </div>

      {/* Features & CTA */}
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {plan.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button variant={plan.featured ? "default" : "outline"} className="shrink-0" asChild>
          <a href={plan.cta.href} className="flex items-center gap-2">
            {plan.cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default function Main() {
  const [isYearly, setIsYearly] = useState(true);

  const header = {
    eyebrow: "PRICING PLANS",
    title: "Simple, Transparent Pricing",
    subtitle: "No hidden fees. No surprises. Choose the plan that works best for you.",
  };

  const plans: PricingPlan[] = [
    {
      name: "Hobby",
      tagline: "For personal projects",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      description: "Get started with the basics. Perfect for side projects and experimentation.",
      features: ["3 projects", "1GB storage", "Community support"],
      cta: { label: "Get Started", href: "#" },
    },
    {
      name: "Pro",
      tagline: "For professionals",
      monthlyPrice: "$29",
      yearlyPrice: "$290",
      description: "Everything you need to build and scale your professional projects.",
      features: ["Unlimited projects", "50GB storage", "Priority support"],
      cta: { label: "Start Trial", href: "#" },
      featured: true,
    },
    {
      name: "Team",
      tagline: "For growing teams",
      monthlyPrice: "$79",
      yearlyPrice: "$790",
      description: "Advanced collaboration features for teams of all sizes.",
      features: ["Team workspaces", "200GB storage", "Admin dashboard"],
      cta: { label: "Start Trial", href: "#" },
    },
    {
      name: "Enterprise",
      tagline: "For large organizations",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "Dedicated infrastructure and support for enterprise needs.",
      features: ["Custom SLA", "Unlimited storage", "Dedicated support"],
      cta: { label: "Contact Us", href: "#" },
    },
  ];

  return (
    <section className="@container" data-theme="pricing">
      <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
        <Header {...header} />

        <div className="flex justify-center mb-12">
          <Tabs value={isYearly ? "yearly" : "monthly"} onValueChange={(v) => setIsYearly(v === "yearly")}>
            <TabsList className="h-12">
              <TabsTrigger value="monthly" className="px-6">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="px-6">
                Yearly
                <span className="ml-2 text-xs text-primary">(Save 17%)</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="border border-border rounded-2xl bg-card p-4 @lg:p-8">
          {plans.map((plan, i) => (
            <PricingRow key={i} plan={plan} isYearly={isYearly} isLast={i === plans.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
