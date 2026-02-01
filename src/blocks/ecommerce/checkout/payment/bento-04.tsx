'use client';

import {
	Calendar,
	Check,
	Clock,
	CreditCard,
	Lock,
	RefreshCcw,
	Shield,
	Star,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface InstallmentPlan {
	id: string;
	months: number;
	monthly: string;
	fee: string;
	recommended?: boolean;
}

const InstallmentPlansCell = ({
	plans,
	selected,
}: {
	plans: InstallmentPlan[];
	selected: string;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-primary" />
				<span className="font-semibold text-sm">Pay in Installments</span>
			</div>
		</CardHeader>
		<CardContent>
			<RadioGroup defaultValue={selected} className="space-y-2">
				{plans.map((plan) => (
					<Label
						key={plan.id}
						htmlFor={plan.id}
						className={`relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${plan.recommended ? 'ring-1 ring-primary/30' : ''}`}
					>
						{plan.recommended && (
							<Badge className="absolute -top-2 right-2 text-[10px]">
								Best
							</Badge>
						)}
						<RadioGroupItem value={plan.id} id={plan.id} />
						<div className="flex-1">
							<span className="font-medium">
								{plan.months}x {plan.monthly}
							</span>
							<p className="text-xs text-muted-foreground">{plan.fee}</p>
						</div>
					</Label>
				))}
			</RadioGroup>
		</CardContent>
	</Card>
);

const AprBadgeCell = () => (
	<Card className="border-border/50 bg-primary/5 border-primary/20 backdrop-blur-sm">
		<CardContent className="p-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Zap className="size-5 text-primary" />
				<div>
					<span className="font-bold text-2xl">0%</span>
					<p className="text-xs text-muted-foreground">APR on eligible plans</p>
				</div>
			</div>
			<Badge variant="outline">No credit check</Badge>
		</CardContent>
	</Card>
);

const SchedulePreviewCell = ({
	payments,
}: {
	payments: { date: string; amount: string; status: 'first' | 'upcoming' }[];
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Calendar className="size-4 text-primary" />
				<span className="font-semibold text-sm">Schedule</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{payments.map((payment, index) => (
				<div key={index} className="flex items-center justify-between text-sm">
					<div className="flex items-center gap-2">
						<div
							className={`size-5 rounded-full flex items-center justify-center text-[10px] ${
								payment.status === 'first'
									? 'bg-primary text-primary-foreground'
									: 'bg-muted'
							}`}
						>
							{index + 1}
						</div>
						<span className="text-muted-foreground">{payment.date}</span>
					</div>
					<span className="font-medium">{payment.amount}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const CardFormCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-primary" />
				<span className="font-semibold text-sm">Card Details</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-2 relative">
					<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="Card number" className="h-10 pl-9" />
				</div>
				<Input placeholder="MM/YY" className="h-10" />
				<Input placeholder="CVV" type="password" className="h-10" />
			</div>
		</CardContent>
	</Card>
);

const CheckoutCell = ({
	firstPayment,
	total,
}: {
	firstPayment: string;
	total: string;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardContent className="p-4 flex items-center justify-between gap-4">
			<div className="flex items-center gap-6">
				<div>
					<span className="text-sm text-muted-foreground">Today</span>
					<p className="text-xl font-bold">{firstPayment}</p>
				</div>
				<Separator orientation="vertical" className="h-10" />
				<div>
					<span className="text-sm text-muted-foreground">Total</span>
					<p className="text-lg font-medium">{total}</p>
				</div>
			</div>
			<Button className="gap-2">
				<Lock className="size-4" />
				Start Plan
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const plans: InstallmentPlan[] = [
		{ id: '3', months: 3, monthly: '$100.00', fee: '0% fee' },
		{ id: '6', months: 6, monthly: '$50.00', fee: '0% fee', recommended: true },
		{ id: '12', months: 12, monthly: '$28.00', fee: '5% fee' },
	];

	const payments = [
		{ date: 'Today', amount: '$50.00', status: 'first' as const },
		{ date: 'Feb 15', amount: '$50.00', status: 'upcoming' as const },
		{ date: 'Mar 15', amount: '$50.00', status: 'upcoming' as const },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 gap-4">
					<InstallmentPlansCell plans={plans} selected="6" />
					<AprBadgeCell />
					<SchedulePreviewCell payments={payments} />
					<CardFormCell />
					<CheckoutCell firstPayment="$50.00" total="$300.00" />
				</div>
			</div>
		</section>
	);
}
