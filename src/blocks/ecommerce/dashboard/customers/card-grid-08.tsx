import {
	Building2,
	Calendar,
	ChevronRight,
	DollarSign,
	ExternalLink,
	Globe,
	Mail,
	MoreHorizontal,
	Package,
	Phone,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface B2BCustomer {
	id: string;
	company: {
		name: string;
		logo?: string;
		initials: string;
		industry: string;
		website: string;
	};
	contact: {
		name: string;
		role: string;
		email: string;
		phone: string;
	};
	accountType: 'standard' | 'enterprise' | 'strategic';
	status: 'active' | 'pending' | 'at_risk';
	contractValue: string;
	ytdSpend: string;
	budgetUtilization: number;
	employeeCount: string;
	contractEnd: string;
	lastOrder: string;
	paymentTerms: string;
}

const AccountTypeBadge = ({ type }: { type: B2BCustomer['accountType'] }) => {
	const config = {
		standard: { label: 'Standard', className: 'bg-slate-500/10 text-slate-400' },
		enterprise: { label: 'Enterprise', className: 'bg-blue-500/10 text-blue-500' },
		strategic: { label: 'Strategic', className: 'bg-violet-500/10 text-violet-500' },
	};
	return (
		<Badge variant="outline" className={config[type].className}>
			{config[type].label}
		</Badge>
	);
};

const StatusIndicator = ({ status }: { status: B2BCustomer['status'] }) => {
	const config = {
		active: { label: 'Active', color: 'bg-emerald-500' },
		pending: { label: 'Pending', color: 'bg-amber-500' },
		at_risk: { label: 'At Risk', color: 'bg-red-500' },
	};
	return (
		<div className="flex items-center gap-1.5">
			<div className={`size-2 rounded-full ${config[status].color}`} />
			<span className="text-muted-foreground text-xs">{config[status].label}</span>
		</div>
	);
};

const BudgetBar = ({
	utilization,
	ytdSpend,
	total,
}: {
	utilization: number;
	ytdSpend: string;
	total: string;
}) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Budget Utilization</span>
			<span className="font-medium">{utilization}%</span>
		</div>
		<Progress
			value={utilization}
			className={`h-2 ${utilization > 90 ? '[&>div]:bg-amber-500' : ''}`}
		/>
		<div className="flex items-center justify-between text-xs text-muted-foreground">
			<span>{ytdSpend} spent</span>
			<span>{total} budget</span>
		</div>
	</div>
);

const InfoRow = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="text-muted-foreground size-4" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
);

