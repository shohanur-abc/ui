'use client';

import {
	Package,
	ShoppingBag,
	Truck,
	CheckCircle,
	type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatusCardProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	subtitle: string;
	color: 'primary' | 'accent' | 'warning' | 'success';
};

const StatusCard = ({
	icon: Icon,
	title,
	value,
	subtitle,
	color,
}: StatusCardProps) => {
	const colorClasses = {
		primary: 'from-primary/20 to-primary/5 text-primary ring-primary/30',
		accent: 'from-accent/20 to-accent/5 text-accent ring-accent/30',
		warning:
			'from-amber-500/20 to-amber-500/5 text-amber-500 ring-amber-500/30',
		success:
			'from-emerald-500/20 to-emerald-500/5 text-emerald-500 ring-emerald-500/30',
	};

	const iconBg = colorClasses[color];

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="pb-2 flex flex-row items-center gap-3">
				<div className={`p-3 rounded-xl bg-gradient-to-br ring-1 ${iconBg}`}>
					<Icon className="size-5" />
				</div>
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-3xl @sm:text-4xl font-bold tracking-tight mb-1">
					{value}
				</p>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const statuses: StatusCardProps[] = [
		{
			icon: ShoppingBag,
			title: 'Pending Orders',
			value: '124',
			subtitle: 'Awaiting processing',
			color: 'warning',
		},
		{
			icon: Package,
			title: 'Processing',
			value: '89',
			subtitle: 'Being prepared',
			color: 'primary',
		},
		{
			icon: Truck,
			title: 'In Transit',
			value: '256',
			subtitle: 'On the way',
			color: 'accent',
		},
		{
			icon: CheckCircle,
			title: 'Delivered',
			value: '1,847',
			subtitle: 'This month',
			color: 'success',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
					{statuses.map((status, idx) => (
						<StatusCard key={idx} {...status} />
					))}
				</div>
			</div>
		</section>
	);
}
