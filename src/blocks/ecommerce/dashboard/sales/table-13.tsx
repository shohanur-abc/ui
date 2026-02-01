'use client';

import {
	MousePointer,
	Eye,
	ShoppingCart,
	CreditCard,
	TrendingUp,
} from 'lucide-react';
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

type ConversionData = {
	source: string;
	icon: string;
	visitors: number;
	views: number;
	addToCart: number;
	checkouts: number;
	purchases: number;
	conversionRate: number;
	revenue: number;
};

type ConversionTableCardProps = {
	title: string;
	description: string;
	sources: ConversionData[];
};

const ConversionTableCard = ({
	title,
	description,
	sources,
}: ConversionTableCardProps) => {
	const maxVisitors = Math.max(...sources.map((s) => s.visitors));

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<MousePointer className="size-4" />
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
								<TableHead>Source</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										<Eye className="size-3" />
										Visitors
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										<ShoppingCart className="size-3" />
										Add to Cart
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										<CreditCard className="size-3" />
										Purchases
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										<TrendingUp className="size-3" />
										Conv. Rate
									</div>
								</TableHead>
								<TableHead className="text-right">Revenue</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sources.map((source, idx) => (
								<TableRow
									key={idx}
									className="hover:bg-muted/50 transition-colors"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<span className="text-xl">{source.icon}</span>
											<span className="font-medium">{source.source}</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="space-y-1">
											<span className="font-medium">
												{source.visitors.toLocaleString()}
											</span>
											<Progress
												value={(source.visitors / maxVisitors) * 100}
												className="h-1.5 w-20"
											/>
										</div>
									</TableCell>
									<TableCell>
										<div className="space-y-0.5">
											<span className="font-medium">
												{source.addToCart.toLocaleString()}
											</span>
											<p className="text-xs text-muted-foreground">
												{((source.addToCart / source.visitors) * 100).toFixed(
													1,
												)}
												%
											</p>
										</div>
									</TableCell>
									<TableCell>
										<div className="space-y-0.5">
											<span className="font-medium">
												{source.purchases.toLocaleString()}
											</span>
											<p className="text-xs text-muted-foreground">
												{((source.purchases / source.addToCart) * 100).toFixed(
													1,
												)}
												% cart conv.
											</p>
										</div>
									</TableCell>
									<TableCell>
										<span
											className={`font-semibold ${
												source.conversionRate >= 4
													? 'text-primary'
													: source.conversionRate >= 2
														? 'text-amber-500'
														: 'text-muted-foreground'
											}`}
										>
											{source.conversionRate}%
										</span>
									</TableCell>
									<TableCell className="text-right font-semibold">
										${source.revenue.toLocaleString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const sources: ConversionData[] = [
		{
			source: 'Google Search',
			icon: '🔍',
			visitors: 45000,
			views: 125000,
			addToCart: 4500,
			checkouts: 2800,
			purchases: 1850,
			conversionRate: 4.1,
			revenue: 185000,
		},
		{
			source: 'Direct Traffic',
			icon: '🔗',
			visitors: 28000,
			views: 85000,
			addToCart: 3200,
			checkouts: 2100,
			purchases: 1400,
			conversionRate: 5.0,
			revenue: 142000,
		},
		{
			source: 'Facebook Ads',
			icon: '📘',
			visitors: 22000,
			views: 58000,
			addToCart: 2640,
			checkouts: 1540,
			purchases: 880,
			conversionRate: 4.0,
			revenue: 88000,
		},
		{
			source: 'Email Campaign',
			icon: '📧',
			visitors: 15000,
			views: 42000,
			addToCart: 2100,
			checkouts: 1680,
			purchases: 1200,
			conversionRate: 8.0,
			revenue: 120000,
		},
		{
			source: 'Instagram',
			icon: '📸',
			visitors: 18000,
			views: 52000,
			addToCart: 1620,
			checkouts: 900,
			purchases: 540,
			conversionRate: 3.0,
			revenue: 54000,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ConversionTableCard
					title="Conversion Funnel by Source"
					description="Traffic source performance analysis"
					sources={sources}
				/>
			</div>
		</section>
	);
}
