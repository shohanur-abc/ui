import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Package,
	CreditCard,
	RotateCcw,
	CheckCircle,
} from 'lucide-react';

interface TimelineStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	time: string;
	status: 'completed' | 'active' | 'pending';
}

const TimelineStat = ({
	icon: Icon,
	label,
	value,
	time,
	status,
}: TimelineStatProps) => {
	const statusStyles = {
		completed: 'bg-accent text-accent-foreground',
		active: 'bg-primary text-primary-foreground animate-pulse',
		pending: 'bg-secondary text-secondary-foreground',
	};

	return (
		<div className="group relative flex gap-4 pb-8 last:pb-0">
			<div className="relative flex flex-col items-center">
				<div className={`rounded-full p-2 ${statusStyles[status]}`}>
					<Icon className="size-4" />
				</div>
				<div className="absolute top-10 h-full w-px bg-border group-last:hidden" />
			</div>
			<div className="flex-1 space-y-1 pt-0.5">
				<div className="flex items-center justify-between">
					<p className="text-sm font-medium">{label}</p>
					<span className="text-xs text-muted-foreground">{time}</span>
				</div>
				<p className="text-2xl font-bold tracking-tight">{value}</p>
			</div>
		</div>
	);
};

export default function Main() {
	const stats: TimelineStatProps[] = [
		{
			icon: CreditCard,
			label: 'Orders Placed',
			value: '2,847',
			time: 'Today',
			status: 'completed',
		},
		{
			icon: Package,
			label: 'Processing',
			value: '428',
			time: 'In progress',
			status: 'active',
		},
		{
			icon: Clock,
			label: 'Shipped',
			value: '1,892',
			time: 'Last 24h',
			status: 'completed',
		},
		{
			icon: CheckCircle,
			label: 'Delivered',
			value: '12,847',
			time: 'This month',
			status: 'completed',
		},
		{
			icon: RotateCcw,
			label: 'Returns',
			value: '142',
			time: 'Pending',
			status: 'pending',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="p-6 @md:p-8">
					{stats.map((stat, i) => (
						<TimelineStat key={i} {...stat} />
					))}
				</Card>
			</div>
		</section>
	);
}
