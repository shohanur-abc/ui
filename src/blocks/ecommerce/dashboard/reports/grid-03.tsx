'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	Box,
	DollarSign,
	Package,
	Percent,
	ShoppingBag,
	TrendingUp,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

type SummaryCardItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	description: string;
};

type SummaryCardProps = SummaryCardItem;

const SummaryCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	description,
}: SummaryCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardHeader className="relative flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{title}
			</CardTitle>
			<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 transition-all group-hover:bg-primary/20 group-hover:ring-primary/30">
				<Icon className="size-4 text-primary" />
			</div>
		</CardHeader>
		<CardContent className="relative">
			<div className="text-2xl font-bold tracking-tight @sm:text-3xl">
				{value}
			</div>
			<div className="mt-2 flex items-center gap-2">
				<div
					className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-4" />
					) : (
						<ArrowDownRight className="size-4" />
					)}
					{change}
				</div>
				<span className="text-xs text-muted-foreground">{description}</span>
			</div>
		</CardContent>
	</Card>
);

type HeaderProps = {
	title: string;
	period: string;
};

const ReportHeader = ({ title, period }: HeaderProps) => (
	<div className="mb-6">
		<h2 className="text-xl font-bold @sm:text-2xl">{title}</h2>
		<p className="text-sm text-muted-foreground">{period}</p>
	</div>
);

export default function Main() {
	const headerProps: HeaderProps = {
		title: 'Sales Summary Report',
		period: 'January 1 - December 31, 2025',
	};

	const summaryItems: SummaryCardItem[] = [
		{ title: 'Total Revenue', value: '$284,500', change: '+24.5%', trend: 'up', icon: DollarSign, description: 'vs last year' },
		{ title: 'Total Orders', value: '12,847', change: '+18.2%', trend: 'up', icon: ShoppingBag, description: 'vs last year' },
		{ title: 'Products Sold', value: '45,231', change: '+32.1%', trend: 'up', icon: Package, description: 'vs last year' },
		{ title: 'Average Order Value', value: '$22.15', change: '+5.3%', trend: 'up', icon: TrendingUp, description: 'vs last year' },
		{ title: 'Return Rate', value: '3.2%', change: '-1.8%', trend: 'up', icon: Box, description: 'improvement' },
		{ title: 'Profit Margin', value: '34.8%', change: '+2.1%', trend: 'up', icon: Percent, description: 'vs last year' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<ReportHeader {...headerProps} />
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @lg:gap-6">
					{summaryItems.map((item, i) => (
						<SummaryCard key={i} {...item} />
					))}
				</div>
			</div>
		</section>
	);
}
