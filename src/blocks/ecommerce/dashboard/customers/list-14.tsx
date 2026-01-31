import {
	Building2,
	Calendar,
	FileText,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	Star,
	Tag,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface B2BCustomer {
	id: string;
	company: {
		name: string;
		logo?: string;
		initials: string;
		industry: string;
		size: string;
	};
	contact: {
		name: string;
		role: string;
		email: string;
		phone: string;
	};
	account: {
		type: 'prospect' | 'customer' | 'partner' | 'enterprise';
		status: 'active' | 'inactive' | 'pending';
		since: string;
	};
	contract?: {
		value: string;
		renewalDate: string;
	};
	tags: string[];
	lastInteraction: string;
}

const AccountTypeBadge = ({ type }: { type: B2BCustomer['account']['type'] }) => {
	const config: Record<string, { label: string; className: string }> = {
		prospect: { label: 'Prospect', className: 'bg-blue-500/10 text-blue-500' },
		customer: { label: 'Customer', className: 'bg-emerald-500/10 text-emerald-500' },
		partner: { label: 'Partner', className: 'bg-violet-500/10 text-violet-500' },
		enterprise: { label: 'Enterprise', className: 'bg-amber-500/10 text-amber-500' },
	};
	const { label, className } = config[type];
	return (
		<Badge variant="outline" className={className}>
			{label}
		</Badge>
	);
};

const StatusIndicator = ({ status }: { status: B2BCustomer['account']['status'] }) => {
	const colors: Record<string, string> = {
		active: 'bg-emerald-500',
		inactive: 'bg-slate-400',
		pending: 'bg-amber-500',
	};
	return (
		<div className="flex items-center gap-1.5">
			<span className={`size-2 rounded-full ${colors[status]}`} />
			<span className="text-xs capitalize text-muted-foreground">{status}</span>
		</div>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex items-center gap-3">
			<div className="bg-primary/10 text-primary rounded-lg p-2.5">
				<Building2 className="size-5" />
			</div>
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				<p className="text-muted-foreground text-sm">{subtitle}</p>
			</div>
		</div>
		<Button className="gap-1.5 w-fit">
			<Building2 className="size-4" />
			Add Company
		</Button>
	</div>
);

const B2BListItem = ({ customer }: { customer: B2BCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-12 rounded-lg">
				<AvatarImage src={customer.company.logo} alt={customer.company.name} />
				<AvatarFallback className="bg-primary/10 text-primary rounded-lg">
					{customer.company.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.company.name}</p>
					<AccountTypeBadge type={customer.account.type} />
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>{customer.company.industry}</span>
					<span>•</span>
					<Users className="size-3" />
					<span>{customer.company.size}</span>
				</div>
			</div>
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-medium text-sm">{customer.contact.name}</p>
				<span className="text-muted-foreground text-xs">({customer.contact.role})</span>
			</div>
			<div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
				<span className="flex items-center gap-1">
					<Mail className="size-3" />
					{customer.contact.email}
				</span>
				<span className="hidden @md:flex items-center gap-1">
					<Phone className="size-3" />
					{customer.contact.phone}
				</span>
			</div>
		</div>
		{customer.contract && (
			<div className="hidden @xl:block min-w-[140px]">
				<p className="text-muted-foreground text-xs flex items-center gap-1">
					<FileText className="size-3" /> Contract
				</p>
				<p className="font-semibold">{customer.contract.value}</p>
				<p className="text-muted-foreground text-xs">Renews {customer.contract.renewalDate}</p>
			</div>
		)}
		<div className="flex flex-wrap gap-1 max-w-[180px]">
			{customer.tags.slice(0, 3).map((tag) => (
				<Badge key={tag} variant="secondary" className="text-xs gap-1">
					<Tag className="size-2.5" />
					{tag}
				</Badge>
			))}
		</div>
		<div className="flex items-center gap-4">
			<StatusIndicator status={customer.account.status} />
			<div className="hidden @lg:block text-right min-w-[80px]">
				<p className="text-sm">{customer.lastInteraction}</p>
				<p className="text-muted-foreground text-xs">Last contact</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View company profile</DropdownMenuItem>
					<DropdownMenuItem>View contacts</DropdownMenuItem>
					<DropdownMenuItem>View orders</DropdownMenuItem>
					<DropdownMenuItem>View contracts</DropdownMenuItem>
					<DropdownMenuItem>Schedule meeting</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: B2BCustomer[] = [
		{
			id: '1',
			company: { name: 'Acme Corporation', initials: 'AC', industry: 'Technology', size: '500-1000' },
			contact: { name: 'John Smith', role: 'Procurement Manager', email: 'j.smith@acme.com', phone: '+1 555-0100' },
			account: { type: 'enterprise', status: 'active', since: 'Jan 2021' },
			contract: { value: '$125,000/yr', renewalDate: 'Mar 2025' },
			tags: ['Tech', 'Priority', 'Multi-location'],
			lastInteraction: '2d ago',
		},
		{
			id: '2',
			company: { name: 'Global Retail Inc.', initials: 'GR', industry: 'Retail', size: '1000+' },
			contact: { name: 'Sarah Johnson', role: 'VP Operations', email: 's.johnson@globalretail.com', phone: '+1 555-0101' },
			account: { type: 'enterprise', status: 'active', since: 'Mar 2020' },
			contract: { value: '$280,000/yr', renewalDate: 'Jun 2024' },
			tags: ['Retail', 'VIP', 'Fast-growth'],
			lastInteraction: '1d ago',
		},
		{
			id: '3',
			company: { name: 'StartupXYZ', initials: 'SX', industry: 'SaaS', size: '50-100' },
			contact: { name: 'Mike Chen', role: 'CEO', email: 'm.chen@startupxyz.io', phone: '+1 555-0102' },
			account: { type: 'customer', status: 'active', since: 'Aug 2023' },
			contract: { value: '$24,000/yr', renewalDate: 'Aug 2024' },
			tags: ['SaaS', 'Startup', 'Growth'],
			lastInteraction: '1w ago',
		},
		{
			id: '4',
			company: { name: 'HealthCare Partners', initials: 'HP', industry: 'Healthcare', size: '200-500' },
			contact: { name: 'Dr. Emily Brown', role: 'Admin Director', email: 'e.brown@hcpartners.org', phone: '+1 555-0103' },
			account: { type: 'prospect', status: 'pending', since: 'Dec 2023' },
			tags: ['Healthcare', 'New Lead', 'High-value'],
			lastInteraction: '3d ago',
		},
		{
			id: '5',
			company: { name: 'Manufacturing Co.', initials: 'MC', industry: 'Manufacturing', size: '500-1000' },
			contact: { name: 'Robert Taylor', role: 'Supply Chain Director', email: 'r.taylor@manufco.com', phone: '+1 555-0104' },
			account: { type: 'customer', status: 'inactive', since: 'Feb 2022' },
			contract: { value: '$45,000/yr', renewalDate: 'Feb 2024' },
			tags: ['Manufacturing', 'At-risk'],
			lastInteraction: '3w ago',
		},
		{
			id: '6',
			company: { name: 'EduTech Solutions', initials: 'ET', industry: 'Education', size: '100-200' },
			contact: { name: 'Lisa Wang', role: 'IT Director', email: 'l.wang@edutech.edu', phone: '+1 555-0105' },
			account: { type: 'partner', status: 'active', since: 'Sep 2022' },
			contract: { value: '$36,000/yr', renewalDate: 'Sep 2024' },
			tags: ['Education', 'Partner', 'Referral'],
			lastInteraction: '5d ago',
		},
		{
			id: '7',
			company: { name: 'Finance First Ltd.', initials: 'FF', industry: 'Finance', size: '200-500' },
			contact: { name: 'David Park', role: 'CFO', email: 'd.park@financefirst.com', phone: '+1 555-0106' },
			account: { type: 'prospect', status: 'pending', since: 'Jan 2024' },
			tags: ['Finance', 'Enterprise Lead'],
			lastInteraction: '1d ago',
		},
		{
			id: '8',
			company: { name: 'Green Energy Corp.', initials: 'GE', industry: 'Energy', size: '100-200' },
			contact: { name: 'Anna Martinez', role: 'Operations Manager', email: 'a.martinez@greenenergy.com', phone: '+1 555-0107' },
			account: { type: 'customer', status: 'active', since: 'May 2023' },
			contract: { value: '$18,000/yr', renewalDate: 'May 2024' },
			tags: ['Energy', 'Sustainability'],
			lastInteraction: '4d ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="B2B Accounts"
					subtitle="Business customer accounts and contacts"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<B2BListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
