'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	AlertTriangle,
	CheckCircle2,
	XCircle,
	MoreHorizontal,
	Eye,
	Pencil,
	RotateCcw,
	Trash2,
	Calendar,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProductChange {
	id: string;
	productId: string;
	productName: string;
	productSku: string;
	productImage: string;
	changeType: 'create' | 'update' | 'delete' | 'restore';
	status: 'pending' | 'approved' | 'rejected';
	fields: string[];
	author: { name: string; avatar: string };
	createdAt: string;
	reviewedAt?: string;
	reviewer?: { name: string; avatar: string };
}

interface ChangeTypeBadgeProps {
	type: 'create' | 'update' | 'delete' | 'restore';
	labels: Record<'create' | 'update' | 'delete' | 'restore', string>;
}

const ChangeTypeBadge = ({ type, labels }: ChangeTypeBadgeProps) => {
	const config = {
		create: { className: 'bg-emerald-500 hover:bg-emerald-600', icon: CheckCircle2 },
		update: { className: 'bg-blue-500 hover:bg-blue-600', icon: Pencil },
		delete: { className: 'bg-red-500 hover:bg-red-600', icon: Trash2 },
		restore: { className: 'bg-amber-500 hover:bg-amber-600', icon: RotateCcw },
	};

	const { className, icon: Icon } = config[type];

	return (
		<Badge className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{labels[type]}
		</Badge>
	);
};

interface StatusBadgeProps {
	status: 'pending' | 'approved' | 'rejected';
	labels: Record<'pending' | 'approved' | 'rejected', string>;
}

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const config = {
		pending: { variant: 'secondary' as const, icon: Clock },
		approved: { variant: 'default' as const, icon: CheckCircle2 },
		rejected: { variant: 'outline' as const, icon: XCircle },
	};

	const { variant, icon: Icon } = config[status];

	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{labels[status]}
		</Badge>
	);
};

interface FieldsListProps {
	fields: string[];
	maxShow?: number;
}

const FieldsList = ({ fields, maxShow = 3 }: FieldsListProps) => (
	<div className="flex flex-wrap gap-1">
		{fields.slice(0, maxShow).map((field) => (
			<Badge key={field} variant="outline" className="text-xs">
				{field}
			</Badge>
		))}
		{fields.length > maxShow && (
			<Badge variant="outline" className="text-xs">
				+{fields.length - maxShow}
			</Badge>
		)}
	</div>
);

interface UserDisplayProps {
	user: { name: string; avatar: string };
	label: string;
	timestamp: string;
}

const UserDisplay = ({ user, label, timestamp }: UserDisplayProps) => (
	<div className="flex items-center gap-2">
		<Avatar className="size-6">
			<AvatarImage src={user.avatar} alt={user.name} />
			<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
		</Avatar>
		<div className="text-xs">
			<span className="text-muted-foreground">{label} </span>
			<span className="font-medium">{user.name}</span>
			<span className="text-muted-foreground"> • {timestamp}</span>
		</div>
	</div>
);

