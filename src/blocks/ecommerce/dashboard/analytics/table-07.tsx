'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Country = {
	name: string;
	flag: string;
	visitors: number;
	revenue: number;
	orders: number;
	conversionRate: number;
};

const CountryRow = ({
	country,
	maxVisitors,
}: {
	country: Country;
	maxVisitors: number;
}) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell>
			<div className="flex items-center gap-3">
				<span className="text-xl">{country.flag}</span>
				<span className="font-medium">{country.name}</span>
			</div>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<span className="w-16">{country.visitors.toLocaleString()}</span>
				<div className="w-24">
					<Progress
						value={(country.visitors / maxVisitors) * 100}
						className="h-1.5"
					/>
				</div>
			</div>
		</TableCell>
		<TableCell>${country.revenue.toLocaleString()}</TableCell>
		<TableCell>{country.orders.toLocaleString()}</TableCell>
		<TableCell>
			<span
				className={
					country.conversionRate >= 4
						? 'text-emerald-500'
						: country.conversionRate >= 2
							? 'text-amber-500'
							: 'text-rose-500'
				}
			>
				{country.conversionRate}%
			</span>
		</TableCell>
	</TableRow>
);

const countries: Country[] = [
	{
		name: 'United States',
		flag: '🇺🇸',
		visitors: 125450,
		revenue: 284500,
		orders: 4580,
		conversionRate: 3.65,
	},
	{
		name: 'United Kingdom',
		flag: '🇬🇧',
		visitors: 48920,
		revenue: 98400,
		orders: 1620,
		conversionRate: 3.31,
	},
	{
		name: 'Germany',
		flag: '🇩🇪',
		visitors: 42180,
		revenue: 76500,
		orders: 1240,
		conversionRate: 2.94,
	},
	{
		name: 'Canada',
		flag: '🇨🇦',
		visitors: 38450,
		revenue: 68200,
		orders: 1180,
		conversionRate: 3.07,
	},
	{
		name: 'Australia',
		flag: '🇦🇺',
		visitors: 28920,
		revenue: 52400,
		orders: 920,
		conversionRate: 3.18,
	},
	{
		name: 'France',
		flag: '🇫🇷',
		visitors: 24580,
		revenue: 42800,
		orders: 680,
		conversionRate: 2.77,
	},
	{
		name: 'Japan',
		flag: '🇯🇵',
		visitors: 18450,
		revenue: 38500,
		orders: 540,
		conversionRate: 2.93,
	},
	{
		name: 'Netherlands',
		flag: '🇳🇱',
		visitors: 12840,
		revenue: 24200,
		orders: 380,
		conversionRate: 2.96,
	},
];

const maxVisitors = Math.max(...countries.map((c) => c.visitors));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Geographic Distribution
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Sales and traffic by country
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Country</TableHead>
										<TableHead>Visitors</TableHead>
										<TableHead>Revenue</TableHead>
										<TableHead>Orders</TableHead>
										<TableHead>Conv. Rate</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{countries.map((country, i) => (
										<CountryRow
											key={i}
											country={country}
											maxVisitors={maxVisitors}
										/>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
