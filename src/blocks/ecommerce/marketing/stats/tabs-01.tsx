import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TabStatProps {
	value: string;
	label: string;
	change: number;
	details: string;
}

interface TabContentProps {
	period: string;
	stats: TabStatProps[];
}

const StatCard = ({ value, label, change, details }: TabStatProps) => {
	const isPositive = change >= 0;

	return (
		<Card className="p-5 transition-all duration-300 hover:shadow-md">
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold tracking-tight">{value}</p>
				</div>
				<Badge variant={isPositive ? 'default' : 'destructive'} className="gap-1">
					{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{Math.abs(change)}%
				</Badge>
			</div>
			<p className="mt-3 text-xs text-muted-foreground">{details}</p>
		</Card>
	);
};

export default function Main() {
	const tabData: TabContentProps[] = [
		{
			period: 'today',
			stats: [
				{ value: '$48,294', label: 'Revenue', change: 12.4, details: 'vs yesterday' },
				{ value: '847', label: 'Orders', change: 8.2, details: 'vs yesterday' },
				{ value: '2,847', label: 'Visitors', change: -4.2, details: 'vs yesterday' },
				{ value: '3.2%', label: 'Conversion', change: 0.4, details: 'vs yesterday' },
			],
		},
		{
			period: 'week',
			stats: [
				{ value: '$284,847', label: 'Revenue', change: 18.7, details: 'vs last week' },
				{ value: '4,847', label: 'Orders', change: 14.2, details: 'vs last week' },
				{ value: '18,294', label: 'Visitors', change: 8.4, details: 'vs last week' },
				{ value: '3.4%', label: 'Conversion', change: 0.8, details: 'vs last week' },
			],
		},
		{
			period: 'month',
			stats: [
				{ value: '$1.2M', label: 'Revenue', change: 24.5, details: 'vs last month' },
				{ value: '18,294', label: 'Orders', change: 18.2, details: 'vs last month' },
				{ value: '84,294', label: 'Visitors', change: 12.8, details: 'vs last month' },
				{ value: '3.8%', label: 'Conversion', change: 1.2, details: 'vs last month' },
			],
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Tabs defaultValue="today" className="space-y-6">
					<TabsList>
						<TabsTrigger value="today">Today</TabsTrigger>
						<TabsTrigger value="week">This Week</TabsTrigger>
						<TabsTrigger value="month">This Month</TabsTrigger>
					</TabsList>
					{tabData.map((tab) => (
						<TabsContent key={tab.period} value={tab.period}>
							<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
								{tab.stats.map((stat, i) => (
									<StatCard key={i} {...stat} />
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
