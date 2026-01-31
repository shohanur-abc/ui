import {
	MoreHorizontal,
	Search,
	Filter,
	Download,
	Mail,
	Phone,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	status: 'active' | 'inactive' | 'pending';
	totalOrders: number;
	totalSpent: string;
	joinedDate: string;
}

interface ActionItem {
	label: string;
	onClick?: () => void;
}

const Header = ({
	title,
	searchPlaceholder,
	actions,
}: {
	title: string;
	searchPlaceholder: string;
	actions: { label: string; icon: React.ElementType; variant?: 'outline' | 'default' }[];
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<h2 className="text-xl font-semibold tracking-tight">{title}</h2>
		<div className="flex flex-col gap-3 @sm:flex-row @sm:items-center">
			<div className="relative">
				<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-64" />
			</div>
			<div className="flex gap-2">
				{actions.map((action, i) => (
					<Button key={i} variant={action.variant || 'outline'} size="sm" className="gap-2">
						<action.icon className="size-4" />
						<span className="hidden @md:inline">{action.label}</span>
					</Button>
				))}
			</div>
		</div>
	</div>
);

const StatusBadge = ({ status }: { status: Customer['status'] }) => {
	const variants = {
		active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		inactive: 'bg-red-500/10 text-red-500 border-red-500/20',
		pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	};
	return (
		<Badge variant="outline" className={variants[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const CustomerRow = ({
	customer,
	actionItems,
}: {
	customer: Customer;
	actionItems: ActionItem[];
}) => (
	<TableRow className="group hover:bg-muted/50 transition-colors">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9 ring-2 ring-border">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{customer.name}</p>
					<p className="text-muted-foreground text-sm">{customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<div className="text-muted-foreground flex items-center gap-2 text-sm">
				<Phone className="size-3.5" />
				{customer.phone}
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<StatusBadge status={customer.status} />
		</TableCell>
		<TableCell className="hidden @md:table-cell text-right">
			{customer.totalOrders}
		</TableCell>
		<TableCell className="text-right font-medium">{customer.totalSpent}</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{customer.joinedDate}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon-sm"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actionItems.map((item, i) => (
						<DropdownMenuItem key={i} onClick={item.onClick}>
							{item.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const CustomerTable = ({
	customers,
	actionItems,
	columns,
}: {
	customers: Customer[];
	actionItems: ActionItem[];
	columns: { key: string; label: string; className?: string }[];
}) => (
	<Table>
		<TableHeader>
			<TableRow className="hover:bg-transparent">
				<TableHead className="w-12">
					<Checkbox />
				</TableHead>
				{columns.map((col) => (
					<TableHead key={col.key} className={col.className}>
						{col.label}
					</TableHead>
				))}
				<TableHead className="w-12" />
			</TableRow>
		</TableHeader>
		<TableBody>
			{customers.map((customer) => (
				<CustomerRow key={customer.id} customer={customer} actionItems={actionItems} />
			))}
		</TableBody>
	</Table>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: '1',
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			phone: '+1 234 567 8901',
			initials: 'SJ',
			status: 'active',
			totalOrders: 24,
			totalSpent: '$2,456.00',
			joinedDate: 'Jan 12, 2024',
		},
		{
			id: '2',
			name: 'Michael Chen',
			email: 'michael.c@email.com',
			phone: '+1 234 567 8902',
			initials: 'MC',
			status: 'active',
			totalOrders: 18,
			totalSpent: '$1,892.50',
			joinedDate: 'Feb 8, 2024',
		},
		{
			id: '3',
			name: 'Emily Davis',
			email: 'emily.d@email.com',
			phone: '+1 234 567 8903',
			initials: 'ED',
			status: 'pending',
			totalOrders: 5,
			totalSpent: '$324.00',
			joinedDate: 'Mar 1, 2024',
		},
		{
			id: '4',
			name: 'James Wilson',
			email: 'james.w@email.com',
			phone: '+1 234 567 8904',
			initials: 'JW',
			status: 'inactive',
			totalOrders: 12,
			totalSpent: '$1,100.00',
			joinedDate: 'Dec 15, 2023',
		},
		{
			id: '5',
			name: 'Lisa Thompson',
			email: 'lisa.t@email.com',
			phone: '+1 234 567 8905',
			initials: 'LT',
			status: 'active',
			totalOrders: 32,
			totalSpent: '$4,567.00',
			joinedDate: 'Nov 20, 2023',
		},
	];

	const headerActions = [
		{ label: 'Filter', icon: Filter, variant: 'outline' as const },
		{ label: 'Export', icon: Download, variant: 'outline' as const },
	];

	const actionItems: ActionItem[] = [
		{ label: 'View profile' },
		{ label: 'Send email' },
		{ label: 'View orders' },
		{ label: 'Edit customer' },
	];

	const columns = [
		{ key: 'customer', label: 'Customer' },
		{ key: 'phone', label: 'Phone', className: 'hidden @xl:table-cell' },
		{ key: 'status', label: 'Status', className: 'hidden @lg:table-cell' },
		{ key: 'orders', label: 'Orders', className: 'hidden @md:table-cell text-right' },
		{ key: 'spent', label: 'Total Spent', className: 'text-right' },
		{ key: 'joined', label: 'Joined', className: 'hidden @xl:table-cell' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<Header
					title="Customers"
					searchPlaceholder="Search customers..."
					actions={headerActions}
				/>
				<div className="rounded-xl border bg-card">
					<CustomerTable
						customers={customers}
						actionItems={actionItems}
						columns={columns}
					/>
				</div>
			</div>
		</section>
	);
}
