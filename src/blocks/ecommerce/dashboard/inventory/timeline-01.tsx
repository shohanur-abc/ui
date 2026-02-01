'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	ArrowRightLeft,
	Plus,
	Minus,
	History,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ActivityType =
	| 'received'
	| 'shipped'
	| 'adjusted'
	| 'transferred'
	| 'returned';

type ActivityItem = {
	id: string;
	type: ActivityType;
	productName: string;
	productSku: string;
	quantity: number;
	timestamp: string;
	user: {
		name: string;
		avatar: string;
	};
	details: string;
};

type ActivityRowProps = {
	activity: ActivityItem;
	typeLabels: Record<ActivityType, string>;
};

const ActivityRow = ({ activity, typeLabels }: ActivityRowProps) => {
	const config: Record<
		ActivityType,
		{ icon: React.ElementType; color: string; bgColor: string }
	> = {
		received: {
			icon: Plus,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500/10',
		},
		shipped: { icon: Minus, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
		adjusted: {
			icon: History,
			color: 'text-yellow-500',
			bgColor: 'bg-yellow-500/10',
		},
		transferred: {
			icon: ArrowRightLeft,
			color: 'text-purple-500',
			bgColor: 'bg-purple-500/10',
		},
		returned: {
			icon: Package,
			color: 'text-orange-500',
			bgColor: 'bg-orange-500/10',
		},
	};

	const { icon: Icon, color, bgColor } = config[activity.type];

	return (
		<div className="relative flex gap-4 pb-6 last:pb-0">
			<div className="absolute bottom-0 left-5 top-12 w-px bg-border last:hidden" />
			<div
				className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ${bgColor}`}
			>
				<Icon className={`size-5 ${color}`} />
			</div>
			<div className="flex-1 space-y-1">
				<div className="flex items-start justify-between gap-2">
					<div>
						<p className="font-medium">{activity.productName}</p>
						<p className="text-sm text-muted-foreground">
							{activity.productSku}
						</p>
					</div>
					<Badge variant="outline">{typeLabels[activity.type]}</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{activity.details}</p>
				<div className="flex items-center gap-3 pt-1">
					<div className="flex items-center gap-2">
						<Avatar className="size-5">
							<AvatarImage src={activity.user.avatar} />
							<AvatarFallback className="text-[10px]">
								{activity.user.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<span className="text-xs text-muted-foreground">
							{activity.user.name}
						</span>
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Clock className="size-3" />
						{new Date(activity.timestamp).toLocaleString()}
					</div>
				</div>
			</div>
			<div className="text-right">
				<span
					className={`font-semibold tabular-nums ${activity.type === 'received' || activity.type === 'returned' ? 'text-emerald-500' : activity.type === 'shipped' ? 'text-red-500' : ''}`}
				>
					{activity.type === 'received' || activity.type === 'returned'
						? '+'
						: activity.type === 'shipped'
							? '-'
							: ''}
					{activity.quantity}
				</span>
				<p className="text-xs text-muted-foreground">units</p>
			</div>
		</div>
	);
};

export default function Main() {
	const activities: ActivityItem[] = [
		{
			id: '1',
			type: 'received',
			productName: 'Wireless Headphones',
			productSku: 'WH-001',
			quantity: 500,
			timestamp: '2024-01-18T14:30:00',
			user: { name: 'John Smith', avatar: '' },
			details: 'Received from supplier ABC Corp - PO #12345',
		},
		{
			id: '2',
			type: 'shipped',
			productName: 'USB-C Hub',
			productSku: 'UCH-002',
			quantity: 25,
			timestamp: '2024-01-18T12:15:00',
			user: { name: 'Sarah Johnson', avatar: '' },
			details: 'Fulfilled order #ORD-2024-5678',
		},
		{
			id: '3',
			type: 'adjusted',
			productName: 'Mechanical Keyboard',
			productSku: 'MK-003',
			quantity: 12,
			timestamp: '2024-01-18T10:00:00',
			user: { name: 'Mike Davis', avatar: '' },
			details: 'Inventory count adjustment - damaged items removed',
		},
		{
			id: '4',
			type: 'transferred',
			productName: 'Gaming Mouse',
			productSku: 'GM-004',
			quantity: 100,
			timestamp: '2024-01-17T16:45:00',
			user: { name: 'Emily Brown', avatar: '' },
			details: 'Transferred from Warehouse A to Store NYC',
		},
		{
			id: '5',
			type: 'returned',
			productName: 'Bluetooth Speaker',
			productSku: 'BS-005',
			quantity: 8,
			timestamp: '2024-01-17T09:30:00',
			user: { name: 'Tom Wilson', avatar: '' },
			details: 'Customer return - Order #ORD-2024-4321',
		},
	];

	const typeLabels: Record<ActivityType, string> = {
		received: 'Received',
		shipped: 'Shipped',
		adjusted: 'Adjusted',
		transferred: 'Transferred',
		returned: 'Returned',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Recent Activity
						</CardTitle>
						<CardDescription>
							Track all inventory movements and changes
						</CardDescription>
					</CardHeader>
					<CardContent>
						{activities.map((activity) => (
							<ActivityRow
								key={activity.id}
								activity={activity}
								typeLabels={typeLabels}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
