import {
	ArrowDownRight,
	ArrowUpRight,
	Coins,
	PiggyBank,
	Receipt,
	Wallet2,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	color: string;
};

type KpiGroup = {
	label: string;
	items: KpiItem[];
};

const KpiCardInline = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	color,
}: KpiItem) => (
	<div className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/30 @sm:p-5">
		<div
			className={`shrink-0 rounded-xl p-3 ${color} transition-transform group-hover:scale-105`}
		>
			<Icon className="size-5" />
		</div>
		<div className="min-w-0 flex-1">
			<p className="truncate text-sm text-muted-foreground">{title}</p>
			<p className="text-xl font-bold tracking-tight @sm:text-2xl">{value}</p>
		</div>
		<div
			className={`flex shrink-0 items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
		>
			{trend === 'up' ? (
				<ArrowUpRight className="size-4" />
			) : (
				<ArrowDownRight className="size-4" />
			)}
			{change}
		</div>
	</div>
);

export default function Main() {
	const groups: KpiGroup[] = [
		{
			label: 'Revenue Metrics',
			items: [
				{
					title: 'Total Revenue',
					value: '$567,890',
					change: '+23.5%',
					trend: 'up',
					icon: Wallet2,
					color: 'bg-primary/20 text-primary',
				},
				{
					title: 'Net Income',
					value: '$145,230',
					change: '+18.2%',
					trend: 'up',
					icon: Coins,
					color: 'bg-emerald-500/20 text-emerald-500',
				},
			],
		},
		{
			label: 'Cost Metrics',
			items: [
				{
					title: 'Total Expenses',
					value: '$234,560',
					change: '+8.4%',
					trend: 'down',
					icon: Receipt,
					color: 'bg-amber-500/20 text-amber-500',
				},
				{
					title: 'Savings',
					value: '$78,100',
					change: '+15.6%',
					trend: 'up',
					icon: PiggyBank,
					color: 'bg-violet-500/20 text-violet-500',
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-2">
					{groups.map((group, i) => (
						<Card key={i} className="overflow-hidden">
							<CardContent className="p-0">
								<div className="border-b bg-muted/30 px-5 py-3">
									<p className="text-sm font-medium text-muted-foreground">
										{group.label}
									</p>
								</div>
								<div className="divide-y">
									{group.items.map((item, j) => (
										<KpiCardInline key={j} {...item} />
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
