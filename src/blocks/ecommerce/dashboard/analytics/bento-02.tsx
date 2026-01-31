'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	DollarSign,
	type LucideIcon,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
};

const StatCard = ({ icon: Icon, label, value, change, trend }: StatCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-4 text-primary" />
				</div>
				<div className={`flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
					{trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
					{Math.abs(change)}%
				</div>
			</div>
			<p className="text-xs text-muted-foreground mb-1">{label}</p>
			<p className="text-2xl font-bold">{value}</p>
		</CardContent>
	</Card>
);

type LargeChartCardProps = {
	title: string;
	badge: string;
	value: string;
	subtitle: string;
};

const LargeChartCard = ({ title, badge, value, subtitle }: LargeChartCardProps) => (
	<Card className="border-border/50 bg-card/80 col-span-2 row-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
			<Badge variant="secondary">{badge}</Badge>
		</CardHeader>
		<CardContent>
			<div className="mb-4">
				<p className="text-4xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
			<div className="h-48 flex items-end gap-2">
				{[30, 50, 25, 70, 45, 85, 60, 75, 40, 90, 55, 80].map((h, i) => (
					<div key={i} className="flex-1 flex flex-col gap-1">
						<div
							className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t transition-all duration-300 hover:from-primary/80"
							style={{ height: `${h}%` }}
						/>
						<span className="text-[10px] text-muted-foreground text-center">
							{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type ListCardProps = {
	title: string;
	items: { label: string; value: string; badge?: string }[];
};

const ListCard = ({ title, items }: ListCardProps) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
					<span className="text-sm">{item.label}</span>
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold">{item.value}</span>
						{item.badge && <Badge variant="outline" className="text-[10px]">{item.badge}</Badge>}
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const stats: StatCardProps[] = [
	{ icon: DollarSign, label: 'Total Revenue', value: '$45.2K', change: 12.5, trend: 'up' },
	{ icon: ShoppingCart, label: 'Total Orders', value: '2,345', change: 8.2, trend: 'up' },
	{ icon: Users, label: 'New Customers', value: '456', change: 3.1, trend: 'down' },
	{ icon: Package, label: 'Products Sold', value: '8,901', change: 15.3, trend: 'up' },
];

const topProducts = [
	{ label: 'Premium Headphones', value: '$12.4K', badge: 'Best' },
	{ label: 'Wireless Mouse', value: '$8.2K' },
	{ label: 'USB-C Hub', value: '$6.8K' },
	{ label: 'Keyboard Pro', value: '$5.1K' },
];

const topCategories = [
	{ label: 'Electronics', value: '42%', badge: 'Top' },
	{ label: 'Accessories', value: '28%' },
	{ label: 'Software', value: '18%' },
	{ label: 'Services', value: '12%' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<LargeChartCard
						title="Monthly Revenue"
						badge="2024"
						value="$284,532"
						subtitle="Yearly revenue target: $350,000"
					/>
					<ListCard title="Top Products" items={topProducts} />
					<ListCard title="Categories" items={topCategories} />
				</div>
			</div>
		</section>
	);
}
