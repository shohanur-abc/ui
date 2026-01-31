'use client';

import {
	ArrowUpRight,
	BarChart3,
	type LucideIcon,
	MousePointerClick,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type CompactCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	subValue: string;
	badge: string;
	badgeVariant: 'default' | 'secondary' | 'outline';
};

const CompactCard = ({ icon: Icon, label, value, subValue, badge, badgeVariant }: CompactCardProps) => (
	<Card className="group border-border/50 bg-gradient-to-br from-card via-card to-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
		<CardContent className="p-4 @sm:p-5">
			<div className="flex items-center gap-3 @sm:gap-4">
				<div className="shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 @sm:p-3 ring-1 ring-primary/20 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20">
					<Icon className="size-4 @sm:size-5 text-primary" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<p className="text-xs @sm:text-sm font-medium text-muted-foreground truncate">{label}</p>
						<Badge variant={badgeVariant} className="shrink-0 text-[10px] px-1.5 py-0">
							{badge}
						</Badge>
					</div>
					<p className="text-xl @sm:text-2xl font-bold tracking-tight">{value}</p>
					<p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
				</div>
				<ArrowUpRight className="size-4 @sm:size-5 text-muted-foreground/50 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</div>
		</CardContent>
	</Card>
);

const compactCards: CompactCardProps[] = [
	{ icon: Users, label: 'Visitors', value: '24,532', subValue: '+2,145 today', badge: 'Live', badgeVariant: 'default' },
	{ icon: MousePointerClick, label: 'Click Rate', value: '4.8%', subValue: '+0.3% from avg', badge: 'High', badgeVariant: 'secondary' },
	{ icon: BarChart3, label: 'Sessions', value: '18,392', subValue: 'Avg: 4m 32s', badge: 'Growing', badgeVariant: 'outline' },
	{ icon: TrendingUp, label: 'Bounce Rate', value: '32.1%', subValue: '-2.4% improved', badge: 'Good', badgeVariant: 'secondary' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-5">
					{compactCards.map((card, i) => (
						<CompactCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
