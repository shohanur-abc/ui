'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	Clock,
	DollarSign,
	type LucideIcon,
	Package,
	Percent,
	ShoppingCart,
	Star,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type HeroMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
	chartData: number[];
};

const HeroMetric = ({ icon: Icon, label, value, change, trend, chartData }: HeroMetricProps) => (
	<Card className="border-border/50 bg-card/80 col-span-2 row-span-2">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between mb-4">
				<div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
					<Icon className="size-6 text-primary" />
				</div>
				<div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
					{trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
					{Math.abs(change)}%
				</div>
			</div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-4xl @sm:text-5xl font-bold mt-2">{value}</p>
			<div className="flex-1 flex items-end mt-6">
				<div className="w-full h-24 flex items-end gap-1">
					{chartData.map((h, i) => (
						<div
							key={i}
							className="flex-1 bg-gradient-to-t from-primary/30 to-primary rounded-t transition-all duration-300 hover:from-primary/50"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

type SmallMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	color: string;
};

const SmallMetric = ({ icon: Icon, label, value, change, color }: SmallMetricProps) => (
	<Card className="border-border/50 bg-card/80">
		<CardContent className="p-4">
			<div className="flex items-center gap-3 mb-3">
				<div className={`rounded-lg p-2 ${color}`}>
					<Icon className="size-4" />
				</div>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
			<p className="text-xl font-bold">{value}</p>
			<p className="text-xs text-emerald-500 mt-1">{change}</p>
		</CardContent>
	</Card>
);

type ProductRowProps = {
	rank: number;
	name: string;
	sales: string;
	revenue: string;
	rating: number;
};

const TopProductsCard = ({ products }: { products: ProductRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium">Top Selling Products</CardTitle>
			<Badge variant="secondary">This Week</Badge>
		</CardHeader>
		<CardContent className="space-y-3">
			{products.map((product, i) => (
				<div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
					<span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-xs font-bold text-primary">
						{product.rank}
					</span>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{product.name}</p>
						<p className="text-xs text-muted-foreground">{product.sales} sales</p>
					</div>
					<div className="text-right">
						<p className="text-sm font-semibold">{product.revenue}</p>
						<div className="flex items-center gap-0.5 justify-end">
							<Star className="size-3 fill-amber-400 text-amber-400" />
							<span className="text-xs text-muted-foreground">{product.rating}</span>
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

type PerformanceItemProps = {
	label: string;
	value: number;
	target: string;
};

const PerformanceCard = ({ items }: { items: PerformanceItemProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Performance</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span>{item.label}</span>
						<span className="text-muted-foreground">{item.value}%</span>
					</div>
					<Progress value={item.value} className="h-1.5" />
					<p className="text-xs text-muted-foreground">Target: {item.target}</p>
				</div>
			))}
		</CardContent>
	</Card>
);

const heroData: HeroMetricProps = {
	icon: DollarSign,
	label: 'Total Revenue',
	value: '$128,450',
	change: 24.5,
	trend: 'up',
	chartData: [35, 55, 40, 70, 45, 80, 60, 75, 50, 85, 65, 90],
};

const smallMetrics: SmallMetricProps[] = [
	{ icon: ShoppingCart, label: 'Orders', value: '1,234', change: '+12.5%', color: 'bg-blue-500/10 text-blue-500' },
	{ icon: Users, label: 'Customers', value: '856', change: '+8.3%', color: 'bg-purple-500/10 text-purple-500' },
	{ icon: Package, label: 'Products', value: '342', change: '+5.2%', color: 'bg-emerald-500/10 text-emerald-500' },
	{ icon: Percent, label: 'Conversion', value: '3.8%', change: '+0.5%', color: 'bg-orange-500/10 text-orange-500' },
];

const products: ProductRowProps[] = [
	{ rank: 1, name: 'Wireless Bluetooth Headphones', sales: '456', revenue: '$22,800', rating: 4.9 },
	{ rank: 2, name: 'USB-C Charging Hub', sales: '389', revenue: '$15,560', rating: 4.8 },
	{ rank: 3, name: 'Mechanical Keyboard Pro', sales: '312', revenue: '$24,960', rating: 4.7 },
	{ rank: 4, name: 'Ergonomic Mouse', sales: '278', revenue: '$8,340', rating: 4.6 },
];

const performanceItems: PerformanceItemProps[] = [
	{ label: 'Sales Target', value: 78, target: '$150K' },
	{ label: 'Order Goal', value: 65, target: '2,000' },
	{ label: 'NPS Score', value: 85, target: '90+' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-6 gap-4 @lg:gap-6">
					<HeroMetric {...heroData} />
					{smallMetrics.map((metric, i) => (
						<SmallMetric key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<TopProductsCard products={products} />
					<PerformanceCard items={performanceItems} />
				</div>
			</div>
		</section>
	);
}
