import {
	Building2,
	Calendar,
	ChevronRight,
	Clock,
	CreditCard,
	Download,
	Edit2,
	FileText,
	Globe,
	Mail,
	MapPin,
	MoreHorizontal,
	Package,
	Phone,
	Plus,
	Settings,
	Tag,
	TrendingUp,
	User,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface B2BProfile {
	id: string;
	company: {
		name: string;
		logo?: string;
		initials: string;
		industry: string;
		size: string;
		website: string;
	};
	account: {
		type: 'enterprise' | 'business' | 'startup';
		status: 'active' | 'pending' | 'review';
		manager: string;
		since: string;
	};
	contract: {
		value: string;
		type: 'annual' | 'monthly' | 'custom';
		startDate: string;
		renewalDate: string;
		autoRenew: boolean;
	};
	billing: {
		creditLimit: string;
		creditUsed: number;
		paymentTerms: string;
		outstandingBalance: string;
	};
	contacts: Array<{
		id: string;
		name: string;
		role: string;
		email: string;
		phone: string;
		isPrimary: boolean;
		avatar?: string;
		initials: string;
	}>;
	metrics: {
		totalOrders: number;
		totalSpent: string;
		avgOrderValue: string;
		lastOrder: string;
	};
	tags: string[];
}

const AccountTypeBadge = ({
	type,
}: {
	type: B2BProfile['account']['type'];
}) => {
	const config: Record<string, { label: string; className: string }> = {
		enterprise: {
			label: 'Enterprise',
			className: 'bg-violet-500/10 text-violet-400',
		},
		business: { label: 'Business', className: 'bg-blue-500/10 text-blue-400' },
		startup: {
			label: 'Startup',
			className: 'bg-emerald-500/10 text-emerald-400',
		},
	};
	return (
		<Badge variant="outline" className={config[type].className}>
			{config[type].label}
		</Badge>
	);
};

const StatusIndicator = ({
	status,
}: {
	status: B2BProfile['account']['status'];
}) => {
	const config: Record<string, { label: string; color: string }> = {
		active: { label: 'Active', color: 'bg-emerald-500' },
		pending: { label: 'Pending', color: 'bg-amber-500' },
		review: { label: 'Under Review', color: 'bg-blue-500' },
	};
	return (
		<div className="flex items-center gap-1.5">
			<span className={`size-2 rounded-full ${config[status].color}`} />
			<span className="text-sm">{config[status].label}</span>
		</div>
	);
};

const CreditUsageBar = ({ used, limit }: { used: number; limit: string }) => (
	<div>
		<div className="flex items-center justify-between mb-2 text-sm">
			<span className="text-muted-foreground">Credit Usage</span>
			<span className="font-medium">
				{used}% of {limit}
			</span>
		</div>
		<Progress
			value={used}
			className={`h-2 ${used > 90 ? '[&>div]:bg-red-500' : used > 75 ? '[&>div]:bg-amber-500' : ''}`}
		/>
	</div>
);

const StatCard = ({
	label,
	value,
	subtext,
}: {
	label: string;
	value: string;
	subtext?: string;
}) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<p className="text-muted-foreground text-sm mb-1">{label}</p>
		<p className="text-2xl font-bold">{value}</p>
		{subtext && <p className="text-muted-foreground text-xs mt-1">{subtext}</p>}
	</div>
);

