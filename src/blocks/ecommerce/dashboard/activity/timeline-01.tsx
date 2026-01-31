import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ShoppingCart,
	Package,
	CreditCard,
	Truck,
	CheckCircle,
	type LucideIcon,
} from 'lucide-react';

interface ActivityItem {
	id: string;
	user: {
		name: string;
		avatar?: string;
		initials: string;
	};
	action: string;
	target: string;
	timestamp: string;
	icon: LucideIcon;
	status: 'success' | 'pending' | 'processing';
}

interface TimelineProps {
	title: string;
	items: ActivityItem[];
}

const StatusBadge = ({
	status,
}: { status: 'success' | 'pending' | 'processing' }) => {
	const variants = {
		success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		processing: 'bg-primary/20 text-primary border-primary/30',
	};

	const labels = {
		success: 'Completed',
		pending: 'Pending',
		processing: 'Processing',
	};

	return (
		<Badge variant="outline" className={variants[status]}>
			{labels[status]}
		</Badge>
	);
};

const TimelineItem = ({ item }: { item: ActivityItem }) => {
	const Icon = item.icon;

	return (
		<div className="group relative flex gap-4 pb-8 last:pb-0">
			<div className="relative flex flex-col items-center">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm shadow-primary/10 transition-all group-hover:border-primary/50 group-hover:shadow-primary/20">
					<Icon className="size-4 text-primary" />
				</div>
				<div className="absolute top-10 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-border to-transparent group-last:hidden" />
			</div>
			<div className="flex flex-1 flex-col gap-2 pt-1">
				<div className="flex flex-wrap items-center gap-2">
					<Avatar className="size-6">
						<AvatarImage src={item.user.avatar} alt={item.user.name} />
						<AvatarFallback className="text-xs bg-secondary">
							{item.user.initials}
						</AvatarFallback>
					</Avatar>
					<span className="font-medium text-foreground">{item.user.name}</span>
					<span className="text-muted-foreground">{item.action}</span>
					<span className="font-medium text-primary">{item.target}</span>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-xs text-muted-foreground">{item.timestamp}</span>
					<StatusBadge status={item.status} />
				</div>
			</div>
		</div>
	);
};

const Timeline = ({ title, items }: TimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader>
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-0">
				{items.map((item) => (
					<TimelineItem key={item.id} item={item} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const activities: ActivityItem[] = [
		{
			id: '1',
			user: { name: 'Sarah Chen', initials: 'SC' },
			action: 'placed order',
			target: '#ORD-2024-001',
			timestamp: '2 minutes ago',
			icon: ShoppingCart,
			status: 'processing',
		},
		{
			id: '2',
			user: { name: 'Mike Johnson', initials: 'MJ' },
			action: 'payment confirmed for',
			target: '#ORD-2024-002',
			timestamp: '15 minutes ago',
			icon: CreditCard,
			status: 'success',
		},
		{
			id: '3',
			user: { name: 'Emily Davis', initials: 'ED' },
			action: 'order shipped',
			target: '#ORD-2024-003',
			timestamp: '1 hour ago',
			icon: Truck,
			status: 'processing',
		},
		{
			id: '4',
			user: { name: 'Alex Kim', initials: 'AK' },
			action: 'package prepared',
			target: '#ORD-2024-004',
			timestamp: '2 hours ago',
			icon: Package,
			status: 'pending',
		},
		{
			id: '5',
			user: { name: 'Jordan Lee', initials: 'JL' },
			action: 'order delivered',
			target: '#ORD-2024-005',
			timestamp: '3 hours ago',
			icon: CheckCircle,
			status: 'success',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<Timeline title="Recent Activity" items={activities} />
			</div>
		</section>
	);
}
