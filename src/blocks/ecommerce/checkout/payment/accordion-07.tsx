'use client';

import { ArrowRight, Clock, CreditCard, Gift, Lock, Percent, RefreshCcw, Shield, Star, Zap } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface SubscriptionPlan {
	id: string;
	name: string;
	interval: string;
	price: string;
	perMonth: string;
	savings?: string;
	popular?: boolean;
}

const SubscriptionPlansContent = ({ plans }: { plans: SubscriptionPlan[] }) => (
	<div className="space-y-3 pt-4">
		<RadioGroup defaultValue={plans.find(p => p.popular)?.id || plans[0].id} className="space-y-3">
			{plans.map((plan) => (
				<Label
					key={plan.id}
					htmlFor={plan.id}
					className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						plan.popular ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{plan.popular && (
						<Badge className="absolute -top-2.5 right-3 text-xs gap-0.5">
							<Star className="size-2.5" />
							Best Value
						</Badge>
					)}
					<RadioGroupItem value={plan.id} id={plan.id} />
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium">{plan.name}</span>
							{plan.savings && <Badge variant="secondary" className="text-xs text-emerald-600">{plan.savings}</Badge>}
						</div>
						<p className="text-xs text-muted-foreground">Billed {plan.interval}</p>
					</div>
					<div className="text-right">
						<span className="font-bold">{plan.price}</span>
						<p className="text-xs text-muted-foreground">{plan.perMonth}/mo</p>
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const BenefitsContent = ({ benefits }: { benefits: { icon: React.ComponentType<{ className?: string }>; text: string }[] }) => (
	<div className="space-y-3 pt-4">
		{benefits.map((benefit, index) => (
			<div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
				<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
					<benefit.icon className="size-4 text-primary" />
				</div>
				<span className="text-sm">{benefit.text}</span>
			</div>
		))}
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">CVV</Label>
				<Input type="password" placeholder="•••" />
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
			<RefreshCcw className="size-4 text-muted-foreground" />
			<span className="text-sm text-muted-foreground">Card will be charged automatically each billing period</span>
		</div>
	</div>
);

const TrialContent = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
			<div className="flex items-center gap-2 text-primary mb-2">
				<Zap className="size-4" />
				<span className="font-medium">7-Day Free Trial</span>
			</div>
			<ul className="space-y-2 text-sm text-muted-foreground">
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-primary" />
					Full access to all premium features
				</li>
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-primary" />
					Cancel anytime before trial ends
				</li>
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-primary" />
					No charge until trial expires
				</li>
			</ul>
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="remind" defaultChecked />
			<Label htmlFor="remind" className="text-sm cursor-pointer">Remind me 2 days before trial ends</Label>
		</div>
	</div>
);

const PromoContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Percent className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Enter promo code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
	</div>
);

const TermsContent = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-muted/30 text-sm text-muted-foreground space-y-3">
			<p>By subscribing, you agree to:</p>
			<ul className="space-y-2">
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-muted-foreground" />
					Automatic renewal at the end of each billing period
				</li>
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-muted-foreground" />
					Cancel anytime through account settings
				</li>
				<li className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-muted-foreground" />
					Refund within 30 days if not satisfied
				</li>
			</ul>
		</div>
		<div className="flex items-start gap-3">
			<Checkbox id="terms" className="mt-0.5" />
			<Label htmlFor="terms" className="text-sm cursor-pointer">
				I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>
			</Label>
		</div>
	</div>
);

const SubscriptionSummary = ({ plan, firstCharge, nextCharge }: { plan: string; firstCharge: string; nextCharge: string }) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
		<div className="flex items-center justify-between">
			<span className="font-medium">{plan}</span>
			<Badge variant="secondary" className="gap-1">
				<Zap className="size-3" />
				7-Day Trial
			</Badge>
		</div>
		<Separator />
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Due today</span>
				<span className="font-medium text-primary">$0.00</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">After trial ends</span>
				<span>{firstCharge}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Next billing date</span>
				<span>{nextCharge}</span>
			</div>
		</div>
	</div>
);

const SubscribeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

export default function Main() {
	const plans: SubscriptionPlan[] = [
		{ id: 'monthly', name: 'Monthly', interval: 'every month', price: '$14.99', perMonth: '$14.99' },
		{ id: 'yearly', name: 'Yearly', interval: 'every 12 months', price: '$119.99', perMonth: '$9.99', savings: 'Save 33%', popular: true },
		{ id: 'lifetime', name: 'Lifetime', interval: 'one-time payment', price: '$299.99', perMonth: 'Forever' },
	];

	const benefits = [
		{ icon: Zap, text: 'Unlimited access to all premium features' },
		{ icon: Clock, text: 'Priority customer support 24/7' },
		{ icon: Gift, text: 'Exclusive member discounts and early access' },
		{ icon: Shield, text: 'Advanced security and data protection' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Subscribe to Premium</h2>
							<Badge className="gap-1">
								<Zap className="size-3" />
								Premium
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="multiple" defaultValue={['plans', 'benefits']} className="w-full">
							<AccordionItem value="plans">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<RefreshCcw className="size-4" />
										<span className="font-medium">Subscription Plan</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<SubscriptionPlansContent plans={plans} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="benefits">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Star className="size-4" />
										<span className="font-medium">Premium Benefits</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<BenefitsContent benefits={benefits} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Payment Method</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="trial">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Zap className="size-4" />
										<span className="font-medium">Free Trial</span>
										<Badge variant="secondary" className="text-xs">7 Days</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<TrialContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="promo">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Percent className="size-4" />
										<span className="font-medium">Promo Code</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PromoContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="terms">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Shield className="size-4" />
										<span className="font-medium">Terms & Conditions</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<TermsContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<SubscriptionSummary plan="Yearly Plan" firstCharge="$119.99/year" nextCharge="Jan 15, 2026" />
						<SubscribeButton label="Start Free Trial" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
