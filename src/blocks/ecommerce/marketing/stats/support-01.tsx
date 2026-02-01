import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MessageSquare,
	Clock,
	CheckCircle,
	Star,
	HeadphonesIcon,
} from 'lucide-react';

interface SupportStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface TicketCategoryProps {
	category: string;
	count: string;
	avgResolution: string;
}

const SupportMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: SupportStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<div className="mt-4 flex items-end justify-between">
			<p className="text-2xl font-bold">{value}</p>
			<Badge variant={positive ? 'default' : 'destructive'}>{change}</Badge>
		</div>
	</Card>
);

const CategoryRow = ({
	category,
	count,
	avgResolution,
}: TicketCategoryProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1">
			<p className="font-medium">{category}</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{count}</p>
			<p className="text-xs text-muted-foreground">{avgResolution}</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: SupportStatProps[] = [
		{
			icon: MessageSquare,
			label: 'Open Tickets',
			value: '284',
			change: '-12%',
			positive: true,
		},
		{
			icon: Clock,
			label: 'Avg. Response',
			value: '2.4h',
			change: '-18min',
			positive: true,
		},
		{
			icon: CheckCircle,
			label: 'Resolution Rate',
			value: '94%',
			change: '+2%',
			positive: true,
		},
		{
			icon: Star,
			label: 'CSAT Score',
			value: '4.8',
			change: '+0.2',
			positive: true,
		},
	];

	const categories: TicketCategoryProps[] = [
		{ category: 'Shipping Issues', count: '84', avgResolution: '4.2h avg' },
		{ category: 'Returns & Refunds', count: '62', avgResolution: '6.8h avg' },
		{ category: 'Product Questions', count: '48', avgResolution: '1.4h avg' },
		{ category: 'Payment Issues', count: '42', avgResolution: '2.1h avg' },
		{ category: 'Account Support', count: '28', avgResolution: '0.8h avg' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<SupportMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<HeadphonesIcon className="size-4 text-primary" />
							<h3 className="font-semibold">By Category</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{categories.map((cat, i) => (
								<CategoryRow key={i} {...cat} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
