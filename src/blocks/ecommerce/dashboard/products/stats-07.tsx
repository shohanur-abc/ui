'use client';

import * as React from 'react';
import {
	Globe,
	MapPin,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Users,
	BarChart3,
	Flag,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface RegionCardProps {
	region: string;
	revenue: number;
	orders: number;
	change: number;
	topCountry: string;
}

const RegionCard = ({
	region,
	revenue,
	orders,
	change,
	topCountry,
}: RegionCardProps) => {
	const isPositive = change >= 0;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-3 flex items-center gap-2">
				<Globe className="size-5 text-primary" />
				<h3 className="font-semibold">{region}</h3>
			</div>
			<p className="text-2xl font-bold">${revenue.toLocaleString()}</p>
			<p className="text-sm text-muted-foreground">{orders} orders</p>
			<div className="mt-2 flex items-center justify-between">
				<div
					className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{isPositive ? (
						<TrendingUp className="size-3.5" />
					) : (
						<TrendingDown className="size-3.5" />
					)}
					<span>
						{isPositive ? '+' : ''}
						{change}%
					</span>
				</div>
				<Badge variant="outline" className="gap-1">
					<Flag className="size-3" />
					{topCountry}
				</Badge>
			</div>
		</div>
	);
};

interface CountryTableProps {
	countries: {
		name: string;
		code: string;
		revenue: number;
		orders: number;
		avgOrder: number;
		growth: number;
	}[];
	labels: {
		country: string;
		revenue: string;
		orders: string;
		aov: string;
		growth: string;
	};
}

const CountryTable = ({ countries, labels }: CountryTableProps) => (
	<div className="rounded-lg border bg-card">
		<div className="border-b p-4">
			<h3 className="font-semibold">Country Breakdown</h3>
		</div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{labels.country}</TableHead>
					<TableHead className="text-right">{labels.revenue}</TableHead>
					<TableHead className="text-right">{labels.orders}</TableHead>
					<TableHead className="text-right">{labels.aov}</TableHead>
					<TableHead className="text-right">{labels.growth}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{countries.map((country) => (
					<TableRow key={country.code}>
						<TableCell>
							<div className="flex items-center gap-2">
								<span className="text-lg">
									{country.code === 'US'
										? '🇺🇸'
										: country.code === 'CA'
											? '🇨🇦'
											: country.code === 'UK'
												? '🇬🇧'
												: country.code === 'DE'
													? '🇩🇪'
													: country.code === 'FR'
														? '🇫🇷'
														: country.code === 'AU'
															? '🇦🇺'
															: '🌍'}
								</span>
								<span>{country.name}</span>
							</div>
						</TableCell>
						<TableCell className="text-right font-medium">
							${country.revenue.toLocaleString()}
						</TableCell>
						<TableCell className="text-right">{country.orders}</TableCell>
						<TableCell className="text-right">
							${country.avgOrder.toFixed(2)}
						</TableCell>
						<TableCell className="text-right">
							<span
								className={
									country.growth >= 0 ? 'text-emerald-500' : 'text-red-500'
								}
							>
								{country.growth >= 0 ? '+' : ''}
								{country.growth}%
							</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

interface CityDistributionProps {
	cities: { name: string; country: string; orders: number; percent: number }[];
}

const CityDistribution = ({ cities }: CityDistributionProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-center gap-2">
			<MapPin className="size-5" />
			<h3 className="font-semibold">Top Cities</h3>
		</div>
		<div className="space-y-3">
			{cities.map((city) => (
				<div key={city.name}>
					<div className="mb-1 flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<span className="font-medium">{city.name}</span>
							<span className="text-muted-foreground">{city.country}</span>
						</div>
						<span>{city.orders} orders</span>
					</div>
					<Progress value={city.percent} className="h-2" />
				</div>
			))}
		</div>
	</div>
);

interface MapPlaceholderProps {
	title: string;
}

const MapPlaceholder = ({ title }: MapPlaceholderProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">{title}</h3>
		<div className="flex aspect-video items-center justify-center rounded-lg bg-muted/30">
			<div className="text-center">
				<Globe className="mx-auto mb-2 size-12 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">
					Interactive map would render here
				</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [region, setRegion] = React.useState('all');

	const regions = [
		{
			region: 'North America',
			revenue: 45678,
			orders: 234,
			change: 15.2,
			topCountry: 'United States',
		},
		{
			region: 'Europe',
			revenue: 23456,
			orders: 156,
			change: 8.5,
			topCountry: 'Germany',
		},
		{
			region: 'Asia Pacific',
			revenue: 12345,
			orders: 89,
			change: 32.1,
			topCountry: 'Japan',
		},
		{
			region: 'Rest of World',
			revenue: 5678,
			orders: 45,
			change: -5.2,
			topCountry: 'Brazil',
		},
	];

	const countries = [
		{
			name: 'United States',
			code: 'US',
			revenue: 35000,
			orders: 180,
			avgOrder: 194.44,
			growth: 18.5,
		},
		{
			name: 'Canada',
			code: 'CA',
			revenue: 10678,
			orders: 54,
			avgOrder: 197.74,
			growth: 12.3,
		},
		{
			name: 'United Kingdom',
			code: 'UK',
			revenue: 8900,
			orders: 48,
			avgOrder: 185.42,
			growth: 5.8,
		},
		{
			name: 'Germany',
			code: 'DE',
			revenue: 7500,
			orders: 42,
			avgOrder: 178.57,
			growth: 15.2,
		},
		{
			name: 'France',
			code: 'FR',
			revenue: 5200,
			orders: 38,
			avgOrder: 136.84,
			growth: -2.1,
		},
		{
			name: 'Australia',
			code: 'AU',
			revenue: 4800,
			orders: 32,
			avgOrder: 150.0,
			growth: 22.4,
		},
	];

	const cities = [
		{ name: 'New York', country: 'US', orders: 45, percent: 100 },
		{ name: 'Los Angeles', country: 'US', orders: 38, percent: 84 },
		{ name: 'London', country: 'UK', orders: 32, percent: 71 },
		{ name: 'Toronto', country: 'CA', orders: 28, percent: 62 },
		{ name: 'Berlin', country: 'DE', orders: 24, percent: 53 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Globe className="size-5" />
						<h2 className="text-xl font-semibold">Geographic Distribution</h2>
					</div>
					<Select value={region} onValueChange={setRegion}>
						<SelectTrigger className="w-40">
							<SelectValue placeholder="All Regions" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Regions</SelectItem>
							<SelectItem value="na">North America</SelectItem>
							<SelectItem value="eu">Europe</SelectItem>
							<SelectItem value="apac">Asia Pacific</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{regions.map((r) => (
						<RegionCard key={r.region} {...r} />
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<MapPlaceholder title="Sales by Region" />
					<CityDistribution cities={cities} />
				</div>

				<CountryTable
					countries={countries}
					labels={{
						country: 'Country',
						revenue: 'Revenue',
						orders: 'Orders',
						aov: 'AOV',
						growth: 'Growth',
					}}
				/>
			</div>
		</section>
	);
}
