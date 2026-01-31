import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Cloud, Database, Globe, Server, Zap } from 'lucide-react';

interface ServiceProps {
	icon: React.ReactNode;
	name: string;
	usage: number;
	limit: number;
	unit: string;
	cost: number;
	color: string;
}

interface RegionProps {
	name: string;
	usage: number;
	cost: number;
}

interface BillingProps {
	services: number;
	support: number;
	credits: number;
	total: number;
	currency: string;
}

const ServiceCard = ({
	icon,
	name,
	usage,
	limit,
	unit,
	cost,
	color,
	currency,
}: ServiceProps & { currency: string }) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className={`size-8 rounded flex items-center justify-center ${color}`}
					>
						{icon}
					</div>
					<span className="font-medium text-sm">{name}</span>
				</div>
				<span className="font-bold">
					{currency}
					{cost.toFixed(2)}
				</span>
			</div>
			<div className="space-y-1">
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>
						{usage.toLocaleString()} / {limit.toLocaleString()} {unit}
					</span>
					<span>{((usage / limit) * 100).toFixed(0)}%</span>
				</div>
				<Progress value={(usage / limit) * 100} className="h-1.5" />
			</div>
		</CardContent>
	</Card>
);

const RegionCard = ({
	region,
	currency,
}: {
	region: RegionProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Globe className="size-4 text-muted-foreground" />
					<span className="text-sm">{region.name}</span>
				</div>
				<div className="text-right">
					<p className="font-medium text-sm">
						{currency}
						{region.cost.toFixed(2)}
					</p>
					<p className="text-xs text-muted-foreground">{region.usage}%</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BillingSummary = ({
	services,
	support,
	credits,
	total,
	currency,
}: BillingProps) => (
	<Card className="bg-gradient-to-br from-primary/10 to-primary/5">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm">Billing Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="flex justify-between text-sm">
				<span>Services</span>
				<span>
					{currency}
					{services.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span>Support Plan</span>
				<span>
					{currency}
					{support.toFixed(2)}
				</span>
			</div>
			{credits > 0 && (
				<div className="flex justify-between text-sm text-green-600">
					<span>Credits</span>
					<span>
						-{currency}
						{credits.toFixed(2)}
					</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between font-bold">
				<span>Total Due</span>
				<span className="text-primary">
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const services: ServiceProps[] = [
		{
			icon: <Server className="size-4 text-blue-600" />,
			name: 'Compute',
			usage: 720,
			limit: 1000,
			unit: 'hours',
			cost: 145.5,
			color: 'bg-blue-100',
		},
		{
			icon: <Database className="size-4 text-green-600" />,
			name: 'Storage',
			usage: 450,
			limit: 1000,
			unit: 'GB',
			cost: 45.0,
			color: 'bg-green-100',
		},
		{
			icon: <Cloud className="size-4 text-purple-600" />,
			name: 'Bandwidth',
			usage: 850,
			limit: 2000,
			unit: 'GB',
			cost: 42.5,
			color: 'bg-purple-100',
		},
		{
			icon: <Zap className="size-4 text-amber-600" />,
			name: 'Functions',
			usage: 2500000,
			limit: 5000000,
			unit: 'invocations',
			cost: 25.0,
			color: 'bg-amber-100',
		},
	];

	const regions: RegionProps[] = [
		{ name: 'US East', usage: 45, cost: 116.1 },
		{ name: 'US West', usage: 30, cost: 77.4 },
		{ name: 'EU West', usage: 15, cost: 38.7 },
		{ name: 'Asia Pacific', usage: 10, cost: 25.8 },
	];

	const billing: BillingProps = {
		services: 258.0,
		support: 29.0,
		credits: 15.0,
		total: 272.0,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-xl font-bold">Cloud Services Invoice</h1>
						<p className="text-sm text-muted-foreground">February 2024</p>
					</div>
					<Badge variant="secondary">Account: PRO-789456</Badge>
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{services.map((service, index) => (
						<ServiceCard key={index} {...service} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<div className="@md:col-span-2 space-y-4">
						<h3 className="text-sm font-medium text-muted-foreground">
							Usage by Region
						</h3>
						<div className="grid @sm:grid-cols-2 gap-2">
							{regions.map((region, index) => (
								<RegionCard key={index} region={region} currency="$" />
							))}
						</div>
					</div>
					<BillingSummary {...billing} />
				</div>
			</div>
		</section>
	);
}
