import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Package, Clock, User, ArrowRight, MoreHorizontal } from 'lucide-react';

interface WarehouseStaffCard {
	id: string;
	name: string;
	avatar: string;
	initials: string;
	role: string;
	ordersProcessed: number;
	ordersInProgress: number;
	avgProcessTime: string;
	status: 'active' | 'break' | 'offline';
	performance: 'excellent' | 'good' | 'needs-improvement';
}

interface StaffGridCardProps {
	staff: WarehouseStaffCard;
	labels: {
		processed: string;
		inProgress: string;
		avgTime: string;
		assign: string;
	};
}

const StatusIndicator = ({
	status,
}: {
	status: WarehouseStaffCard['status'];
}) => {
	const config: Record<
		WarehouseStaffCard['status'],
		{ className: string; label: string }
	> = {
		active: { className: 'bg-accent', label: 'Active' },
		break: { className: 'bg-yellow-500', label: 'On Break' },
		offline: { className: 'bg-muted-foreground', label: 'Offline' },
	};
	const { className, label } = config[status];
	return (
		<div className="flex items-center gap-1.5">
			<span className={`size-2 rounded-full ${className}`} />
			<span className="text-xs text-muted-foreground">{label}</span>
		</div>
	);
};

const PerformanceBadge = ({
	performance,
}: {
	performance: WarehouseStaffCard['performance'];
}) => {
	const config: Record<
		WarehouseStaffCard['performance'],
		{ className: string; label: string }
	> = {
		excellent: {
			className: 'bg-accent/10 text-accent border-accent/30',
			label: '⭐ Excellent',
		},
		good: {
			className: 'bg-primary/10 text-primary border-primary/30',
			label: 'Good',
		},
		'needs-improvement': {
			className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
			label: 'Needs Improvement',
		},
	};
	const { className, label } = config[performance];
	return (
		<Badge variant="outline" className={`text-xs ${className}`}>
			{label}
		</Badge>
	);
};

const StaffGridCard = ({ staff, labels }: StaffGridCardProps) => (
	<Card
		className={`border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all ${staff.status === 'offline' ? 'opacity-60' : ''}`}
	>
		<CardContent className="p-4">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="relative">
						<Avatar className="size-12">
							<AvatarImage src={staff.avatar} alt={staff.name} />
							<AvatarFallback className="bg-primary/10 text-primary font-semibold">
								{staff.initials}
							</AvatarFallback>
						</Avatar>
						<div
							className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-background ${staff.status === 'active' ? 'bg-accent' : staff.status === 'break' ? 'bg-yellow-500' : 'bg-muted'}`}
						/>
					</div>
					<div>
						<p className="font-semibold">{staff.name}</p>
						<p className="text-xs text-muted-foreground">{staff.role}</p>
					</div>
				</div>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</div>

			<div className="flex items-center justify-between mb-4">
				<StatusIndicator status={staff.status} />
				<PerformanceBadge performance={staff.performance} />
			</div>

			<div className="grid grid-cols-3 gap-2 mb-4">
				<div className="p-2 rounded-lg bg-muted/30 text-center">
					<p className="text-lg font-bold">{staff.ordersProcessed}</p>
					<p className="text-xs text-muted-foreground">{labels.processed}</p>
				</div>
				<div className="p-2 rounded-lg bg-muted/30 text-center">
					<p className="text-lg font-bold">{staff.ordersInProgress}</p>
					<p className="text-xs text-muted-foreground">{labels.inProgress}</p>
				</div>
				<div className="p-2 rounded-lg bg-muted/30 text-center">
					<p className="text-lg font-bold">{staff.avgProcessTime}</p>
					<p className="text-xs text-muted-foreground">{labels.avgTime}</p>
				</div>
			</div>

			<Button
				variant="outline"
				size="sm"
				className="w-full gap-1.5"
				disabled={staff.status === 'offline'}
			>
				{labels.assign}
				<ArrowRight className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		processed: 'Done',
		inProgress: 'Active',
		avgTime: 'Avg Time',
		assign: 'Assign Orders',
	};

	const staff: WarehouseStaffCard[] = [
		{
			id: 'STF-001',
			name: 'John Smith',
			avatar: '',
			initials: 'JS',
			role: 'Picker',
			ordersProcessed: 45,
			ordersInProgress: 8,
			avgProcessTime: '4.2m',
			status: 'active',
			performance: 'excellent',
		},
		{
			id: 'STF-002',
			name: 'Maria Garcia',
			avatar: '',
			initials: 'MG',
			role: 'Packer',
			ordersProcessed: 38,
			ordersInProgress: 5,
			avgProcessTime: '5.1m',
			status: 'active',
			performance: 'good',
		},
		{
			id: 'STF-003',
			name: 'Alex Chen',
			avatar: '',
			initials: 'AC',
			role: 'Picker',
			ordersProcessed: 52,
			ordersInProgress: 0,
			avgProcessTime: '3.8m',
			status: 'break',
			performance: 'excellent',
		},
		{
			id: 'STF-004',
			name: 'Emily Brown',
			avatar: '',
			initials: 'EB',
			role: 'Packer',
			ordersProcessed: 28,
			ordersInProgress: 0,
			avgProcessTime: '6.5m',
			status: 'offline',
			performance: 'needs-improvement',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					{staff.map((s) => (
						<StaffGridCard key={s.id} staff={s} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
