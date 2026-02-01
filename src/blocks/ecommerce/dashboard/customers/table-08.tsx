import {
	Ban,
	CheckCircle,
	ChevronDown,
	Edit,
	Mail,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	Shield,
	ShieldAlert,
	ShieldCheck,
	Trash2,
	User,
	UserCheck,
	UserCog,
	UserX,
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
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	role: 'customer' | 'vip' | 'wholesale' | 'admin';
	status: 'active' | 'suspended' | 'pending' | 'banned';
	verified: boolean;
	createdAt: string;
	lastLogin: string;
}

const PageHeader = ({
	title,
	subtitle,
	action,
}: {
	title: string;
	subtitle: string;
	action: { label: string; icon: React.ElementType };
}) => (
	<div className="flex flex-col gap-4 @md:flex-row @md:items-start @md:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<Button className="gap-2">
			<action.icon className="size-4" />
			{action.label}
		</Button>
	</div>
);

const FilterBar = ({
	searchPlaceholder,
	filters,
}: {
	searchPlaceholder: string;
	filters: { label: string; options: string[] }[];
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center">
		<div className="relative flex-1">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="max-w-sm pl-9" />
		</div>
		<div className="flex flex-wrap gap-2">
			{filters.map((filter, i) => (
				<Select key={i}>
					<SelectTrigger className="w-[130px]">
						<SelectValue placeholder={filter.label} />
					</SelectTrigger>
					<SelectContent>
						{filter.options.map((option) => (
							<SelectItem key={option} value={option.toLowerCase()}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			))}
		</div>
	</div>
);

const RoleBadge = ({ role }: { role: Customer['role'] }) => {
	const config = {
		customer: {
			label: 'Customer',
			icon: User,
			className: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
		},
		vip: {
			label: 'VIP',
			icon: Shield,
			className: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
		},
		wholesale: {
			label: 'Wholesale',
			icon: ShieldCheck,
			className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
		},
		admin: {
			label: 'Admin',
			icon: ShieldAlert,
			className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		},
	};
	const Icon = config[role].icon;
	return (
		<Badge variant="outline" className={`${config[role].className} gap-1`}>
			<Icon className="size-3" />
			{config[role].label}
		</Badge>
	);
};

const StatusIndicator = ({ status }: { status: Customer['status'] }) => {
	const config = {
		active: { color: 'bg-emerald-500', label: 'Active' },
		suspended: { color: 'bg-amber-500', label: 'Suspended' },
		pending: { color: 'bg-blue-500', label: 'Pending' },
		banned: { color: 'bg-red-500', label: 'Banned' },
	};
	return (
		<div className="flex items-center gap-2">
			<div className={`size-2 rounded-full ${config[status].color}`} />
			<span className="text-sm">{config[status].label}</span>
		</div>
	);
};

const CustomerRow = ({ customer }: { customer: Customer }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative">
					<Avatar className="size-9">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary text-xs">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					{customer.verified && (
						<CheckCircle className="absolute -right-0.5 -bottom-0.5 size-4 text-emerald-500 fill-background" />
					)}
				</div>
				<div>
					<p className="font-medium">{customer.name}</p>
					<p className="text-muted-foreground text-xs">{customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell text-muted-foreground text-sm">
			{customer.phone}
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<RoleBadge role={customer.role} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<StatusIndicator status={customer.status} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{customer.createdAt}
		</TableCell>
		<TableCell className="hidden @2xl:table-cell text-muted-foreground text-sm">
			{customer.lastLogin}
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
					<DropdownMenuLabel>Manage User</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Edit className="mr-2 size-4" />
						Edit profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<UserCog className="mr-2 size-4" />
						Change role
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Mail className="mr-2 size-4" />
						Send email
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{customer.status === 'active' ? (
						<DropdownMenuItem className="text-amber-500">
							<UserX className="mr-2 size-4" />
							Suspend user
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem className="text-emerald-500">
							<UserCheck className="mr-2 size-4" />
							Activate user
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className="text-destructive">
						<Ban className="mr-2 size-4" />
						Ban user
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const BulkActions = ({ selectedCount }: { selectedCount: number }) => (
	<div className="flex items-center gap-3 border-t px-6 py-3 bg-muted/50">
		<span className="text-muted-foreground text-sm">
			{selectedCount} selected
		</span>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Mail className="size-4" />
				Email
			</Button>
			<Button variant="outline" size="sm" className="gap-2">
				<UserCog className="size-4" />
				Change Role
			</Button>
			<Button
				variant="outline"
				size="sm"
				className="gap-2 text-destructive hover:text-destructive"
			>
				<Trash2 className="size-4" />
				Delete
			</Button>
		</div>
	</div>
);

export default function Main() {
	const customers: Customer[] = [
		{
			id: '1',
			name: 'Alice Williams',
			email: 'alice.w@email.com',
			phone: '+1 234 567 8901',
			initials: 'AW',
			role: 'vip',
			status: 'active',
			verified: true,
			createdAt: 'Jan 15, 2023',
			lastLogin: '2 hours ago',
		},
		{
			id: '2',
			name: 'Bob Martinez',
			email: 'bob.m@email.com',
			phone: '+1 234 567 8902',
			initials: 'BM',
			role: 'wholesale',
			status: 'active',
			verified: true,
			createdAt: 'Mar 22, 2023',
			lastLogin: '1 day ago',
		},
		{
			id: '3',
			name: 'Carol Taylor',
			email: 'carol.t@email.com',
			phone: '+1 234 567 8903',
			initials: 'CT',
			role: 'customer',
			status: 'pending',
			verified: false,
			createdAt: 'Dec 1, 2024',
			lastLogin: 'Never',
		},
		{
			id: '4',
			name: 'Daniel Anderson',
			email: 'daniel.a@email.com',
			phone: '+1 234 567 8904',
			initials: 'DA',
			role: 'customer',
			status: 'suspended',
			verified: true,
			createdAt: 'Aug 10, 2022',
			lastLogin: '2 weeks ago',
		},
		{
			id: '5',
			name: 'Eva Thompson',
			email: 'eva.t@email.com',
			phone: '+1 234 567 8905',
			initials: 'ET',
			role: 'admin',
			status: 'active',
			verified: true,
			createdAt: 'Jan 1, 2022',
			lastLogin: '30 minutes ago',
		},
	];

	const filters = [
		{
			label: 'Role',
			options: ['All Roles', 'Customer', 'VIP', 'Wholesale', 'Admin'],
		},
		{
			label: 'Status',
			options: ['All Status', 'Active', 'Suspended', 'Pending', 'Banned'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="User Management"
					subtitle="Manage customer accounts, roles, and permissions"
					action={{ label: 'Add User', icon: Plus }}
				/>

				<div className="overflow-hidden rounded-xl border bg-card">
					<FilterBar searchPlaceholder="Search users..." filters={filters} />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>User</TableHead>
								<TableHead className="hidden @md:table-cell">Phone</TableHead>
								<TableHead className="hidden @lg:table-cell">Role</TableHead>
								<TableHead className="hidden @xl:table-cell">Status</TableHead>
								<TableHead className="hidden @xl:table-cell">Created</TableHead>
								<TableHead className="hidden @2xl:table-cell">
									Last Login
								</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<CustomerRow key={customer.id} customer={customer} />
							))}
						</TableBody>
					</Table>
					<BulkActions selectedCount={2} />
				</div>
			</div>
		</section>
	);
}
