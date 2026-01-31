import { ArrowRight, Building2, CreditCard, DollarSign, Lock, Repeat, Shield, Sparkles, Users, Zap } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface TeamPlanProps {
	name: string;
	seats: number;
	pricePerSeat: string;
	totalPrice: string;
	billingCycle: string;
}

interface FeatureProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface TeamMemberProps {
	name: string;
	email: string;
	avatar: string;
	initials: string;
	role: string;
}

const TeamPlanHeader = ({ name, seats, pricePerSeat, totalPrice, billingCycle }: TeamPlanProps) => (
	<div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
		<div className="flex items-start justify-between mb-4">
			<div>
				<Badge className="gap-1 mb-2">
					<Sparkles className="size-3" />
					Team Plan
				</Badge>
				<h2 className="text-2xl font-bold">{name}</h2>
			</div>
			<div className="text-right">
				<p className="text-3xl font-bold">{totalPrice}</p>
				<p className="text-sm text-muted-foreground">/{billingCycle}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 text-sm text-muted-foreground">
			<span className="flex items-center gap-1">
				<Users className="size-4" />
				{seats} seats
			</span>
			<span className="flex items-center gap-1">
				<DollarSign className="size-4" />
				{pricePerSeat}/seat
			</span>
		</div>
	</div>
);

const FeatureCard = ({ icon: Icon, title, description }: FeatureProps) => (
	<div className="flex gap-3">
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<h4 className="font-medium text-sm">{title}</h4>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const Features = ({ features }: { features: FeatureProps[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{features.map((feature, index) => (
			<FeatureCard key={index} {...feature} />
		))}
	</div>
);

const TeamMember = ({ name, email, avatar, initials, role }: TeamMemberProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-10">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{name}</p>
			<p className="text-xs text-muted-foreground truncate">{email}</p>
		</div>
		<Badge variant="outline" className="text-xs shrink-0">{role}</Badge>
	</div>
);

const TeamMembers = ({ members, title }: { members: TeamMemberProps[]; title: string }) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">{title}</h3>
			<Button variant="ghost" size="sm" className="text-xs">Manage</Button>
		</div>
		<div className="space-y-2">
			{members.map((member, index) => (
				<TeamMember key={index} {...member} />
			))}
		</div>
	</div>
);

const BillingOption = ({ label, description, enabled }: { label: string; description: string; enabled: boolean }) => (
	<div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
		<div>
			<p className="font-medium text-sm">{label}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Switch checked={enabled} />
	</div>
);

const FormField = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const InvoiceSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isTotal ? '' : 'text-muted-foreground'}>{line.label}</span>
					<span>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const SubscribeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

const TrustNote = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<span className="flex items-center gap-1">
			<Lock className="size-3" />
			Secure billing
		</span>
		<span className="flex items-center gap-1">
			<Repeat className="size-3" />
			Cancel anytime
		</span>
	</div>
);

export default function Main() {
	const teamPlan: TeamPlanProps = {
		name: 'Business Pro',
		seats: 10,
		pricePerSeat: '$15',
		totalPrice: '$150',
		billingCycle: 'month',
	};

	const features: FeatureProps[] = [
		{ icon: Users, title: 'Team Collaboration', description: 'Work together in real-time' },
		{ icon: Shield, title: 'Admin Controls', description: 'Manage permissions & access' },
		{ icon: Building2, title: 'SSO Integration', description: 'Enterprise single sign-on' },
		{ icon: Zap, title: 'Priority Support', description: 'Dedicated account manager' },
	];

	const members: TeamMemberProps[] = [
		{ name: 'John Doe', email: 'john@company.com', avatar: '', initials: 'JD', role: 'Admin' },
		{ name: 'Jane Smith', email: 'jane@company.com', avatar: '', initials: 'JS', role: 'Member' },
		{ name: 'Mike Wilson', email: 'mike@company.com', avatar: '', initials: 'MW', role: 'Member' },
	];

	const invoiceLines = [
		{ label: 'Business Pro (10 seats)', value: '$150.00' },
		{ label: 'Tax', value: '$12.00' },
		{ label: 'Total per month', value: '$162.00', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-6">
						<TeamPlanHeader {...teamPlan} />
						<Features features={features} />
						<Separator />
						<TeamMembers members={members} title="Team Members (3/10)" />
						<BillingOption
							label="Annual Billing"
							description="Save 20% with yearly payment"
							enabled={false}
						/>
					</div>
					<div>
						<Card className="border-border/50 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8">
							<CardHeader className="pb-4">
								<h3 className="font-semibold">Payment Information</h3>
								<p className="text-sm text-muted-foreground">Billing details for your team</p>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField id="company" label="Company Name" placeholder="Acme Inc." icon={Building2} />
								<FormField id="email" label="Billing Email" placeholder="billing@company.com" />
								<FormField id="card" label="Card Number" placeholder="1234 5678 9012 3456" icon={CreditCard} />
								<div className="grid grid-cols-2 gap-4">
									<FormField id="exp" label="Expiry" placeholder="MM/YY" />
									<FormField id="cvc" label="CVC" placeholder="123" type="password" />
								</div>
								<InvoiceSummary lines={invoiceLines} />
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<SubscribeButton label="Subscribe Team" />
								<TrustNote />
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
