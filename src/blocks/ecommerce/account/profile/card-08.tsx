import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Building2,
	Download,
	FileText,
	Mail,
	MapPin,
	Phone,
	Plus,
	Receipt,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const BusinessHeader = ({
	logo,
	companyName,
	industry,
	verified,
}: {
	logo: string;
	companyName: string;
	industry: string;
	verified: boolean;
}) => (
	<div className="flex items-center gap-4">
		<Avatar className="size-16 rounded-lg">
			<AvatarImage src={logo} alt={companyName} />
			<AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xl">
				{companyName[0]}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold">{companyName}</h2>
				{verified && (
					<Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-600">
						Verified
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{industry}</p>
		</div>
	</div>
);

const CompanyDetails = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string }[];
}) => (
	<div className="grid gap-3">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-3 text-sm">
				<item.icon className="size-4 text-muted-foreground shrink-0" />
				<span className="text-muted-foreground">{item.label}</span>
				<span className="flex-1 text-right font-medium truncate">{item.value}</span>
			</div>
		))}
	</div>
);

const TeamMembers = ({
	members,
	total,
}: {
	members: { src: string; name: string }[];
	total: number;
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">Team Members</h3>
			<Badge variant="outline">{total} total</Badge>
		</div>
		<div className="flex items-center gap-2">
			<div className="flex -space-x-2">
				{members.map((member, i) => (
					<Avatar key={i} className="size-8 ring-2 ring-background">
						<AvatarImage src={member.src} alt={member.name} />
						<AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
					</Avatar>
				))}
				{total > members.length && (
					<div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium ring-2 ring-background">
						+{total - members.length}
					</div>
				)}
			</div>
			<Button variant="outline" size="sm" className="ml-auto gap-1">
				<Plus className="size-3" />
				Invite
			</Button>
		</div>
	</div>
);

const BillingInfo = ({
	plan,
	nextBilling,
	amount,
}: {
	plan: string;
	nextBilling: string;
	amount: string;
}) => (
	<div className="p-4 rounded-lg bg-muted/30 space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Receipt className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">Billing</span>
			</div>
			<Badge>{plan}</Badge>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Next billing</span>
			<span className="font-medium">{nextBilling}</span>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Amount</span>
			<span className="font-bold text-lg">{amount}</span>
		</div>
	</div>
);

const QuickActions = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<div className="flex flex-wrap gap-2">
		{items.map((action, i) => (
			<Button key={i} variant="outline" size="sm" className="gap-1.5" asChild>
				<Link href={action.href}>
					<action.icon className="size-3.5" />
					{action.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		company: {
			logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop',
			companyName: 'Acme Corp',
			industry: 'Technology & Software',
			verified: true,
		},
		details: [
			{ icon: Building2, label: 'Business ID', value: 'ACM-2024-001' },
			{ icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
			{ icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
			{ icon: Mail, label: 'Email', value: 'contact@acme.com' },
		],
		team: {
			members: [
				{ src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', name: 'John' },
				{ src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', name: 'Sarah' },
				{ src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', name: 'Mike' },
				{ src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', name: 'Lisa' },
			],
			total: 12,
		},
		billing: {
			plan: 'Enterprise',
			nextBilling: 'Feb 15, 2026',
			amount: '$499/mo',
		},
		actions: [
			{ icon: FileText, label: 'Invoices', href: '/invoices' },
			{ icon: Download, label: 'Export', href: '/export' },
			{ icon: Users, label: 'Manage Team', href: '/team' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<BusinessHeader {...profileData.company} />
					</CardHeader>
					<CardContent className="space-y-6">
						<CompanyDetails items={profileData.details} />
						<Separator />
						<TeamMembers {...profileData.team} />
						<BillingInfo {...profileData.billing} />
					</CardContent>
					<CardFooter>
						<QuickActions items={profileData.actions} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