const B2BCard = ({ customer }: { customer: B2BCustomer }) => (
	<Card className="group transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12 rounded-lg">
						<AvatarImage src={customer.company.logo} alt={customer.company.name} />
						<AvatarFallback className="bg-primary/10 text-primary rounded-lg">
							{customer.company.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.company.name}</p>
						<p className="text-muted-foreground text-xs">{customer.company.industry}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View account
						</DropdownMenuItem>
						<DropdownMenuItem>View orders</DropdownMenuItem>
						<DropdownMenuItem>View invoices</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Schedule meeting</DropdownMenuItem>
						<DropdownMenuItem>Renew contract</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<AccountTypeBadge type={customer.accountType} />
				<StatusIndicator status={customer.status} />
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="rounded-lg bg-muted/50 p-2.5">
					<p className="text-muted-foreground text-xs">Contract Value</p>
					<p className="text-lg font-bold">{customer.contractValue}</p>
				</div>
				<div className="rounded-lg bg-muted/50 p-2.5">
					<p className="text-muted-foreground text-xs">YTD Spend</p>
					<p className="text-lg font-bold">{customer.ytdSpend}</p>
				</div>
			</div>
			<BudgetBar
				utilization={customer.budgetUtilization}
				ytdSpend={customer.ytdSpend}
				total={customer.contractValue}
			/>
			<div className="space-y-2 border-t pt-3">
				<p className="text-muted-foreground text-xs font-medium">Primary Contact</p>
				<div className="flex items-center gap-2">
					<Avatar className="size-8">
						<AvatarFallback className="bg-primary/10 text-primary text-xs">
							{customer.contact.name.split(' ').map(n => n[0]).join('')}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm font-medium">{customer.contact.name}</p>
						<p className="text-muted-foreground text-xs">{customer.contact.role}</p>
					</div>
				</div>
			</div>
			<div className="space-y-1 text-sm">
				<InfoRow icon={Calendar} label="Contract ends" value={customer.contractEnd} />
				<InfoRow icon={Package} label="Last order" value={customer.lastOrder} />
				<InfoRow icon={DollarSign} label="Terms" value={customer.paymentTerms} />
			</div>
		</CardContent>
		<CardFooter className="grid grid-cols-3 gap-2 border-t bg-muted/20 px-4 py-3">
			<Button variant="ghost" size="sm" className="gap-1 text-xs">
				<Mail className="size-3.5" />
				Email
			</Button>
			<Button variant="ghost" size="sm" className="gap-1 text-xs">
				<Phone className="size-3.5" />
				Call
			</Button>
			<Button variant="ghost" size="sm" className="gap-1 text-xs">
				<Globe className="size-3.5" />
				Website
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: B2BCustomer[] = [
		{
			id: '1',
			company: { name: 'TechCorp Industries', initials: 'TC', industry: 'Technology', website: 'techcorp.com' },
			contact: { name: 'John Maxwell', role: 'Procurement Director', email: 'j.maxwell@techcorp.com', phone: '+1 555-0101' },
			accountType: 'strategic',
			status: 'active',
			contractValue: '$500,000',
			ytdSpend: '$425,000',
			budgetUtilization: 85,
			employeeCount: '5,000+',
			contractEnd: 'Dec 2024',
			lastOrder: '2 days ago',
			paymentTerms: 'Net 60',
		},
		{
			id: '2',
			company: { name: 'Global Retail Co', initials: 'GR', industry: 'Retail', website: 'globalretail.com' },
			contact: { name: 'Sarah Chen', role: 'VP Operations', email: 's.chen@globalretail.com', phone: '+1 555-0102' },
			accountType: 'enterprise',
			status: 'active',
			contractValue: '$250,000',
			ytdSpend: '$180,000',
			budgetUtilization: 72,
			employeeCount: '2,500+',
			contractEnd: 'Mar 2025',
			lastOrder: '1 week ago',
			paymentTerms: 'Net 45',
		},
		{
			id: '3',
			company: { name: 'HealthFirst Med', initials: 'HF', industry: 'Healthcare', website: 'healthfirst.com' },
			contact: { name: 'Dr. Emily Ross', role: 'Chief Admin', email: 'e.ross@healthfirst.com', phone: '+1 555-0103' },
			accountType: 'enterprise',
			status: 'pending',
			contractValue: '$175,000',
			ytdSpend: '$45,000',
			budgetUtilization: 26,
			employeeCount: '1,200+',
			contractEnd: 'Jun 2024',
			lastOrder: '3 weeks ago',
			paymentTerms: 'Net 30',
		},
		{
			id: '4',
			company: { name: 'BuildRight Const', initials: 'BR', industry: 'Construction', website: 'buildright.com' },
			contact: { name: 'Mike Torres', role: 'Purchasing Manager', email: 'm.torres@buildright.com', phone: '+1 555-0104' },
			accountType: 'standard',
			status: 'at_risk',
			contractValue: '$100,000',
			ytdSpend: '$92,000',
			budgetUtilization: 92,
			employeeCount: '800+',
			contractEnd: 'Feb 2024',
			lastOrder: '1 month ago',
			paymentTerms: 'Net 30',
		},
		{
			id: '5',
			company: { name: 'EduLearn Inc', initials: 'EL', industry: 'Education', website: 'edulearn.com' },
			contact: { name: 'Lisa Park', role: 'Facilities Director', email: 'l.park@edulearn.com', phone: '+1 555-0105' },
			accountType: 'standard',
			status: 'active',
			contractValue: '$75,000',
			ytdSpend: '$52,000',
			budgetUtilization: 69,
			employeeCount: '500+',
			contractEnd: 'Aug 2024',
			lastOrder: '5 days ago',
			paymentTerms: 'Net 45',
		},
		{
			id: '6',
			company: { name: 'FinanceHub Ltd', initials: 'FH', industry: 'Finance', website: 'financehub.com' },
			contact: { name: 'Robert Kim', role: 'Office Manager', email: 'r.kim@financehub.com', phone: '+1 555-0106' },
			accountType: 'enterprise',
			status: 'active',
			contractValue: '$200,000',
			ytdSpend: '$156,000',
			budgetUtilization: 78,
			employeeCount: '1,500+',
			contractEnd: 'Oct 2024',
			lastOrder: '3 days ago',
			paymentTerms: 'Net 60',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Building2 className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Business Accounts</h1>
						<p className="text-muted-foreground text-sm">Manage B2B customer relationships</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<B2BCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
