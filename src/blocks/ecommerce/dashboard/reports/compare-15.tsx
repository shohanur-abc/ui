'use client';

import { ArrowUpRight, ArrowDownRight, Users, ShoppingCart, CreditCard, RotateCcw } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CohortProps = {
	cohort: string;
	period: string;
	users: string;
	retention30: number;
	retention60: number;
	retention90: number;
	ltv: string;
	arpu: string;
};

const CohortRow = ({ cohort, period, users, retention30, retention60, retention90, ltv, arpu }: CohortProps) => (
	<div className="grid grid-cols-7 items-center gap-4 border-b border-border/30 py-4 last:border-0">
		<div>
			<p className="font-medium">{cohort}</p>
			<p className="text-xs text-muted-foreground">{period}</p>
		</div>
		<div className="text-center">
			<p className="font-medium">{users}</p>
		</div>
		<div>
			<div className="flex items-center justify-between text-xs">
				<span>{retention30}%</span>
			</div>
			<Progress value={retention30} className="mt-1 h-1.5" />
		</div>
		<div>
			<div className="flex items-center justify-between text-xs">
				<span>{retention60}%</span>
			</div>
			<Progress value={retention60} className="mt-1 h-1.5" />
		</div>
		<div>
			<div className="flex items-center justify-between text-xs">
				<span>{retention90}%</span>
			</div>
			<Progress value={retention90} className="mt-1 h-1.5" />
		</div>
		<div className="text-center font-medium">{ltv}</div>
		<div className="text-center font-medium">{arpu}</div>
	</div>
);

type SummaryCardProps = {
	title: string;
	value: string;
	change: number;
	icon: React.ElementType;
};

const SummaryCard = ({ title, value, change, icon: Icon }: SummaryCardProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<Badge
					variant="outline"
					className={
						change >= 0
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{change >= 0 ? <ArrowUpRight className="mr-1 size-3" /> : <ArrowDownRight className="mr-1 size-3" />}
					{change >= 0 ? '+' : ''}{change}%
				</Badge>
			</div>
			<p className="mt-3 text-2xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{title}</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const summaryCards: SummaryCardProps[] = [
		{ title: 'Avg Retention (90d)', value: '38%', change: 5.2, icon: Users },
		{ title: 'Avg LTV', value: '$485', change: 12.4, icon: ShoppingCart },
		{ title: 'Avg ARPU', value: '$142', change: 8.1, icon: CreditCard },
		{ title: 'Repeat Purchase Rate', value: '32%', change: 3.8, icon: RotateCcw },
	];

	const cohorts: CohortProps[] = [
		{ cohort: 'Q4 2024', period: 'Oct-Dec', users: '4,580', retention30: 72, retention60: 52, retention90: 42, ltv: '$520', arpu: '$155' },
		{ cohort: 'Q3 2024', period: 'Jul-Sep', users: '4,120', retention30: 68, retention60: 48, retention90: 38, ltv: '$485', arpu: '$142' },
		{ cohort: 'Q2 2024', period: 'Apr-Jun', users: '3,850', retention30: 65, retention60: 45, retention90: 35, ltv: '$458', arpu: '$135' },
		{ cohort: 'Q1 2024', period: 'Jan-Mar', users: '3,420', retention30: 62, retention60: 42, retention90: 32, ltv: '$420', arpu: '$128' },
		{ cohort: 'Q4 2023', period: 'Oct-Dec', users: '3,180', retention30: 60, retention60: 40, retention90: 30, ltv: '$395', arpu: '$122' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Cohort Comparison Report
						</CardTitle>
						<CardDescription>
							Retention and lifetime value analysis by acquisition cohort
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaryCards.map((c, i) => (
								<SummaryCard key={i} {...c} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="overflow-x-auto">
									<div className="min-w-[700px]">
										<div className="mb-2 grid grid-cols-7 gap-4 border-b border-border/50 pb-2 text-xs font-medium text-muted-foreground">
											<div>Cohort</div>
											<div className="text-center">Users</div>
											<div>30d Ret.</div>
											<div>60d Ret.</div>
											<div>90d Ret.</div>
											<div className="text-center">LTV</div>
											<div className="text-center">ARPU</div>
										</div>
										{cohorts.map((c, i) => (
											<CohortRow key={i} {...c} />
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
