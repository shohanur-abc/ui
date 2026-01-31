import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	AlertTriangle,
	Bell,
	Calendar,
	Car,
	CheckCircle2,
	ChevronRight,
	Clock,
	CreditCard,
	FileText,
	Heart,
	Home,
	Mail,
	MapPin,
	Phone,
	Plus,
	Settings,
	Shield,
	Star,
	Umbrella,
	User,
	Users,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';

const InsuranceHeader = ({
	src,
	fallback,
	name,
	customerId,
	memberSince,
	tier,
}: {
	src: string;
	fallback: string;
	name: string;
	customerId: string;
	memberSince: string;
	tier: string;
}) => (
	<Card className="col-span-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
				<div className="flex items-center gap-4">
					<Avatar className="size-14">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback>{fallback}</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-xl font-bold">{name}</h1>
						<p className="text-sm text-muted-foreground">Customer ID: {customerId}</p>
						<p className="text-sm text-muted-foreground">Member since {memberSince}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Badge className="bg-amber-500/20 text-amber-600 gap-1">
						<Star className="size-3" />
						{tier}
					</Badge>
					<Button variant="outline">
						<Settings className="size-4 mr-2" />
						Settings
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const PolicyCard = ({
	type,
	policyNumber,
	premium,
	nextPayment,
	status,
	icon: Icon,
	color,
}: {
	type: string;
	policyNumber: string;
	premium: string;
	nextPayment: string;
	status: 'active' | 'pending' | 'expiring';
	icon: React.ElementType;
	color: string;
}) => (
	<Card className="hover:shadow-md transition-shadow cursor-pointer">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className={`p-2 rounded-lg ${color}`}>
					<Icon className="size-5 text-white" />
				</div>
				<Badge className={
					status === 'active' ? 'bg-green-500/20 text-green-600' :
					status === 'pending' ? 'bg-blue-500/20 text-blue-600' :
					'bg-amber-500/20 text-amber-600'
				}>
					{status}
				</Badge>
			</div>
			<p className="font-semibold">{type}</p>
			<p className="text-xs text-muted-foreground">{policyNumber}</p>
			<div className="flex items-center justify-between mt-3">
				<div>
					<p className="text-lg font-bold">{premium}</p>
					<p className="text-xs text-muted-foreground">Next: {nextPayment}</p>
				</div>
				<ChevronRight className="size-5 text-muted-foreground" />
			</div>
		</CardContent>
	</Card>
);

const ClaimsCard = ({
	claims,
}: {
	claims: { type: string; date: string; amount: string; status: 'approved' | 'pending' | 'rejected' }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<FileText className="size-5" />
					Recent Claims
				</h3>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{claims.map((claim, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
					<div>
						<p className="font-medium">{claim.type}</p>
						<p className="text-xs text-muted-foreground">{claim.date}</p>
					</div>
					<div className="text-right">
						<Badge className={
							claim.status === 'approved' ? 'bg-green-500/20 text-green-600' :
							claim.status === 'pending' ? 'bg-blue-500/20 text-blue-600' :
							'bg-red-500/20 text-red-600'
						}>
							{claim.status}
						</Badge>
						<p className="text-sm font-medium mt-1">{claim.amount}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const CoverageCard = ({
	total,
	breakdown,
}: {
	total: string;
	breakdown: { type: string; amount: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Shield className="size-5 text-blue-500" />
				Total Coverage
			</h3>
		</CardHeader>
		<CardContent>
			<p className="text-3xl font-bold mb-4">{total}</p>
			<div className="space-y-2">
				{breakdown.map((item, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">{item.type}</span>
						<span className="font-medium">{item.amount}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const PaymentMethodCard = ({
	brand,
	last4,
	expiry,
	isDefault,
}: {
	brand: string;
	last4: string;
	expiry: string;
	isDefault: boolean;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<CreditCard className="size-8 text-muted-foreground" />
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<p className="font-medium">{brand}</p>
						{isDefault && <Badge variant="secondary">Default</Badge>}
					</div>
					<p className="text-sm text-muted-foreground">•••• {last4}</p>
					<p className="text-xs text-muted-foreground">Expires {expiry}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AlertCard = ({
	alerts,
}: {
	alerts: { type: 'warning' | 'info'; message: string; action?: string }[];
}) => (
	<Card className="col-span-full">
		<CardContent className="p-4">
			<div className="space-y-3">
				{alerts.map((alert, i) => (
					<div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
						alert.type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10'
					}`}>
						{alert.type === 'warning' ? (
							<AlertTriangle className="size-5 text-amber-500 shrink-0" />
						) : (
							<Bell className="size-5 text-blue-500 shrink-0" />
						)}
						<p className="flex-1 text-sm">{alert.message}</p>
						{alert.action && <Button variant="outline" size="sm">{alert.action}</Button>}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const DocumentsCard = ({
	documents,
}: {
	documents: { name: string; date: string; type: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Documents</h3>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{documents.map((doc, i) => (
				<div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
					<div className="flex items-center gap-3">
						<FileText className="size-5 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">{doc.name}</p>
							<p className="text-xs text-muted-foreground">{doc.date}</p>
						</div>
					</div>
					<Badge variant="outline">{doc.type}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const BeneficiariesCard = ({
	beneficiaries,
}: {
	beneficiaries: { name: string; relationship: string; percentage: number }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Users className="size-5" />
					Beneficiaries
				</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{beneficiaries.map((ben, i) => (
				<div key={i} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-full bg-muted flex items-center justify-center">
							<User className="size-5 text-muted-foreground" />
						</div>
						<div>
							<p className="font-medium">{ben.name}</p>
							<p className="text-xs text-muted-foreground">{ben.relationship}</p>
						</div>
					</div>
					<Badge variant="secondary">{ben.percentage}%</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const QuickActionsCard = ({
	actions,
}: {
	actions: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold">Quick Actions</h3>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-3">
				{actions.map((action, i) => (
					<Link
						key={i}
						href={action.href}
						className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
					>
						<div className="p-2 rounded-full bg-primary/10">
							<action.icon className="size-5 text-primary" />
						</div>
						<span className="text-xs font-medium text-center">{action.label}</span>
					</Link>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
			fallback: 'JW',
			name: 'John Williams',
			customerId: 'INS-2847591',
			memberSince: '2018',
			tier: 'Gold Member',
		},
		policies: [
			{ type: 'Home Insurance', policyNumber: 'HOM-284759', premium: '$125/mo', nextPayment: 'Feb 15', status: 'active' as const, icon: Home, color: 'bg-blue-500' },
			{ type: 'Auto Insurance', policyNumber: 'AUT-948271', premium: '$89/mo', nextPayment: 'Feb 15', status: 'active' as const, icon: Car, color: 'bg-green-500' },
			{ type: 'Life Insurance', policyNumber: 'LIF-182947', premium: '$200/mo', nextPayment: 'Feb 15', status: 'active' as const, icon: Heart, color: 'bg-red-500' },
			{ type: 'Umbrella Policy', policyNumber: 'UMB-847291', premium: '$45/mo', nextPayment: 'Feb 15', status: 'expiring' as const, icon: Umbrella, color: 'bg-purple-500' },
		],
		claims: [
			{ type: 'Auto - Windshield Repair', date: 'Jan 15, 2024', amount: '$350', status: 'approved' as const },
			{ type: 'Home - Water Damage', date: 'Dec 28, 2023', amount: '$2,450', status: 'pending' as const },
		],
		coverage: {
			total: '$1,500,000',
			breakdown: [
				{ type: 'Home Coverage', amount: '$450,000' },
				{ type: 'Auto Coverage', amount: '$100,000' },
				{ type: 'Life Insurance', amount: '$750,000' },
				{ type: 'Umbrella', amount: '$200,000' },
			],
		},
		paymentMethod: { brand: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
		alerts: [
			{ type: 'warning' as const, message: 'Your Umbrella Policy expires in 30 days.', action: 'Renew' },
			{ type: 'info' as const, message: 'Your annual policy review is scheduled for March.' },
		],
		documents: [
			{ name: 'Home Policy Document', date: 'Jan 2024', type: 'PDF' },
			{ name: 'Auto Insurance Card', date: 'Jan 2024', type: 'PDF' },
			{ name: 'Claim Receipt #2847', date: 'Jan 2024', type: 'PDF' },
		],
		beneficiaries: [
			{ name: 'Sarah Williams', relationship: 'Spouse', percentage: 60 },
			{ name: 'Michael Williams', relationship: 'Son', percentage: 40 },
		],
		quickActions: [
			{ icon: FileText, label: 'File Claim', href: '/claims/new' },
			{ icon: CreditCard, label: 'Pay Bill', href: '/payments' },
			{ icon: Phone, label: 'Contact Agent', href: '/contact' },
			{ icon: Shield, label: 'Get Quote', href: '/quote' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<InsuranceHeader {...profileData.user} />
					<AlertCard alerts={profileData.alerts} />
					{profileData.policies.map((policy, i) => (
						<PolicyCard key={i} {...policy} />
					))}
					<CoverageCard {...profileData.coverage} />
					<ClaimsCard claims={profileData.claims} />
					<QuickActionsCard actions={profileData.quickActions} />
					<DocumentsCard documents={profileData.documents} />
					<PaymentMethodCard {...profileData.paymentMethod} />
					<BeneficiariesCard beneficiaries={profileData.beneficiaries} />
				</div>
			</div>
		</section>
	);
}
