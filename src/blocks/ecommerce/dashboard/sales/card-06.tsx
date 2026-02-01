'use client';

import { Globe, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type RegionData = {
	region: string;
	revenue: string;
	percentage: number;
	flag: string;
};

type RegionCardProps = {
	icon: LucideIcon;
	title: string;
	regions: RegionData[];
	totalRevenue: string;
};

const RegionCard = ({
	icon: Icon,
	title,
	regions,
	totalRevenue,
}: RegionCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Icon className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</div>
			<span className="text-sm text-muted-foreground">{totalRevenue}</span>
		</CardHeader>
		<CardContent className="space-y-4">
			{regions.map((region, idx) => (
				<div key={idx} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<span className="text-base">{region.flag}</span>
							<span className="font-medium">{region.region}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-muted-foreground">{region.revenue}</span>
							<span className="text-xs text-muted-foreground">
								({region.percentage}%)
							</span>
						</div>
					</div>
					<Progress value={region.percentage} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const regionCards: RegionCardProps[] = [
		{
			icon: Globe,
			title: 'Sales by Region',
			totalRevenue: '$142,580',
			regions: [
				{
					region: 'North America',
					revenue: '$58,420',
					percentage: 41,
					flag: '🇺🇸',
				},
				{ region: 'Europe', revenue: '$42,150', percentage: 30, flag: '🇪🇺' },
				{
					region: 'Asia Pacific',
					revenue: '$28,450',
					percentage: 20,
					flag: '🇯🇵',
				},
				{
					region: 'Latin America',
					revenue: '$13,560',
					percentage: 9,
					flag: '🇧🇷',
				},
			],
		},
		{
			icon: Globe,
			title: 'Q1 Performance',
			totalRevenue: '$98,750',
			regions: [
				{
					region: 'United States',
					revenue: '$45,200',
					percentage: 46,
					flag: '🇺🇸',
				},
				{
					region: 'United Kingdom',
					revenue: '$22,300',
					percentage: 23,
					flag: '🇬🇧',
				},
				{ region: 'Germany', revenue: '$18,500', percentage: 19, flag: '🇩🇪' },
				{ region: 'Canada', revenue: '$12,750', percentage: 12, flag: '🇨🇦' },
			],
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @md:gap-6">
					{regionCards.map((card, idx) => (
						<RegionCard key={idx} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