const ContactCard = ({ contact }: { contact: B2BProfile['contacts'][0] }) => (
	<div
		className={`flex items-center gap-3 rounded-lg border p-3 ${contact.isPrimary ? 'border-primary bg-primary/5' : ''}`}
	>
		<Avatar className="size-10">
			<AvatarImage src={contact.avatar} alt={contact.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-sm">
				{contact.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-medium text-sm truncate">{contact.name}</p>
				{contact.isPrimary && (
					<Badge variant="outline" className="text-xs text-primary">
						Primary
					</Badge>
				)}
			</div>
			<p className="text-xs text-muted-foreground">{contact.role}</p>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Mail className="size-4 mr-2" />
					Email
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Phone className="size-4 mr-2" />
					Call
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Edit contact</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

const ProfileHeader = ({ profile }: { profile: B2BProfile }) => (
	<div className="flex flex-col @lg:flex-row gap-6">
		<Avatar className="size-20 rounded-xl">
			<AvatarImage src={profile.company.logo} alt={profile.company.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-2xl rounded-xl">
				{profile.company.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-4">
				<div>
					<div className="flex items-center gap-3 mb-2">
						<h1 className="text-2xl font-bold">{profile.company.name}</h1>
						<AccountTypeBadge type={profile.account.type} />
						<StatusIndicator status={profile.account.status} />
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<Building2 className="size-4" />
							{profile.company.industry}
						</span>
						<span className="flex items-center gap-1.5">
							<Users className="size-4" />
							{profile.company.size} employees
						</span>
						<span className="flex items-center gap-1.5">
							<Globe className="size-4" />
							{profile.company.website}
						</span>
					</div>
					<div className="flex flex-wrap gap-1.5 mt-3">
						{profile.tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs gap-1">
								<Tag className="size-2.5" />
								{tag}
							</Badge>
						))}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="gap-1.5">
						<Edit2 className="size-3.5" />
						Edit
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View orders</DropdownMenuItem>
							<DropdownMenuItem>View invoices</DropdownMenuItem>
							<DropdownMenuItem>Download report</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500">
								Suspend account
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	</div>
);

export default function Main() {
	const profile: B2BProfile = {
		id: '1',
		company: {
			name: 'TechCorp Industries',
			initials: 'TC',
			industry: 'Technology',
			size: '500-1000',
			website: 'techcorp.com',
		},
		account: {
			type: 'enterprise',
			status: 'active',
			manager: 'Sarah Johnson',
			since: 'January 2021',
		},
		contract: {
			value: '$250,000/year',
			type: 'annual',
			startDate: 'Jan 1, 2024',
			renewalDate: 'Dec 31, 2024',
			autoRenew: true,
		},
		billing: {
			creditLimit: '$50,000',
			creditUsed: 65,
			paymentTerms: 'Net 30',
			outstandingBalance: '$12,450',
		},
		contacts: [
			{
				id: '1',
				name: 'John Anderson',
				role: 'VP of Procurement',
				email: 'j.anderson@techcorp.com',
				phone: '+1 555-0100',
				isPrimary: true,
				initials: 'JA',
			},
			{
				id: '2',
				name: 'Lisa Chen',
				role: 'Finance Director',
				email: 'l.chen@techcorp.com',
				phone: '+1 555-0101',
				isPrimary: false,
				initials: 'LC',
			},
			{
				id: '3',
				name: 'Mike Wilson',
				role: 'IT Manager',
				email: 'm.wilson@techcorp.com',
				phone: '+1 555-0102',
				isPrimary: false,
				initials: 'MW',
			},
		],
		metrics: {
			totalOrders: 156,
			totalSpent: '$892,450',
			avgOrderValue: '$5,720',
			lastOrder: '2 days ago',
		},
		tags: ['Enterprise', 'Priority', 'Tech Industry', 'Multi-location'],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<StatCard
						label="Total Orders"
						value={profile.metrics.totalOrders.toString()}
						subtext={`Last: ${profile.metrics.lastOrder}`}
					/>
					<StatCard label="Total Spent" value={profile.metrics.totalSpent} />
					<StatCard
						label="Avg Order Value"
						value={profile.metrics.avgOrderValue}
					/>
					<StatCard
						label="Outstanding"
						value={profile.billing.outstandingBalance}
						subtext={profile.billing.paymentTerms}
					/>
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-base flex items-center gap-2">
								<Users className="size-4" />
								Contacts
							</CardTitle>
							<Button variant="outline" size="sm" className="gap-1.5">
								<Plus className="size-3.5" />
								Add
							</Button>
						</CardHeader>
						<CardContent className="space-y-3">
							{profile.contacts.map((contact) => (
								<ContactCard key={contact.id} contact={contact} />
							))}
						</CardContent>
					</Card>

					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<FileText className="size-4" />
									Contract Details
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Value</span>
									<span className="font-semibold">
										{profile.contract.value}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Type</span>
									<span className="capitalize">{profile.contract.type}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Renewal</span>
									<span>{profile.contract.renewalDate}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Auto-renew</span>
									<Badge
										variant="outline"
										className={
											profile.contract.autoRenew ? 'text-emerald-500' : ''
										}
									>
										{profile.contract.autoRenew ? 'Enabled' : 'Disabled'}
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<CreditCard className="size-4" />
									Credit Status
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CreditUsageBar
									used={profile.billing.creditUsed}
									limit={profile.billing.creditLimit}
								/>
								<div className="mt-4 flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Account Manager</span>
									<span className="font-medium">{profile.account.manager}</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
