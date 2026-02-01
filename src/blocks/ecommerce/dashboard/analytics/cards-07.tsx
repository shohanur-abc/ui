'use client';

import {
	ArrowUpRight,
	Calendar,
	Clock,
	type LucideIcon,
	MapPin,
	ShoppingCart,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type VerticalCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	badge: string;
	description: string;
	footer: string;
};

const VerticalCard = ({
	icon: Icon,
	label,
	value,
	badge,
	description,
	footer,
}: VerticalCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardContent className="flex flex-col items-center text-center p-6 @sm:p-8">
			<div className="mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:from-primary/30">
				<Icon className="size-6 @sm:size-8 text-primary" />
			</div>
			<Badge variant="secondary" className="mb-3">
				{badge}
			</Badge>
			<p className="text-xs @sm:text-sm font-medium text-muted-foreground mb-2">
				{label}
			</p>
			<p className="text-3xl @sm:text-4xl font-bold tracking-tight mb-2">
				{value}
			</p>
			<p className="text-xs @sm:text-sm text-muted-foreground mb-4">
				{description}
			</p>
			<div className="mt-auto pt-4 border-t border-border/50 w-full">
				<p className="text-xs text-muted-foreground">{footer}</p>
			</div>
		</CardContent>
	</Card>
);

const verticalCards: VerticalCardProps[] = [
	{
		icon: ShoppingCart,
		label: 'Active Carts',
		value: '847',
		badge: 'Real-time',
		description: 'Users with items in cart',
		footer: 'Est. value: $42,350',
	},
	{
		icon: Clock,
		label: 'Avg Session',
		value: '4:32',
		badge: 'Duration',
		description: 'Time spent on site',
		footer: '+45s from last week',
	},
	{
		icon: MapPin,
		label: 'Top Region',
		value: 'US',
		badge: 'Geography',
		description: '42% of total traffic',
		footer: 'California leads',
	},
	{
		icon: Calendar,
		label: 'Peak Day',
		value: 'Fri',
		badge: 'Weekly',
		description: 'Highest sales volume',
		footer: 'Best hour: 2-4 PM',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{verticalCards.map((card, i) => (
						<VerticalCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
