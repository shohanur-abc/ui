'use client';

import { ArrowUpRight, ArrowDownRight, Smartphone, Monitor, Tablet } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type DeviceCompareProps = {
	device: string;
	icon: React.ElementType;
	sessions: string;
	sessionShare: number;
	convRate: string;
	revenue: string;
	revenueShare: number;
	growth: number;
};

const DeviceCompare = ({ device, icon: Icon, sessions, sessionShare, convRate, revenue, revenueShare, growth }: DeviceCompareProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<Icon className="size-5 text-primary" />
					</div>
					<div>
						<p className="font-bold">{device}</p>
						<p className="text-xs text-muted-foreground">{sessionShare}% of traffic</p>
					</div>
				</div>
				<Badge
					variant="outline"
					className={
						growth >= 0
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{growth >= 0 ? <ArrowUpRight className="mr-1 size-3" /> : <ArrowDownRight className="mr-1 size-3" />}
					{growth >= 0 ? '+' : ''}{growth}%
				</Badge>
			</div>
			<div className="mt-5 space-y-4">
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Sessions</span>
						<span className="font-medium">{sessions}</span>
					</div>
					<Progress value={sessionShare} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Conversion Rate</span>
						<span className="font-medium">{convRate}</span>
					</div>
					<Progress value={parseFloat(convRate) * 15} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Revenue</span>
						<span className="font-medium">{revenue}</span>
					</div>
					<Progress value={revenueShare} className="mt-1 h-1.5" />
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const devices: DeviceCompareProps[] = [
		{
			device: 'Mobile',
			icon: Smartphone,
			sessions: '285,400',
			sessionShare: 58,
			convRate: '3.2%',
			revenue: '$412,500',
			revenueShare: 42,
			growth: 18.5,
		},
		{
			device: 'Desktop',
			icon: Monitor,
			sessions: '168,200',
			sessionShare: 34,
			convRate: '5.8%',
			revenue: '$485,200',
			revenueShare: 49,
			growth: 5.2,
		},
		{
			device: 'Tablet',
			icon: Tablet,
			sessions: '42,500',
			sessionShare: 8,
			convRate: '4.1%',
			revenue: '$88,300',
			revenueShare: 9,
			growth: -2.8,
		},
	];

	const insights = [
		{ label: 'Mobile leads in traffic', value: '58% of sessions', trend: 'up' },
		{ label: 'Desktop leads in revenue', value: '49% of sales', trend: 'up' },
		{ label: 'Tablet declining', value: '-2.8% YoY', trend: 'down' },
		{ label: 'Mobile conversion gap', value: '2.6% below desktop', trend: 'warning' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Device Comparison Report
						</CardTitle>
						<CardDescription>
							Performance metrics across device types
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							{devices.map((d, i) => (
								<DeviceCompare key={i} {...d} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/20">
							<CardContent className="p-4">
								<p className="mb-3 text-sm font-medium">Key Insights</p>
								<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
									{insights.map((ins, i) => (
										<div key={i} className="flex items-center gap-2">
											<div
												className={`size-2 rounded-full ${
													ins.trend === 'up'
														? 'bg-emerald-500'
														: ins.trend === 'down'
															? 'bg-rose-500'
															: 'bg-amber-500'
												}`}
											/>
											<div>
												<p className="text-xs text-muted-foreground">{ins.label}</p>
												<p className="text-sm font-medium">{ins.value}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
