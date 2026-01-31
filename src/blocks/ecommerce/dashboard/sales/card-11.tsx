'use client';

import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ChannelData = {
	name: string;
	revenue: string;
	orders: number;
	change: number;
	color: string;
};

type ChannelCardProps = {
	title: string;
	channels: ChannelData[];
};

const ChannelCard = ({ title, channels }: ChannelCardProps) => {
	const maxRevenue = Math.max(
		...channels.map((c) => Number.parseFloat(c.revenue.replace(/[$,]/g, ''))),
	);

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-4">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<BarChart2 className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{channels.map((channel, idx) => {
					const isPositive = channel.change >= 0;
					const barWidth =
						(Number.parseFloat(channel.revenue.replace(/[$,]/g, '')) /
							maxRevenue) *
						100;

					return (
						<div key={idx} className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div
										className="size-3 rounded-full"
										style={{ backgroundColor: channel.color }}
									/>
									<span className="font-medium">{channel.name}</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="font-semibold">{channel.revenue}</span>
									<div
										className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
									>
										{isPositive ? (
											<TrendingUp className="size-3" />
										) : (
											<TrendingDown className="size-3" />
										)}
										{Math.abs(channel.change)}%
									</div>
								</div>
							</div>
							<div className="h-2 bg-muted rounded-full overflow-hidden">
								<div
									className="h-full rounded-full transition-all duration-500"
									style={{
										width: `${barWidth}%`,
										backgroundColor: channel.color,
									}}
								/>
							</div>
							<p className="text-xs text-muted-foreground">
								{channel.orders.toLocaleString()} orders
							</p>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const channels: ChannelData[] = [
		{
			name: 'Website',
			revenue: '$85,420',
			orders: 3247,
			change: 18.5,
			color: 'oklch(0.70 0.18 155)',
		},
		{
			name: 'Mobile App',
			revenue: '$42,150',
			orders: 1856,
			change: 24.2,
			color: 'oklch(0.65 0.16 175)',
		},
		{
			name: 'Marketplace',
			revenue: '$28,340',
			orders: 1124,
			change: -5.8,
			color: 'oklch(0.62 0.14 200)',
		},
		{
			name: 'Social Commerce',
			revenue: '$15,890',
			orders: 687,
			change: 42.1,
			color: 'oklch(0.68 0.15 130)',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<ChannelCard title="Sales by Channel" channels={channels} />
				</div>
			</div>
		</section>
	);
}
