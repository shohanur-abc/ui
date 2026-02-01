import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Percent,
	DollarSign,
	ShoppingCart,
	TrendingUp,
	Calculator,
} from 'lucide-react';

interface MarginStatProps {
	category: string;
	revenue: string;
	cost: string;
	margin: number;
	trend: string;
	positive: boolean;
}

const MarginRow = ({
	category,
	revenue,
	cost,
	margin,
	trend,
	positive,
}: MarginStatProps) => (
	<div className="flex items-center gap-4 py-4">
		<div className="flex-1">
			<p className="font-medium">{category}</p>
			<p className="text-xs text-muted-foreground">{revenue} revenue</p>
		</div>
		<div className="text-center">
			<p className="text-sm font-semibold">{cost}</p>
			<p className="text-xs text-muted-foreground">COGS</p>
		</div>
		<div className="text-center">
			<p
				className={`text-lg font-bold ${margin >= 30 ? 'text-accent' : margin >= 20 ? 'text-primary' : 'text-destructive'}`}
			>
				{margin}%
			</p>
			<p className="text-xs text-muted-foreground">Margin</p>
		</div>
		<Badge variant={positive ? 'default' : 'destructive'}>{trend}</Badge>
	</div>
);

export default function Main() {
	const summaryStats = [
		{ icon: DollarSign, label: 'Gross Revenue', value: '$2.4M' },
		{ icon: Calculator, label: 'Total COGS', value: '$1.4M' },
		{ icon: Percent, label: 'Gross Margin', value: '42%' },
		{ icon: TrendingUp, label: 'Net Margin', value: '18%' },
	];

	const categories: MarginStatProps[] = [
		{
			category: 'Electronics',
			revenue: '$847K',
			cost: '$524K',
			margin: 38,
			trend: '+2%',
			positive: true,
		},
		{
			category: 'Apparel',
			revenue: '$624K',
			cost: '$312K',
			margin: 50,
			trend: '+4%',
			positive: true,
		},
		{
			category: 'Home & Garden',
			revenue: '$428K',
			cost: '$284K',
			margin: 34,
			trend: '-1%',
			positive: false,
		},
		{
			category: 'Beauty',
			revenue: '$348K',
			cost: '$174K',
			margin: 50,
			trend: '+3%',
			positive: true,
		},
		{
			category: 'Sports',
			revenue: '$152K',
			cost: '$106K',
			margin: 30,
			trend: '+1%',
			positive: true,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6 grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{summaryStats.map((stat, i) => (
						<Card key={i} className="flex items-center gap-4 p-4">
							<div className="rounded-lg bg-primary/10 p-2">
								<stat.icon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xl font-bold">{stat.value}</p>
								<p className="text-xs text-muted-foreground">{stat.label}</p>
							</div>
						</Card>
					))}
				</div>
				<Card className="p-5">
					<h3 className="font-semibold">Margin by Category</h3>
					<Separator className="my-4" />
					<div className="divide-y">
						{categories.map((cat, i) => (
							<MarginRow key={i} {...cat} />
						))}
					</div>
				</Card>
			</div>
		</section>
	);
}
