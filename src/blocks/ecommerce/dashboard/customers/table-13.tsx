import {
	ArrowUpRight,
	Calendar,
	ChevronDown,
	Download,
	FileText,
	Filter,
	Globe,
	Laptop,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	Search,
	Smartphone,
	Tablet,
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
import { Card, CardContent } from '@/components/ui/card';

interface CustomerSession {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	device: 'desktop' | 'mobile' | 'tablet';
	browser: string;
	location: {
		city: string;
		country: string;
		flag: string;
	};
	ipAddress: string;
	sessions: number;
	lastActive: string;
	firstVisit: string;
	source: string;
}

const DeviceBreakdown = ({
	stats,
}: {
	stats: { device: string; icon: React.ElementType; count: number; percentage: number }[];
}) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		{stats.map((stat, i) => (
			<Card key={i} className="py-4">
				<CardContent className="flex items-center gap-4 px-4">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<stat.icon className="size-5" />
					</div>
					<div>
						<p className="text-muted-foreground text-sm">{stat.device}</p>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-bold">{stat.count.toLocaleString()}</p>
							<span className="text-muted-foreground text-sm">{stat.percentage}%</span>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const FilterBar = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-72" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Filter className="size-4" />
						Device
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Devices</DropdownMenuItem>
					<DropdownMenuItem>Desktop</DropdownMenuItem>
					<DropdownMenuItem>Mobile</DropdownMenuItem>
					<DropdownMenuItem>Tablet</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Calendar className="size-4" />
						Period
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Today</DropdownMenuItem>
					<DropdownMenuItem>Last 7 days</DropdownMenuItem>
					<DropdownMenuItem>Last 30 days</DropdownMenuItem>
					<DropdownMenuItem>Last 90 days</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant="outline" size="sm" className="gap-2">
				<Download className="size-4" />
				Export
			</Button>
		</div>
	</div>
);

const DeviceIcon = ({ device }: { device: CustomerSession['device'] }) => {
	const icons = {
		desktop: Laptop,
		mobile: Smartphone,
		tablet: Tablet,
	};
	const Icon = icons[device];
	return <Icon className="text-muted-foreground size-4" />;
};

const LocationDisplay = ({
	location,
}: {
	location: CustomerSession['location'];
}) => (
	<div className="flex items-center gap-2">
		<span className="text-lg">{location.flag}</span>
		<div>
			<p className="text-sm font-medium">{location.city}</p>
			<p className="text-muted-foreground text-xs">{location.country}</p>
		</div>
	</div>
);

const SessionRow = ({ session }: { session: CustomerSession }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={session.customer.avatar} alt={session.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{session.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{session.customer.name}</p>
					<p className="text-muted-foreground text-xs">{session.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<div className="flex items-center gap-2">
				<DeviceIcon device={session.device} />
				<div>
					<p className="text-sm capitalize">{session.device}</p>
					<p className="text-muted-foreground text-xs">{session.browser}</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<LocationDisplay location={session.location} />
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			<code className="bg-muted rounded px-1.5 py-0.5 text-xs">{session.ipAddress}</code>
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-center font-medium">
			{session.sessions}
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			{session.lastActive}
		</TableCell>
		<TableCell className="hidden @2xl:table-cell">
			<Badge variant="secondary" className="font-normal">
				{session.source}
			</Badge>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View session history</DropdownMenuItem>
					<DropdownMenuItem>View customer profile</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Block IP address</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const deviceStats = [
		{ device: 'Desktop', icon: Laptop, count: 12450, percentage: 52 },
		{ device: 'Mobile', icon: Smartphone, count: 8920, percentage: 37 },
		{ device: 'Tablet', icon: Tablet, count: 2650, percentage: 11 },
	];

	const sessions: CustomerSession[] = [
		{
			id: '1',
			customer: { name: 'Anna Schmidt', email: 'anna.s@email.com', initials: 'AS' },
			device: 'desktop',
			browser: 'Chrome 121',
			location: { city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
			ipAddress: '192.168.1.100',
			sessions: 24,
			lastActive: '2 min ago',
			firstVisit: 'Jan 2024',
			source: 'Google',
		},
		{
			id: '2',
			customer: { name: 'Carlos Rodriguez', email: 'carlos.r@email.com', initials: 'CR' },
			device: 'mobile',
			browser: 'Safari iOS',
			location: { city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
			ipAddress: '192.168.1.101',
			sessions: 12,
			lastActive: '15 min ago',
			firstVisit: 'Dec 2023',
			source: 'Direct',
		},
		{
			id: '3',
			customer: { name: 'Diana Foster', email: 'diana.f@email.com', initials: 'DF' },
			device: 'tablet',
			browser: 'Safari iPad',
			location: { city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
			ipAddress: '192.168.1.102',
			sessions: 8,
			lastActive: '1 hour ago',
			firstVisit: 'Nov 2023',
			source: 'Facebook',
		},
		{
			id: '4',
			customer: { name: 'Erik Larsson', email: 'erik.l@email.com', initials: 'EL' },
			device: 'desktop',
			browser: 'Firefox 122',
			location: { city: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
			ipAddress: '192.168.1.103',
			sessions: 45,
			lastActive: '3 hours ago',
			firstVisit: 'Oct 2023',
			source: 'Email',
		},
		{
			id: '5',
			customer: { name: 'Fiona Chen', email: 'fiona.c@email.com', initials: 'FC' },
			device: 'mobile',
			browser: 'Chrome Android',
			location: { city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
			ipAddress: '192.168.1.104',
			sessions: 18,
			lastActive: '5 hours ago',
			firstVisit: 'Jan 2024',
			source: 'Instagram',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Session Analytics</h1>
					<p className="text-muted-foreground text-sm">
						Track customer sessions, devices, and geographic data
					</p>
				</div>

				<DeviceBreakdown stats={deviceStats} />

				<div className="overflow-hidden rounded-xl border bg-card">
					<FilterBar searchPlaceholder="Search by name or email..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden @md:table-cell">Device</TableHead>
								<TableHead className="hidden @lg:table-cell">Location</TableHead>
								<TableHead className="hidden @xl:table-cell">IP Address</TableHead>
								<TableHead className="hidden @xl:table-cell text-center">Sessions</TableHead>
								<TableHead className="hidden @lg:table-cell">Last Active</TableHead>
								<TableHead className="hidden @2xl:table-cell">Source</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{sessions.map((session) => (
								<SessionRow key={session.id} session={session} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
