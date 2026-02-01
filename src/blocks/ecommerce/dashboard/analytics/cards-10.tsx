'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	BadgeDollarSign,
	type LucideIcon,
	Percent,
	ReceiptText,
	Repeat,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RankedItemProps = {
	rank: number;
	label: string;
	value: string;
	change: number;
};

const RankedItem = ({ rank, label, value, change }: RankedItemProps) => (
	<div className="flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0">
		<span className="flex items-center justify-center size-6 rounded-full bg-muted text-xs font-bold">
			{rank}
		</span>
		<span className="flex-1 text-sm truncate">{label}</span>
		<span className="text-sm font-semibold">{value}</span>
		<span
			className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
		>
			{change >= 0 ? (
				<ArrowUpRight className="size-3" />
			) : (
				<ArrowDownRight className="size-3" />
			)}
			{Math.abs(change)}%
		</span>
	</div>
);

type RankedCardProps = {
	icon: LucideIcon;
	title: string;
	badge: string;
	items: { label: string; value: string; change: number }[];
};

const RankedCard = ({ icon: Icon, title, badge, items }: RankedCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<div className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20">
					<Icon className="size-4 text-primary" />
				</div>
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
			</div>
			<Badge variant="secondary">{badge}</Badge>
		</CardHeader>
		<CardContent>
			{items.map((item, i) => (
				<RankedItem key={i} rank={i + 1} {...item} />
			))}
		</CardContent>
	</Card>
);

const rankedCards: RankedCardProps[] = [
	{
		icon: BadgeDollarSign,
		title: 'Top Products',
		badge: 'Revenue',
		items: [
			{ label: 'Premium Headphones', value: '$12,450', change: 23 },
			{ label: 'Wireless Keyboard', value: '$8,230', change: 15 },
			{ label: 'USB-C Hub', value: '$6,890', change: -5 },
			{ label: 'Webcam Pro', value: '$5,670', change: 8 },
		],
	},
	{
		icon: ReceiptText,
		title: 'Top Categories',
		badge: 'Sales',
		items: [
			{ label: 'Electronics', value: '1,234', change: 18 },
			{ label: 'Accessories', value: '987', change: 12 },
			{ label: 'Software', value: '756', change: 25 },
			{ label: 'Services', value: '543', change: -3 },
		],
	},
	{
		icon: Percent,
		title: 'Discount Impact',
		badge: 'Conversions',
		items: [
			{ label: '30% Off Campaign', value: '4.8%', change: 45 },
			{ label: 'BOGO Deals', value: '3.9%', change: 22 },
			{ label: 'Free Shipping', value: '3.2%', change: 18 },
			{ label: 'Bundle Offers', value: '2.7%', change: 8 },
		],
	},
	{
		icon: Repeat,
		title: 'Customer Segments',
		badge: 'Retention',
		items: [
			{ label: 'VIP Members', value: '92%', change: 5 },
			{ label: 'Regular Buyers', value: '76%', change: 8 },
			{ label: 'New Customers', value: '45%', change: 12 },
			{ label: 'One-time Buyers', value: '23%', change: -2 },
		],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-6">
					{rankedCards.map((card, i) => (
						<RankedCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
