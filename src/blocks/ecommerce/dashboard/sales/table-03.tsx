'use client';

import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type RegionData = {
	region: string;
	country: string;
	flag: string;
	revenue: number;
	orders: number;
	avgOrderValue: number;
	growth: number;
	targetProgress: number;
};

type RegionTableCardProps = {
	title: string;
	description: string;
	regions: RegionData[];
};

const RegionTableCard = ({
	title,
	description,
	regions,
}: RegionTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Globe className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Region</TableHead>
							<TableHead className="text-right">Revenue</TableHead>
							<TableHead className="text-right">Orders</TableHead>
							<TableHead className="text-right">AOV</TableHead>
							<TableHead className="text-right">Growth</TableHead>
							<TableHead className="w-[150px]">Target Progress</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{regions.map((region, idx) => (
							<TableRow key={idx} className="hover:bg-muted/50 transition-colors">
								<TableCell>
									<div className="flex items-center gap-3">
										<span className="text-2xl">{region.flag}</span>
										<div>
											<p className="font-medium">{region.country}</p>
											<p className="text-xs text-muted-foreground">{region.region}</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="text-right font-semibold">
									${region.revenue.toLocaleString()}
								</TableCell>
								<TableCell className="text-right">
									{region.orders.toLocaleString()}
								</TableCell>
								<TableCell className="text-right">
									${region.avgOrderValue.toFixed(0)}
								</TableCell>
								<TableCell className="text-right">
									<span
										className={region.growth >= 0 ? 'text-primary' : 'text-destructive'}
									>
										{region.growth >= 0 ? '+' : ''}
										{region.growth}%
									</span>
								</TableCell>
								<TableCell>
									<div className="space-y-1">
										<Progress value={region.targetProgress} className="h-2" />
										<span className="text-xs text-muted-foreground">
											{region.targetProgress}%
										</span>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const regions: RegionData[] = [
		{ region: 'North America', country: 'United States', flag: '🇺🇸', revenue: 425000, orders: 3200, avgOrderValue: 133, growth: 15.2, targetProgress: 92 },
		{ region: 'Europe', country: 'United Kingdom', flag: '🇬🇧', revenue: 285000, orders: 2100, avgOrderValue: 136, growth: 8.5, targetProgress: 78 },
		{ region: 'Europe', country: 'Germany', flag: '🇩🇪', revenue: 198000, orders: 1650, avgOrderValue: 120, growth: 12.3, targetProgress: 85 },
		{ region: 'Asia Pacific', country: 'Japan', flag: '🇯🇵', revenue: 156000, orders: 980, avgOrderValue: 159, growth: -2.1, targetProgress: 65 },
		{ region: 'Asia Pacific', country: 'Australia', flag: '🇦🇺', revenue: 112000, orders: 820, avgOrderValue: 137, growth: 18.7, targetProgress: 88 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<RegionTableCard
					title="Regional Performance"
					description="Sales breakdown by country and region"
					regions={regions}
				/>
			</div>
		</section>
	);
}
