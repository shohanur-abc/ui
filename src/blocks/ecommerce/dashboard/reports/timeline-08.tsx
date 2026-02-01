'use client';

import { TrendingUp, TrendingDown, DollarSign, Zap, Users } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type CampaignPhase = {
	id: string;
	name: string;
	period: string;
	status: 'completed' | 'active' | 'upcoming';
	metrics: {
		spend: string;
		impressions: string;
		clicks: string;
		conversions: string;
		roas: number;
	};
};

type PhaseCardProps = {
	phase: CampaignPhase;
};

const PhaseCard = ({ phase }: PhaseCardProps) => {
	const statusConfig = {
		completed: 'border-muted bg-muted/20',
		active: 'border-primary/50 bg-primary/5',
		upcoming: 'border-dashed border-border/50 bg-muted/10',
	};

	return (
		<Card className={`${statusConfig[phase.status]}`}>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-semibold">{phase.name}</p>
						<p className="text-sm text-muted-foreground">{phase.period}</p>
					</div>
					<Badge
						variant={phase.status === 'active' ? 'default' : 'outline'}
						className={
							phase.status === 'active'
								? 'bg-primary text-primary-foreground'
								: ''
						}
					>
						{phase.status === 'active' && (
							<span className="mr-1 inline-flex size-2 animate-pulse rounded-full bg-current" />
						)}
						{phase.status}
					</Badge>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-4 @sm:grid-cols-5">
					<div>
						<p className="text-xs text-muted-foreground">Spend</p>
						<p className="text-sm font-medium">{phase.metrics.spend}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Impressions</p>
						<p className="text-sm font-medium">{phase.metrics.impressions}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Clicks</p>
						<p className="text-sm font-medium">{phase.metrics.clicks}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Conversions</p>
						<p className="text-sm font-medium">{phase.metrics.conversions}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">ROAS</p>
						<div className="flex items-center gap-1">
							<p className="text-sm font-medium">{phase.metrics.roas}x</p>
							{phase.metrics.roas >= 3 ? (
								<TrendingUp className="size-3 text-emerald-500" />
							) : (
								<TrendingDown className="size-3 text-rose-500" />
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const phases: CampaignPhase[] = [
		{
			id: '1',
			name: 'Phase 1: Launch',
			period: 'Jan 1 - Jan 31, 2024',
			status: 'completed',
			metrics: {
				spend: '$25,000',
				impressions: '2.5M',
				clicks: '85K',
				conversions: '2,450',
				roas: 4.2,
			},
		},
		{
			id: '2',
			name: 'Phase 2: Scale',
			period: 'Feb 1 - Mar 31, 2024',
			status: 'completed',
			metrics: {
				spend: '$45,000',
				impressions: '5.8M',
				clicks: '180K',
				conversions: '5,120',
				roas: 3.8,
			},
		},
		{
			id: '3',
			name: 'Phase 3: Optimization',
			period: 'Apr 1 - Jun 30, 2024',
			status: 'completed',
			metrics: {
				spend: '$52,000',
				impressions: '7.2M',
				clicks: '245K',
				conversions: '7,850',
				roas: 4.5,
			},
		},
		{
			id: '4',
			name: 'Phase 4: Summer Push',
			period: 'Jul 1 - Sep 30, 2024',
			status: 'active',
			metrics: {
				spend: '$38,500',
				impressions: '4.8M',
				clicks: '156K',
				conversions: '4,280',
				roas: 3.9,
			},
		},
		{
			id: '5',
			name: 'Phase 5: Holiday Prep',
			period: 'Oct 1 - Nov 15, 2024',
			status: 'upcoming',
			metrics: {
				spend: '$0',
				impressions: '—',
				clicks: '—',
				conversions: '—',
				roas: 0,
			},
		},
		{
			id: '6',
			name: 'Phase 6: Holiday Blitz',
			period: 'Nov 16 - Dec 31, 2024',
			status: 'upcoming',
			metrics: {
				spend: '$0',
				impressions: '—',
				clicks: '—',
				conversions: '—',
				roas: 0,
			},
		},
	];

	const totals = [
		{ icon: DollarSign, label: 'Total Spend', value: '$160,500' },
		{ icon: Users, label: 'Total Reach', value: '20.3M' },
		{ icon: Zap, label: 'Total Conversions', value: '19,700' },
		{ icon: TrendingUp, label: 'Avg ROAS', value: '4.1x' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Zap className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Campaign Phase Timeline
								</CardTitle>
								<CardDescription>
									Marketing campaign phases and performance
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{totals.map((t, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="flex items-center gap-3 p-4">
										<div className="rounded-lg bg-primary/10 p-2">
											<t.icon className="size-5 text-primary" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">{t.label}</p>
											<p className="text-xl font-bold">{t.value}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="space-y-4">
							{phases.map((p) => (
								<PhaseCard key={p.id} phase={p} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
