import {
	ArrowUpRight,
	CheckCircle2,
	DollarSign,
	Package,
	ShoppingCart,
	Target,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type GoalItem = {
	title: string;
	description: string;
	current: number;
	target: number;
	unit: string;
	icon: LucideIcon;
	color: string;
};

const GoalCard = ({ title, description, current, target, unit, icon: Icon, color }: GoalItem) => {
	const percentage = Math.min((current / target) * 100, 100);
	const isComplete = current >= target;

	return (
		<Card>
			<CardContent className="p-5">
				<div className="flex items-start justify-between">
					<div className={`rounded-lg p-2.5 ${color}`}>
						<Icon className="size-5" />
					</div>
					{isComplete ? (
						<CheckCircle2 className="size-5 text-emerald-500" />
					) : (
						<span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
					)}
				</div>
				<div className="mt-4">
					<h3 className="font-semibold">{title}</h3>
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				</div>
				<div className="mt-4">
					<Progress value={percentage} className="h-2" />
					<div className="mt-2 flex items-center justify-between text-sm">
						<span className="font-medium">{current.toLocaleString()} {unit}</span>
						<span className="text-muted-foreground">of {target.toLocaleString()}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const goals: GoalItem[] = [
		{ title: 'Revenue Target', description: 'Monthly revenue goal', current: 248632, target: 300000, unit: '$', icon: DollarSign, color: 'bg-primary/10 text-primary' },
		{ title: 'Orders Target', description: 'Monthly orders goal', current: 6842, target: 8000, unit: 'orders', icon: ShoppingCart, color: 'bg-emerald-500/10 text-emerald-500' },
		{ title: 'New Customers', description: 'Monthly acquisition', current: 234, target: 200, unit: 'customers', icon: Users, color: 'bg-blue-500/10 text-blue-500' },
		{ title: 'Product Launches', description: 'Quarterly launches', current: 8, target: 12, unit: 'products', icon: Package, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Conversion Rate', description: 'Target rate', current: 3.2, target: 4.0, unit: '%', icon: Target, color: 'bg-purple-500/10 text-purple-500' },
		{ title: 'Avg Order Value', description: 'Monthly target', current: 36, target: 40, unit: '$', icon: TrendingUp, color: 'bg-pink-500/10 text-pink-500' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
					{goals.map((goal, i) => (
						<GoalCard key={i} {...goal} />
					))}
				</div>
			</div>
		</section>
	);
}
