import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	TrendingUp,
	TrendingDown,
	DollarSign,
	ShoppingCart,
	Users,
	Repeat,
} from 'lucide-react';

interface ExpandedStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: number;
	details: { label: string; value: string }[];
}

const ExpandedStat = ({
	icon: Icon,
	label,
	value,
	change,
	details,
}: ExpandedStatProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
			<div className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<div className="rounded-lg bg-primary/10 p-2">
								<Icon className="size-4 text-primary" />
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								{label}
							</span>
						</div>
						<p className="text-3xl font-bold tracking-tight">{value}</p>
					</div>
					<Badge
						variant={isPositive ? 'default' : 'destructive'}
						className="gap-1"
					>
						{isPositive ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(change)}%
					</Badge>
				</div>
			</div>
			<div className="grid grid-cols-2 divide-x divide-border border-t bg-secondary/30">
				{details.map((detail, i) => (
					<div key={i} className="p-4 text-center">
						<p className="text-xs text-muted-foreground">{detail.label}</p>
						<p className="mt-1 font-semibold">{detail.value}</p>
					</div>
				))}
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: ExpandedStatProps[] = [
		{
			icon: DollarSign,
			label: 'Revenue',
			value: '$284,847',
			change: 24.5,
			details: [
				{ label: 'This Month', value: '$98,420' },
				{ label: 'Last Month', value: '$79,012' },
			],
		},
		{
			icon: ShoppingCart,
			label: 'Orders',
			value: '12,847',
			change: 18.2,
			details: [
				{ label: 'Completed', value: '12,142' },
				{ label: 'Pending', value: '705' },
			],
		},
		{
			icon: Users,
			label: 'Customers',
			value: '48,294',
			change: 12.8,
			details: [
				{ label: 'New', value: '4,847' },
				{ label: 'Returning', value: '43,447' },
			],
		},
		{
			icon: Repeat,
			label: 'Repeat Rate',
			value: '68.4%',
			change: -2.4,
			details: [
				{ label: '2+ Orders', value: '24,847' },
				{ label: '5+ Orders', value: '8,294' },
			],
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{stats.map((stat, i) => (
						<ExpandedStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
