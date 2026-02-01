'use client';

import {
	TrendingUp,
	TrendingDown,
	Globe,
	Smartphone,
	Monitor,
	Tablet,
	ShoppingCart,
	CreditCard,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type DeviceMetric = {
	name: string;
	value: number;
	percentage: number;
	color: string;
	icon: React.ReactNode;
};

type RegionMetric = {
	name: string;
	revenue: number;
	percentage: number;
	change: number;
};

type BentoLayout3Props = {
	devices: DeviceMetric[];
	regions: RegionMetric[];
	paymentMethods: { name: string; percentage: number; color: string }[];
};

const DeviceCard = ({ devices }: { devices: DeviceMetric[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Sales by Device</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{devices.map((device, idx) => (
				<div key={idx} className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-muted">{device.icon}</div>
					<div className="flex-1">
						<div className="flex justify-between text-sm mb-1">
							<span>{device.name}</span>
							<span className="font-medium">{device.percentage}%</span>
						</div>
						<Progress value={device.percentage} className="h-1.5" />
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const RegionCard = ({ regions }: { regions: RegionMetric[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Globe className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Top Regions</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{regions.map((region, idx) => (
				<div
					key={idx}
					className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
				>
					<div>
						<p className="font-medium">{region.name}</p>
						<p className="text-xs text-muted-foreground">
							${region.revenue.toLocaleString()}
						</p>
					</div>
					<div
						className={`flex items-center gap-1 text-sm ${region.change >= 0 ? 'text-primary' : 'text-destructive'}`}
					>
						{region.change >= 0 ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(region.change)}%
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const PaymentCard = ({
	paymentMethods,
}: {
	paymentMethods: { name: string; percentage: number; color: string }[];
}) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-center gap-4">
				<div className="h-[120px] w-[120px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={paymentMethods}
								cx="50%"
								cy="50%"
								innerRadius={35}
								outerRadius={55}
								paddingAngle={2}
								dataKey="percentage"
							>
								{paymentMethods.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="flex-1 space-y-2">
					{paymentMethods.map((method, idx) => (
						<div key={idx} className="flex items-center gap-2 text-sm">
							<div
								className="size-2 rounded-full"
								style={{ backgroundColor: method.color }}
							/>
							<span className="flex-1">{method.name}</span>
							<span className="font-medium">{method.percentage}%</span>
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

const BentoLayout3 = ({
	devices,
	regions,
	paymentMethods,
}: BentoLayout3Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
		<DeviceCard devices={devices} />
		<RegionCard regions={regions} />
		<PaymentCard paymentMethods={paymentMethods} />
	</div>
);

export default function Main() {
	const devices: DeviceMetric[] = [
		{
			name: 'Desktop',
			value: 58420,
			percentage: 45,
			color: 'oklch(0.70 0.18 155)',
			icon: <Monitor className="size-4" />,
		},
		{
			name: 'Mobile',
			value: 48250,
			percentage: 38,
			color: 'oklch(0.65 0.16 200)',
			icon: <Smartphone className="size-4" />,
		},
		{
			name: 'Tablet',
			value: 22180,
			percentage: 17,
			color: 'oklch(0.60 0.14 250)',
			icon: <Tablet className="size-4" />,
		},
	];

	const regions: RegionMetric[] = [
		{ name: 'North America', revenue: 68500, percentage: 42, change: 12.5 },
		{ name: 'Europe', revenue: 48200, percentage: 30, change: 8.2 },
		{ name: 'Asia Pacific', revenue: 32800, percentage: 20, change: -3.1 },
		{ name: 'Other', revenue: 12500, percentage: 8, change: 5.8 },
	];

	const paymentMethods = [
		{ name: 'Credit Card', percentage: 52, color: 'oklch(0.70 0.18 155)' },
		{ name: 'PayPal', percentage: 28, color: 'oklch(0.65 0.16 200)' },
		{ name: 'Apple Pay', percentage: 12, color: 'oklch(0.60 0.14 250)' },
		{ name: 'Other', percentage: 8, color: 'oklch(0.55 0.12 300)' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout3
					devices={devices}
					regions={regions}
					paymentMethods={paymentMethods}
				/>
			</div>
		</section>
	);
}
