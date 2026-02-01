'use client';

import * as React from 'react';
import {
	Package,
	Calendar,
	User,
	FileText,
	CheckCircle,
	XCircle,
	Clock,
	AlertTriangle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type AuditStatus = 'completed' | 'in-progress' | 'scheduled' | 'failed';

type Audit = {
	id: string;
	name: string;
	type: 'full' | 'cycle' | 'spot';
	location: string;
	scheduledDate: string;
	completedDate?: string;
	assignee: string;
	status: AuditStatus;
	accuracy?: number;
	discrepancies?: number;
};

type AuditRowProps = {
	audit: Audit;
};

const AuditRow = ({ audit }: AuditRowProps) => {
	const statusConfig = {
		completed: {
			icon: <CheckCircle className="size-5 text-emerald-500" />,
			variant: 'outline' as const,
		},
		'in-progress': {
			icon: <Clock className="size-5 text-blue-500" />,
			variant: 'default' as const,
		},
		scheduled: {
			icon: <Calendar className="size-5 text-muted-foreground" />,
			variant: 'secondary' as const,
		},
		failed: {
			icon: <XCircle className="size-5 text-destructive" />,
			variant: 'destructive' as const,
		},
	};

	const typeConfig = {
		full: { label: 'Full Audit', color: 'bg-purple-500' },
		cycle: { label: 'Cycle Count', color: 'bg-blue-500' },
		spot: { label: 'Spot Check', color: 'bg-amber-500' },
	};

	const { icon, variant } = statusConfig[audit.status];
	const { label: typeLabel, color: typeColor } = typeConfig[audit.type];

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			{icon}
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<p className="truncate font-medium">{audit.name}</p>
					<Badge variant="secondary" className="text-xs">
						<span className={`mr-1 size-2 rounded-full ${typeColor}`} />
						{typeLabel}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">{audit.location}</p>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">Scheduled</p>
				<p className="font-medium">
					{new Date(audit.scheduledDate).toLocaleDateString()}
				</p>
			</div>
			<div className="flex items-center gap-2">
				<Avatar className="size-6">
					<AvatarFallback className="text-xs">
						{audit.assignee
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<span className="hidden text-sm @sm:inline">{audit.assignee}</span>
			</div>
			{audit.accuracy !== undefined && (
				<div className="text-center">
					<p className="text-xs text-muted-foreground">Accuracy</p>
					<p
						className={`font-semibold ${audit.accuracy >= 98 ? 'text-emerald-500' : audit.accuracy >= 95 ? 'text-amber-500' : 'text-destructive'}`}
					>
						{audit.accuracy}%
					</p>
				</div>
			)}
			{audit.discrepancies !== undefined && (
				<div className="text-center">
					<p className="text-xs text-muted-foreground">Issues</p>
					<p
						className={`font-semibold ${audit.discrepancies > 0 ? 'text-amber-500' : 'text-emerald-500'}`}
					>
						{audit.discrepancies}
					</p>
				</div>
			)}
			<Badge variant={variant}>{audit.status.replace('-', ' ')}</Badge>
		</div>
	);
};

export default function Main() {
	const audits: Audit[] = [
		{
			id: '1',
			name: 'Q1 Full Inventory Audit',
			type: 'full',
			location: 'All Warehouses',
			scheduledDate: '2024-01-25',
			assignee: 'John Smith',
			status: 'scheduled',
		},
		{
			id: '2',
			name: 'Electronics Cycle Count',
			type: 'cycle',
			location: 'WH-001 Zone A',
			scheduledDate: '2024-01-18',
			assignee: 'Sarah Johnson',
			status: 'in-progress',
			accuracy: 96,
		},
		{
			id: '3',
			name: 'High-Value Items Check',
			type: 'spot',
			location: 'WH-001',
			scheduledDate: '2024-01-15',
			completedDate: '2024-01-15',
			assignee: 'Mike Chen',
			status: 'completed',
			accuracy: 99,
			discrepancies: 2,
		},
		{
			id: '4',
			name: 'Accessories Count',
			type: 'cycle',
			location: 'WH-002',
			scheduledDate: '2024-01-12',
			completedDate: '2024-01-12',
			assignee: 'Lisa Wang',
			status: 'completed',
			accuracy: 97,
			discrepancies: 8,
		},
		{
			id: '5',
			name: 'Receiving Area Audit',
			type: 'spot',
			location: 'WH-001 Receiving',
			scheduledDate: '2024-01-10',
			assignee: 'Tom Brown',
			status: 'failed',
			accuracy: 82,
			discrepancies: 23,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Audit Schedule
								</CardTitle>
								<CardDescription>
									Stock counts and inventory audits
								</CardDescription>
							</div>
							<Button>
								<FileText className="mr-2 size-4" />
								Schedule Audit
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						{audits.map((audit) => (
							<AuditRow key={audit.id} audit={audit} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
