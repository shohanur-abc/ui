'use client';

import { BadgeCheck, Briefcase, Building2, CreditCard, Lock, Receipt, Shield, Sparkles, Users, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlanFeature {
	text: string;
}

interface TeamSize {
	id: string;
	label: string;
	discount: string;
	perSeat: string;
}

const PageHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge: string }) => (
	<div className="text-center mb-8">
		<Badge variant="secondary" className="gap-1.5 mb-4">
			<Sparkles className="size-3" />
			{badge}
		</Badge>
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{subtitle}</p>
	</div>
);

const PlanCard = ({ name, price, period, features }: { name: string; price: string; period: string; features: PlanFeature[] }) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
		<div className="flex items-center justify-between mb-4">
			<div>
				<h3 className="font-semibold">{name}</h3>
				<p className="text-2xl font-bold">{price}<span className="text-sm font-normal text-muted-foreground">/{period}</span></p>
			</div>
			<Badge className="gap-1">
				<BadgeCheck className="size-3" />
				Selected
			</Badge>
		</div>
		<div className="space-y-2">
			{features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
					<BadgeCheck className="size-4 text-primary" />
					<span>{feature.text}</span>
				</div>
			))}
		</div>
	</div>
);

const IndividualTab = () => (
	<div className="space-y-4">
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Email Address</Label>
				<Input placeholder="you@example.com" type="email" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="4242 4242 4242 4242" className="pl-10" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVC</Label>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
	</div>
);

const TeamSizeSelector = ({ sizes }: { sizes: TeamSize[] }) => (
	<RadioGroup defaultValue={sizes[0]?.id} className="space-y-2">
		{sizes.map((size) => (
			<Label
				key={size.id}
				htmlFor={size.id}
				className="flex items-center gap-3 p-3 rounded-xl border border-border/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={size.id} id={size.id} />
				<div className="flex-1">
					<span className="font-medium">{size.label}</span>
					<p className="text-xs text-muted-foreground">{size.perSeat} per seat</p>
				</div>
				<Badge variant="secondary" className="text-xs">{size.discount}</Badge>
			</Label>
		))}
	</RadioGroup>
);

const TeamTab = ({ sizes }: { sizes: TeamSize[] }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
			<Users className="size-4 text-primary" />
			<span className="text-sm">Volume discounts available</span>
		</div>
		<TeamSizeSelector sizes={sizes} />
		<div className="space-y-2">
			<Label className="text-sm">Team Name</Label>
			<Input placeholder="My Team" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Admin Email</Label>
			<Input placeholder="admin@company.com" type="email" />
		</div>
	</div>
);

const EnterpriseTab = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
			<Briefcase className="size-4 text-muted-foreground" />
			<span className="text-sm">Custom pricing for enterprise</span>
		</div>
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Company Name</Label>
				<div className="relative">
					<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="Acme Inc." className="pl-10" />
				</div>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Company Size</Label>
				<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
					<option>50-100 employees</option>
					<option>100-500 employees</option>
					<option>500-1000 employees</option>
					<option>1000+ employees</option>
				</select>
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Work Email</Label>
				<Input placeholder="you@company.com" type="email" />
			</div>
		</div>
		<Button variant="outline" className="w-full gap-2">
			<Receipt className="size-4" />
			Request Invoice
		</Button>
	</div>
);

const InvoiceTab = () => (
	<div className="space-y-4">
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Company Name</Label>
				<Input placeholder="Company legal name" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Tax ID / VAT Number</Label>
				<Input placeholder="XX-XXXXXXX" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Billing Address</Label>
				<Input placeholder="Street address" />
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">City</Label>
					<Input placeholder="City" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">ZIP</Label>
					<Input placeholder="ZIP code" />
				</div>
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
			Invoice will be sent to your email within 24 hours
		</div>
	</div>
);

const SecurityBadges = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>256-bit encryption</span>
		</div>
		<Separator orientation="vertical" className="h-4" />
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>SOC 2 Compliant</span>
		</div>
	</div>
);

const SubscribeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const planFeatures: PlanFeature[] = [
		{ text: 'Unlimited projects' },
		{ text: 'Priority support' },
		{ text: 'Advanced analytics' },
	];

	const teamSizes: TeamSize[] = [
		{ id: 'small', label: '5-10 seats', discount: 'Save 10%', perSeat: '$19' },
		{ id: 'medium', label: '11-25 seats', discount: 'Save 15%', perSeat: '$17' },
		{ id: 'large', label: '26-50 seats', discount: 'Save 20%', perSeat: '$15' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader 
					title="Complete Your Purchase" 
					subtitle="Choose a payment option below"
					badge="Pro Plan"
				/>
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-0">
						<PlanCard 
							name="Pro Plan" 
							price="$29" 
							period="month" 
							features={planFeatures} 
						/>
					</CardHeader>
					<CardContent className="pt-6">
						<Tabs defaultValue="individual" className="w-full">
							<TabsList className="w-full grid grid-cols-4 h-10 text-xs mb-6">
								<TabsTrigger value="individual">Personal</TabsTrigger>
								<TabsTrigger value="team">Team</TabsTrigger>
								<TabsTrigger value="enterprise">Enterprise</TabsTrigger>
								<TabsTrigger value="invoice">Invoice</TabsTrigger>
							</TabsList>
							<TabsContent value="individual">
								<IndividualTab />
							</TabsContent>
							<TabsContent value="team">
								<TeamTab sizes={teamSizes} />
							</TabsContent>
							<TabsContent value="enterprise">
								<EnterpriseTab />
							</TabsContent>
							<TabsContent value="invoice">
								<InvoiceTab />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<SubscribeButton label="Subscribe Now" />
						<SecurityBadges />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
