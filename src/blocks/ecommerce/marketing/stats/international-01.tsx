import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, TrendingUp, Users, DollarSign, Package } from 'lucide-react';

interface CountryStatProps {
	country: string;
	flag: string;
	orders: string;
	revenue: string;
	growth: string;
	positive: boolean;
}

const CountryRow = ({
	country,
	flag,
	orders,
	revenue,
	growth,
	positive,
}: CountryStatProps) => (
	<div className="flex items-center gap-4 py-3">
		<span className="text-2xl">{flag}</span>
		<div className="flex-1">
			<p className="font-medium">{country}</p>
			<p className="text-xs text-muted-foreground">{orders} orders</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{revenue}</p>
			<Badge
				variant={positive ? 'default' : 'destructive'}
				className="text-[10px]"
			>
				{growth}
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const summaryStats = [
		{ icon: Globe, label: 'Countries', value: '48' },
		{ icon: Package, label: "Int'l Orders", value: '24,847' },
		{ icon: DollarSign, label: 'Export Revenue', value: '$1.2M' },
		{ icon: TrendingUp, label: 'YoY Growth', value: '+42%' },
	];

	const countries: CountryStatProps[] = [
		{
			country: 'United States',
			flag: '🇺🇸',
			orders: '8,294',
			revenue: '$524K',
			growth: '+18%',
			positive: true,
		},
		{
			country: 'United Kingdom',
			flag: '🇬🇧',
			orders: '4,847',
			revenue: '$284K',
			growth: '+24%',
			positive: true,
		},
		{
			country: 'Germany',
			flag: '🇩🇪',
			orders: '3,284',
			revenue: '$198K',
			growth: '+12%',
			positive: true,
		},
		{
			country: 'Canada',
			flag: '🇨🇦',
			orders: '2,847',
			revenue: '$142K',
			growth: '+8%',
			positive: true,
		},
		{
			country: 'Australia',
			flag: '🇦🇺',
			orders: '2,284',
			revenue: '$118K',
			growth: '-4%',
			positive: false,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid grid-cols-2 gap-4 @lg:col-span-2">
						{summaryStats.map((stat, i) => (
							<Card key={i} className="flex items-center gap-4 p-4">
								<div className="rounded-lg bg-primary/10 p-2">
									<stat.icon className="size-4 text-primary" />
								</div>
								<div>
									<p className="text-xl font-bold">{stat.value}</p>
									<p className="text-xs text-muted-foreground">{stat.label}</p>
								</div>
							</Card>
						))}
					</div>
					<Card className="p-5">
						<h3 className="flex items-center gap-2 font-semibold">
							<Globe className="size-4 text-primary" />
							Top Countries
						</h3>
						<Separator className="my-4" />
						<div className="divide-y">
							{countries.map((country, i) => (
								<CountryRow key={i} {...country} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
