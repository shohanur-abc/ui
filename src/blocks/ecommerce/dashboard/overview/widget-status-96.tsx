import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type StatusCard = {
	id: string;
	title: string;
	value: string;
	status: 'healthy' | 'warning' | 'critical';
	description: string;
	icon: React.ElementType;
};

const getStatusStyle = (status: StatusCard['status']) => {
	switch (status) {
		case 'healthy':
			return {
				color: 'bg-emerald-500',
				text: 'text-emerald-500',
				bg: 'bg-emerald-500/10',
				label: 'Healthy',
			};
		case 'warning':
			return {
				color: 'bg-amber-500',
				text: 'text-amber-500',
				bg: 'bg-amber-500/10',
				label: 'Warning',
			};
		case 'critical':
			return {
				color: 'bg-red-500',
				text: 'text-red-500',
				bg: 'bg-red-500/10',
				label: 'Critical',
			};
	}
};

const StatusCardComponent = ({
	title,
	value,
	status,
	description,
	icon: Icon,
}: StatusCard) => {
	const style = getStatusStyle(status);

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className={`rounded-lg p-2 ${style.bg}`}>
						<Icon className={`size-4 ${style.text}`} />
					</div>
					<div className="flex items-center gap-1.5">
						<div className={`size-2 rounded-full ${style.color}`} />
						<span className={`text-xs font-medium ${style.text}`}>
							{style.label}
						</span>
					</div>
				</div>
				<div className="mt-3">
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-bold">{value}</p>
					<p className="mt-1 text-xs text-muted-foreground">{description}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const statusCards: StatusCard[] = [
		{
			id: '1',
			title: 'Revenue',
			value: '$48.2K',
			status: 'healthy',
			description: 'On track to meet monthly target',
			icon: DollarSign,
		},
		{
			id: '2',
			title: 'Orders',
			value: '1,284',
			status: 'healthy',
			description: '12% above daily average',
			icon: ShoppingCart,
		},
		{
			id: '3',
			title: 'Inventory',
			value: '12 items',
			status: 'warning',
			description: 'Low stock items need attention',
			icon: Package,
		},
		{
			id: '4',
			title: 'Customers',
			value: '3,845',
			status: 'healthy',
			description: 'Growing 4.1% monthly',
			icon: Users,
		},
		{
			id: '5',
			title: 'Returns',
			value: '4.2%',
			status: 'critical',
			description: 'Above 3% threshold',
			icon: Package,
		},
		{
			id: '6',
			title: 'Growth',
			value: '+15.3%',
			status: 'healthy',
			description: 'YoY revenue growth',
			icon: TrendingUp,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-6">
					{statusCards.map((card) => (
						<StatusCardComponent key={card.id} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
