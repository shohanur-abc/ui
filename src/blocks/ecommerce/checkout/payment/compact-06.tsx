'use client';

import { CreditCard, Lock, RefreshCcw, Star, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const SubscriptionHeader = ({ plan, price, interval }: { plan: string; price: string; interval: string }) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<RefreshCcw className="size-4 text-primary" />
			<span className="font-medium">{plan}</span>
		</div>
		<div className="text-right">
			<span className="font-bold">{price}</span>
			<span className="text-xs text-muted-foreground">/{interval}</span>
		</div>
	</div>
);

const CompactCardForm = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const SubscriptionFeatures = ({ features }: { features: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{features.map((feature, index) => (
			<Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
		))}
	</div>
);

const TrialNotice = () => (
	<div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20 text-xs">
		<Star className="size-3.5 text-primary shrink-0" />
		<span>7-day free trial included. Cancel anytime.</span>
	</div>
);

const TermsCheckbox = () => (
	<div className="flex items-start gap-2">
		<Checkbox id="terms" className="size-3.5 mt-0.5" />
		<Label htmlFor="terms" className="text-[11px] text-muted-foreground cursor-pointer leading-tight">
			I agree to recurring billing
		</Label>
	</div>
);

export default function Main() {
	const features = ['Unlimited access', 'Priority support', 'No ads'];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<SubscriptionHeader plan="Pro Plan" price="$9.99" interval="mo" />
						<SubscriptionFeatures features={features} />
						<Separator />
						<CompactCardForm />
						<TrialNotice />
						<TermsCheckbox />
						<Button className="w-full h-9 text-sm gap-2">
							<Zap className="size-3.5" />
							Start Free Trial
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
