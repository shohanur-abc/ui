'use client';

import {
	Globe,
	TrendingUp,
	TrendingDown,
	Users,
	DollarSign,
	ShoppingCart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CountryData = {
	name: string;
	flag: string;
	revenue: number;
	orders: number;
	customers: number;
	growth: number;
	marketShare: number;
};

type WorldMapCardProps = {
	title: string;
	countries: CountryData[];
	totalRevenue: number;
};

const CountryRow = ({
	country,
	maxRevenue,
}: {
	country: CountryData;
	maxRevenue: number;
}) => (
	<div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
		<span className="text-2xl">{country.flag}</span>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<span className="font-medium">{country.name}</span>
				<Badge variant="outline" className="text-xs">
					{country.marketShare}%
				</Badge>
			</div>
			<Progress
				value={(country.revenue / maxRevenue) * 100}
				className="h-1.5 mt-2"
			/>
		</div>
		<div className="text-right">
			<p className="font-semibold">${(country.revenue / 1000).toFixed(0)}K</p>
			<div
				className={`flex items-center justify-end gap-1 text-xs ${country.growth >= 0 ? 'text-primary' : 'text-destructive'}`}
			>
				{country.growth >= 0 ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{Math.abs(country.growth)}%
			</div>
		</div>
	</div>
);

const SummaryCard = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
		<div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
	</div>
);

const WorldMapCard = ({
	title,
	countries,
	totalRevenue,
}: WorldMapCardProps) => {
	const maxRevenue = Math.max(...countries.map((c) => c.revenue));
	const totalOrders = countries.reduce((sum, c) => sum + c.orders, 0);
	const totalCustomers = countries.reduce((sum, c) => sum + c.customers, 0);
	const avgGrowth =
		countries.reduce((sum, c) => sum + c.growth, 0) / countries.length;

	return (
		<div className="grid grid-cols-1 @xl:grid-cols-3 gap-4">
			<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<Globe className="size-4 text-muted-foreground" />
						<CardTitle className="text-sm font-medium">{title}</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					{countries.map((country, idx) => (
						<CountryRow key={idx} country={country} maxRevenue={maxRevenue} />
					))}
				</CardContent>
			</Card>
			<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-1 gap-4">
				<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
					<CardContent className="pt-6 space-y-4">
						<SummaryCard
							icon={<DollarSign className="size-4" />}
							label="Total Revenue"
							value={`$${(totalRevenue / 1000).toFixed(0)}K`}
						/>
						<SummaryCard
							icon={<ShoppingCart className="size-4" />}
							label="Total Orders"
							value={totalOrders.toLocaleString()}
						/>
					</CardContent>
				</Card>
				<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
					<CardContent className="pt-6 space-y-4">
						<SummaryCard
							icon={<Users className="size-4" />}
							label="Customers"
							value={totalCustomers.toLocaleString()}
						/>
						<SummaryCard
							icon={<TrendingUp className="size-4" />}
							label="Avg Growth"
							value={`${avgGrowth.toFixed(1)}%`}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default function Main() {
	const countries: CountryData[] = [
		{
			name: 'United States',
			flag: '🇺🇸',
			revenue: 425000,
			orders: 3200,
			customers: 1850,
			growth: 15.2,
			marketShare: 42,
		},
		{
			name: 'United Kingdom',
			flag: '🇬🇧',
			revenue: 185000,
			orders: 1420,
			customers: 920,
			growth: 8.5,
			marketShare: 18,
		},
		{
			name: 'Germany',
			flag: '🇩🇪',
			revenue: 142000,
			orders: 1080,
			customers: 680,
			growth: 12.3,
			marketShare: 14,
		},
		{
			name: 'Canada',
			flag: '🇨🇦',
			revenue: 98000,
			orders: 760,
			customers: 520,
			growth: -2.1,
			marketShare: 10,
		},
		{
			name: 'Australia',
			flag: '🇦🇺',
			revenue: 85000,
			orders: 640,
			customers: 420,
			growth: 18.7,
			marketShare: 8,
		},
		{
			name: 'Other',
			flag: '🌍',
			revenue: 78000,
			orders: 580,
			customers: 380,
			growth: 5.4,
			marketShare: 8,
		},
	];

	const totalRevenue = countries.reduce((sum, c) => sum + c.revenue, 0);

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<WorldMapCard
					title="Sales by Region"
					countries={countries}
					totalRevenue={totalRevenue}
				/>
			</div>
		</section>
	);
}
