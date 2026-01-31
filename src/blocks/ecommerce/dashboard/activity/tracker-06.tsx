import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	DollarSign,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	ArrowDownRight,
	Target,
	Wallet,
	CreditCard,
	PiggyBank,
	type LucideIcon,
} from 'lucide-react';

interface RevenueStream {
	id: string;
	name: string;
	type: 'sales' | 'subscriptions' | 'affiliates' | 'ads' | 'services';
	current: number;
	previous: number;
	target: number;
	period: string;
}

interface RevenueTrackerProps {
	title: string;
	streams: RevenueStream[];
	stats: {
		totalRevenue: string;
		monthlyGrowth: string;
		targetProgress: number;
	};
}

const TypeConfig: Record<RevenueStream['type'], { icon: LucideIcon; className: string }> = {
	sales: { icon: CreditCard, className: 'bg-emerald-500/20 text-emerald-400' },
	subscriptions: { icon: Wallet, className: 'bg-blue-500/20 text-blue-400' },
	affiliates: { icon: ArrowUpRight, className: 'bg-purple-500/20 text-purple-400' },
	ads: { icon: Target, className: 'bg-orange-500/20 text-orange-400' },
	services: { icon: PiggyBank, className: 'bg-pink-500/20 text-pink-400' },
};

const formatCurrency = (value: number): string => {
	if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
	if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
	return `$${value}`;
};

const RevenueCard = ({ stream }: { stream: RevenueStream }) => {
	const config = TypeConfig[stream.type];
	const Icon = config.icon;
	const change = stream.previous > 0
		? ((stream.current - stream.previous) / stream.previous) * 100
		: 0;
	const isPositive = change >= 0;
	const progress = Math.min((stream.current / stream.target) * 100, 100);

	return (
		<div className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div>
							<h4 className="font-medium text-foreground capitalize">
								{stream.name}
							</h4>
							<span className="text-xs text-muted-foreground">
								{stream.period}
							</span>
						</div>
						<Badge
							variant="outline"
							className={`gap-1 text-xs ${
								isPositive
									? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
									: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
							}`}
						>
							{isPositive ? (
								<TrendingUp className="size-3" />
							) : (
								<TrendingDown className="size-3" />
							)}
							{isPositive ? '+' : ''}
							{change.toFixed(1)}%
						</Badge>
					</div>

					<div className="flex items-baseline gap-2 mb-3">
						<span className="text-2xl font-bold text-foreground">
							{formatCurrency(stream.current)}
						</span>
						<span className="text-sm text-muted-foreground">
							/ {formatCurrency(stream.target)}
						</span>
					</div>

					<div className="space-y-1.5">
						<Progress
							value={progress}
							className={`h-2 ${
								progress >= 100
									? '[&>[data-slot=indicator]]:bg-emerald-500'
									: progress >= 70
										? '[&>[data-slot=indicator]]:bg-primary'
										: '[&>[data-slot=indicator]]:bg-amber-500'
							}`}
						/>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>{progress.toFixed(0)}% of target</span>
							<span>
								vs {formatCurrency(stream.previous)} last period
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const TotalRevenue = ({
	stats,
}: {
	stats: RevenueTrackerProps['stats'];
}) => (
	<div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="flex size-14 items-center justify-center rounded-xl bg-primary/20">
					<DollarSign className="size-7 text-primary" />
				</div>
				<div>
					<span className="text-sm text-muted-foreground block">
						Total Revenue
					</span>
					<span className="text-3xl font-bold text-foreground">
						{stats.totalRevenue}
					</span>
				</div>
			</div>
			<div className="text-right">
				<Badge
					variant="outline"
					className={`gap-1 mb-1 ${
						stats.monthlyGrowth.startsWith('+')
							? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
							: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
					}`}
				>
					{stats.monthlyGrowth.startsWith('+') ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{stats.monthlyGrowth}
				</Badge>
				<span className="text-xs text-muted-foreground block">
					vs last month
				</span>
			</div>
		</div>
		<div className="mt-4">
			<div className="flex items-center justify-between text-sm mb-2">
				<span className="text-muted-foreground">Target Progress</span>
				<span className="font-medium text-foreground">
					{stats.targetProgress}%
				</span>
			</div>
			<Progress value={stats.targetProgress} className="h-2" />
		</div>
	</div>
);

const RevenueTracker = ({ title, streams, stats }: RevenueTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<DollarSign className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View Report
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<TotalRevenue stats={stats} />
			<ScrollArea className="h-[330px]">
				<div className="space-y-3 pr-4">
					{streams.map((stream) => (
						<RevenueCard key={stream.id} stream={stream} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const streams: RevenueStream[] = [
		{
			id: '1',
			name: 'Product Sales',
			type: 'sales',
			current: 78500,
			previous: 65200,
			target: 100000,
			period: 'This Month',
		},
		{
			id: '2',
			name: 'Subscriptions',
			type: 'subscriptions',
			current: 24800,
			previous: 22100,
			target: 30000,
			period: 'This Month',
		},
		{
			id: '3',
			name: 'Affiliate Revenue',
			type: 'affiliates',
			current: 8900,
			previous: 9500,
			target: 15000,
			period: 'This Month',
		},
		{
			id: '4',
			name: 'Advertising',
			type: 'ads',
			current: 3200,
			previous: 2800,
			target: 5000,
			period: 'This Month',
		},
		{
			id: '5',
			name: 'Professional Services',
			type: 'services',
			current: 12400,
			previous: 10000,
			target: 15000,
			period: 'This Month',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<RevenueTracker
					title="Revenue Tracker"
					streams={streams}
					stats={{
						totalRevenue: '$127.8K',
						monthlyGrowth: '+16.2%',
						targetProgress: 77,
					}}
				/>
			</div>
		</section>
	);
}
