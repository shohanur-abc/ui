'use client';

import { Clock, CreditCard, Lock, Shield, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface InstallmentOption {
	id: string;
	count: number;
	amount: string;
	fee: string;
}

const InstallmentSelector = ({ options, selected }: { options: InstallmentOption[]; selected: string }) => (
	<RadioGroup defaultValue={selected} className="grid grid-cols-3 gap-2">
		{options.map((option) => (
			<Label
				key={option.id}
				htmlFor={option.id}
				className="flex flex-col items-center p-2 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={option.id} id={option.id} className="sr-only" />
				<span className="font-bold">{option.count}x</span>
				<span className="text-xs">{option.amount}</span>
				<span className="text-[10px] text-muted-foreground">{option.fee}</span>
			</Label>
		))}
	</RadioGroup>
);

const CardInputCompact = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="4242 4242 4242 4242" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const PaymentSchedule = ({ firstPayment, nextDate }: { firstPayment: string; nextDate: string }) => (
	<div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 text-xs">
		<div className="flex items-center gap-1.5">
			<Clock className="size-3 text-muted-foreground" />
			<span className="text-muted-foreground">First payment:</span>
			<span className="font-medium">{firstPayment}</span>
		</div>
		<span className="text-muted-foreground">Next: {nextDate}</span>
	</div>
);

const TotalDisplay = ({ monthly, total }: { monthly: string; total: string }) => (
	<div className="flex items-center justify-between">
		<div>
			<span className="text-xs text-muted-foreground">Today</span>
			<p className="font-semibold">{monthly}</p>
		</div>
		<div className="text-right">
			<span className="text-xs text-muted-foreground">Total</span>
			<p className="font-semibold">{total}</p>
		</div>
	</div>
);

export default function Main() {
	const installments: InstallmentOption[] = [
		{ id: '2', count: 2, amount: '$100', fee: '0% fee' },
		{ id: '4', count: 4, amount: '$50', fee: '0% fee' },
		{ id: '6', count: 6, amount: '$35', fee: '5% fee' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">Pay in Installments</span>
							<Badge variant="outline" className="text-xs gap-1">
								<Zap className="size-2.5" />
								0% APR
							</Badge>
						</div>
						<InstallmentSelector options={installments} selected="4" />
						<Separator />
						<CardInputCompact />
						<PaymentSchedule firstPayment="$50.00" nextDate="Feb 15" />
						<TotalDisplay monthly="$50.00" total="$200.00" />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Start Payments
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
