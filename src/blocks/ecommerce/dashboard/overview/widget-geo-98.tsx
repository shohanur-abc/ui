import { ArrowDownRight, ArrowUpRight, Globe, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type CountryData = {
	id: string;
	country: string;
	code: string;
	revenue: string;
	orders: number;
	share: number;
	trend: 'up' | 'down';
	change: string;
};

const CountryRow = ({ country, code, revenue, orders, share, trend, change }: CountryData) => (
	<div className="flex items-center gap-3 py-2">
		<div className="flex size-8 items-center justify-center rounded-lg bg-muted text-xs font-medium">
			{code}
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium">{country}</p>
				<p className="text-sm font-semibold">{revenue}</p>
			</div>
			<div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
				<span>{orders} orders</span>
				<span className={`flex items-center ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
					{trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
					{change}
				</span>
			</div>
			<Progress value={share} className="mt-1.5 h-1" />
		</div>
	</div>
);

export default function Main() {
	const countries: CountryData[] = [
		{ id: '1', country: 'United States', code: 'US', revenue: '$24,580', orders: 642, share: 42, trend: 'up', change: '12.5%' },
		{ id: '2', country: 'United Kingdom', code: 'UK', revenue: '$8,920', orders: 245, share: 28, trend: 'up', change: '8.2%' },
		{ id: '3', country: 'Germany', code: 'DE', revenue: '$6,450', orders: 178, share: 22, trend: 'up', change: '5.4%' },
		{ id: '4', country: 'Canada', code: 'CA', revenue: '$4,280', orders: 124, share: 18, trend: 'down', change: '2.1%' },
		{ id: '5', country: 'France', code: 'FR', revenue: '$3,890', orders: 108, share: 15, trend: 'up', change: '6.8%' },
		{ id: '6', country: 'Australia', code: 'AU', revenue: '$2,650', orders: 76, share: 12, trend: 'up', change: '9.2%' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Globe className="size-5 text-primary" />
							Sales by Region
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-x-6 @lg:grid-cols-2">
							<div className="divide-y">
								{countries.slice(0, 3).map((country) => (
									<CountryRow key={country.id} {...country} />
								))}
							</div>
							<div className="divide-y border-t @lg:border-t-0">
								{countries.slice(3).map((country) => (
									<CountryRow key={country.id} {...country} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
