'use client';

import {
	DollarSign,
	ShoppingCart,
	Users,
	CreditCard,
	type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type GoalCardProps = {
	icon: LucideIcon;
	title: string;
	current: string;
	target: string;
	progress: number;
	period: string;
};

const GoalCard = ({
	icon: Icon,
	title,
	current,
	target,
	progress,
	period,
}: GoalCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
					<Icon className="size-5" />
				</div>
				<span className="text-xs text-muted-foreground">{period}</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				<div className="flex items-baseline gap-2 mt-1">
					<span className="text-2xl @sm:text-3xl font-bold">{current}</span>
					<span className="text-sm text-muted-foreground">/ {target}</span>
				</div>
			</div>
			<div className="space-y-2">
				<Progress value={progress} className="h-2" />
				<p className="text-xs text-muted-foreground text-right">
					{progress}% of goal
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const goals: GoalCardProps[] = [
		{
			icon: DollarSign,
			title: 'Monthly Revenue',
			current: '$42,500',
			target: '$50,000',
			progress: 85,
			period: 'This Month',
		},
		{
			icon: ShoppingCart,
			title: 'Orders Target',
			current: '1,847',
			target: '2,000',
			progress: 92,
			period: 'This Month',
		},
		{
			icon: Users,
			title: 'New Customers',
			current: '342',
			target: '500',
			progress: 68,
			period: 'This Month',
		},
		{
			icon: CreditCard,
			title: 'Avg Order Value',
			current: '$89',
			target: '$100',
			progress: 89,
			period: 'This Month',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
					{goals.map((goal, idx) => (
						<GoalCard key={idx} {...goal} />
					))}
				</div>
			</div>
		</section>
	);
}