interface ProductChangeRowProps {
	change: ProductChange;
	actions: { label: string; icon: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
	labels: {
		changeTypes: Record<'create' | 'update' | 'delete' | 'restore', string>;
		statuses: Record<'pending' | 'approved' | 'rejected', string>;
		createdBy: string;
		reviewedBy: string;
	};
}

const ProductChangeRow = ({ change, actions, labels }: ProductChangeRowProps) => {
	const formatTime = (dateStr: string) => {
		const date = new Date(dateStr);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		return `${diffDays}d ago`;
	};

	return (
		<div className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md @md:flex-row @md:items-center">
			<div className="flex items-center gap-3 @md:w-80">
				<div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
					{change.productImage ? (
						<img
							src={change.productImage}
							alt={change.productName}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-6 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="min-w-0 flex-1">
					<h3 className="truncate font-medium">{change.productName}</h3>
					<p className="text-xs text-muted-foreground">{change.productSku}</p>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 @md:flex-1">
				<ChangeTypeBadge type={change.changeType} labels={labels.changeTypes} />
				<StatusBadge status={change.status} labels={labels.statuses} />
			</div>
			<div className="@md:w-48">
				<FieldsList fields={change.fields} />
			</div>
			<div className="space-y-1 text-right @md:w-48">
				<UserDisplay
					user={change.author}
					label={labels.createdBy}
					timestamp={formatTime(change.createdAt)}
				/>
				{change.reviewer && change.reviewedAt && (
					<UserDisplay
						user={change.reviewer}
						label={labels.reviewedBy}
						timestamp={formatTime(change.reviewedAt)}
					/>
				)}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action) => (
						<React.Fragment key={action.label}>
							{action.variant === 'destructive' && <DropdownMenuSeparator />}
							<DropdownMenuItem
								onClick={() => action.onClick(change.id)}
								className={action.variant === 'destructive' ? 'text-destructive' : ''}
							>
								<action.icon className="mr-2 size-4" />
								{action.label}
							</DropdownMenuItem>
						</React.Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default function Main() {
	const changes: ProductChange[] = [
		{
			id: '1',
			productId: 'p1',
			productName: 'Organic Green Tea Collection',
			productSku: 'TEA-ORG-001',
			productImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop',
			changeType: 'update',
			status: 'pending',
			fields: ['Price', 'Description', 'Images', 'SEO'],
			author: { name: 'Sarah Johnson', avatar: '' },
			createdAt: new Date(Date.now() - 1800000).toISOString(),
		},
		{
			id: '2',
			productId: 'p2',
			productName: 'Premium Coffee Beans',
			productSku: 'COF-PRE-002',
			productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop',
			changeType: 'create',
			status: 'approved',
			fields: ['All Fields'],
			author: { name: 'Mike Chen', avatar: '' },
			createdAt: new Date(Date.now() - 7200000).toISOString(),
			reviewedAt: new Date(Date.now() - 3600000).toISOString(),
			reviewer: { name: 'Admin', avatar: '' },
		},
		{
			id: '3',
			productId: 'p3',
			productName: 'Ceramic Tea Set',
			productSku: 'SET-CER-003',
			productImage: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=100&h=100&fit=crop',
			changeType: 'delete',
			status: 'rejected',
			fields: ['Product Deletion'],
			author: { name: 'John Doe', avatar: '' },
			createdAt: new Date(Date.now() - 86400000).toISOString(),
			reviewedAt: new Date(Date.now() - 43200000).toISOString(),
			reviewer: { name: 'Admin', avatar: '' },
		},
		{
			id: '4',
			productId: 'p4',
			productName: 'Herbal Infusion Pack',
			productSku: 'HRB-INF-004',
			productImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=100&h=100&fit=crop',
			changeType: 'restore',
			status: 'pending',
			fields: ['Restore from Archive'],
			author: { name: 'Emily White', avatar: '' },
			createdAt: new Date(Date.now() - 900000).toISOString(),
		},
		{
			id: '5',
			productId: 'p5',
			productName: 'Bamboo Strainer Set',
			productSku: 'ACC-BAM-005',
			productImage: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=100&h=100&fit=crop',
			changeType: 'update',
			status: 'approved',
			fields: ['Stock', 'Variants'],
			author: { name: 'David Lee', avatar: '' },
			createdAt: new Date(Date.now() - 172800000).toISOString(),
			reviewedAt: new Date(Date.now() - 86400000).toISOString(),
			reviewer: { name: 'Sarah Johnson', avatar: '' },
		},
	];

	const actions = [
		{ label: 'View Changes', icon: Eye, onClick: (id: string) => console.log('View', id) },
		{ label: 'Approve', icon: CheckCircle2, onClick: (id: string) => console.log('Approve', id) },
		{ label: 'Reject', icon: XCircle, onClick: (id: string) => console.log('Reject', id), variant: 'destructive' as const },
	];

	const labels = {
		changeTypes: { create: 'New', update: 'Update', delete: 'Delete', restore: 'Restore' },
		statuses: { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' },
		createdBy: 'by',
		reviewedBy: 'reviewed by',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-2 px-4 py-8 @sm:px-6 @2xl:px-8">
				{changes.map((change) => (
					<ProductChangeRow
						key={change.id}
						change={change}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
