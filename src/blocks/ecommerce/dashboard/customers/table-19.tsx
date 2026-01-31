import {
	ArrowRight,
	Calendar,
	ChevronDown,
	Clock,
	Download,
	ExternalLink,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	Star,
	Trash2,
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CustomerAddress {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	type: 'shipping' | 'billing' | 'both';
	isDefault: boolean;
	address: {
		line1: string;
		line2?: string;
		city: string;
		state: string;
		country: string;
		zip: string;
	};
	phone?: string;
	lastUsed: string;
	ordersCount: number;
	verified: boolean;
}

const HeaderSection = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
			<Button className="gap-2">
				<Plus className="size-4" />
				Add Address
			</Button>
		</div>
	</div>
);

const SearchAndFilters = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-80" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Type
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Types</DropdownMenuItem>
					<DropdownMenuItem>Shipping</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Both</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Country
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Countries</DropdownMenuItem>
					<DropdownMenuItem>United States</DropdownMenuItem>
					<DropdownMenuItem>United Kingdom</DropdownMenuItem>
					<DropdownMenuItem>Canada</DropdownMenuItem>
					<DropdownMenuItem>Australia</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const TypeBadge = ({ type }: { type: CustomerAddress['type'] }) => {
	const config = {
		shipping: { label: 'Shipping', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		billing: { label: 'Billing', className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
		both: { label: 'Both', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
	};
	return (
		<Badge variant="outline" className={config[type].className}>
			{config[type].label}
		</Badge>
	);
};

const AddressDisplay = ({
	address,
	isDefault,
	verified,
}: {
	address: CustomerAddress['address'];
	isDefault: boolean;
	verified: boolean;
}) => (
	<div className="space-y-1">
		<div className="flex items-center gap-2">
			<p className="text-sm font-medium">{address.line1}</p>
			{isDefault && (
				<Badge variant="secondary" className="gap-1 text-xs">
					<Star className="size-2.5 fill-current" />
					Default
				</Badge>
			)}
		</div>
		{address.line2 && (
			<p className="text-muted-foreground text-xs">{address.line2}</p>
		)}
		<p className="text-muted-foreground text-xs">
			{address.city}, {address.state} {address.zip}
		</p>
		<p className="text-muted-foreground text-xs">{address.country}</p>
	</div>
);

const AddressRow = ({ address }: { address: CustomerAddress }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={address.customer.avatar} alt={address.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{address.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{address.customer.name}</p>
					<p className="text-muted-foreground text-xs">{address.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<TypeBadge type={address.type} />
		</TableCell>
		<TableCell>
			<AddressDisplay
				address={address.address}
				isDefault={address.isDefault}
				verified={address.verified}
			/>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			{address.phone ? (
				<div className="flex items-center gap-1.5 text-sm">
					<Phone className="text-muted-foreground size-3.5" />
					{address.phone}
				</div>
			) : (
				<span className="text-muted-foreground text-sm">-</span>
			)}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center font-medium">
			{address.ordersCount}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{address.lastUsed}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<ExternalLink className="mr-2 size-4" />
						View details
					</DropdownMenuItem>
					<DropdownMenuItem>Edit address</DropdownMenuItem>
					{!address.isDefault && (
						<DropdownMenuItem>
							<Star className="mr-2 size-4" />
							Set as default
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<MapPin className="mr-2 size-4" />
						Verify address
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete address
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const addresses: CustomerAddress[] = [
		{
			id: '1',
			customer: { name: 'Frank Miller', email: 'frank.m@email.com', initials: 'FM' },
			type: 'both',
			isDefault: true,
			address: {
				line1: '123 Main Street',
				line2: 'Apt 4B',
				city: 'New York',
				state: 'NY',
				country: 'United States',
				zip: '10001',
			},
			phone: '+1 (555) 123-4567',
			lastUsed: '2 days ago',
			ordersCount: 24,
			verified: true,
		},
		{
			id: '2',
			customer: { name: 'Grace Park', email: 'grace.p@email.com', initials: 'GP' },
			type: 'shipping',
			isDefault: false,
			address: {
				line1: '456 Oak Avenue',
				city: 'Los Angeles',
				state: 'CA',
				country: 'United States',
				zip: '90001',
			},
			phone: '+1 (555) 234-5678',
			lastUsed: '1 week ago',
			ordersCount: 12,
			verified: true,
		},
		{
			id: '3',
			customer: { name: 'Henry Chen', email: 'henry.c@email.com', initials: 'HC' },
			type: 'billing',
			isDefault: true,
			address: {
				line1: '789 Maple Drive',
				line2: 'Suite 100',
				city: 'Chicago',
				state: 'IL',
				country: 'United States',
				zip: '60601',
			},
			lastUsed: '3 days ago',
			ordersCount: 8,
			verified: false,
		},
		{
			id: '4',
			customer: { name: 'Ivy Wilson', email: 'ivy.w@email.com', initials: 'IW' },
			type: 'shipping',
			isDefault: false,
			address: {
				line1: '321 Pine Street',
				city: 'London',
				state: 'Greater London',
				country: 'United Kingdom',
				zip: 'SW1A 1AA',
			},
			phone: '+44 20 1234 5678',
			lastUsed: '2 weeks ago',
			ordersCount: 5,
			verified: true,
		},
		{
			id: '5',
			customer: { name: 'Jack Thompson', email: 'jack.t@email.com', initials: 'JT' },
			type: 'both',
			isDefault: true,
			address: {
				line1: '567 Elm Road',
				city: 'Toronto',
				state: 'Ontario',
				country: 'Canada',
				zip: 'M5V 3L9',
			},
			phone: '+1 (416) 555-7890',
			lastUsed: '5 days ago',
			ordersCount: 18,
			verified: true,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<HeaderSection
					title="Customer Addresses"
					subtitle="Manage customer shipping and billing addresses"
				/>

				<div className="overflow-hidden rounded-xl border bg-card">
					<SearchAndFilters searchPlaceholder="Search by customer or address..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden @md:table-cell">Type</TableHead>
								<TableHead>Address</TableHead>
								<TableHead className="hidden @lg:table-cell">Phone</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">Orders</TableHead>
								<TableHead className="hidden @xl:table-cell">Last Used</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{addresses.map((address) => (
								<AddressRow key={address.id} address={address} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
