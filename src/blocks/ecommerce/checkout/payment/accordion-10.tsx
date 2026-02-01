'use client';

import {
	ArrowRight,
	Check,
	CreditCard,
	Download,
	Key,
	Lock,
	Mail,
	Server,
	Shield,
	Smartphone,
	Wallet,
	Zap,
} from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface LicenseType {
	id: string;
	name: string;
	description: string;
	price: string;
	features: string[];
	popular?: boolean;
}

const LicenseSelectionContent = ({ licenses }: { licenses: LicenseType[] }) => (
	<div className="space-y-3 pt-4">
		<RadioGroup
			defaultValue={licenses.find((l) => l.popular)?.id || licenses[0].id}
			className="space-y-3"
		>
			{licenses.map((license) => (
				<Label
					key={license.id}
					htmlFor={license.id}
					className={`relative flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
						license.popular ? 'ring-2 ring-primary/20' : ''
					}`}
				>
					{license.popular && (
						<Badge className="absolute -top-2.5 right-3 text-xs gap-0.5">
							<Zap className="size-2.5" />
							Popular
						</Badge>
					)}
					<div className="flex items-start gap-3">
						<RadioGroupItem
							value={license.id}
							id={license.id}
							className="mt-1"
						/>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<span className="font-medium">{license.name}</span>
								<span className="font-bold">{license.price}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{license.description}
							</p>
						</div>
					</div>
					<div className="ml-7 flex flex-wrap gap-2">
						{license.features.map((feature, index) => (
							<Badge key={index} variant="secondary" className="text-xs">
								{feature}
							</Badge>
						))}
					</div>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const DeliveryOptionsContent = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
			<div className="flex items-center gap-2 mb-2">
				<Zap className="size-4 text-primary" />
				<span className="font-medium">Instant Digital Delivery</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Your product will be available immediately after purchase
			</p>
		</div>
		<div className="space-y-3">
			<Label className="text-sm font-medium">Receive your license via:</Label>
			<div className="space-y-2">
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
					<Checkbox id="email" defaultChecked />
					<Label
						htmlFor="email"
						className="flex items-center gap-2 cursor-pointer"
					>
						<Mail className="size-4" />
						<span className="text-sm">Email</span>
					</Label>
				</div>
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
					<Checkbox id="dashboard" defaultChecked />
					<Label
						htmlFor="dashboard"
						className="flex items-center gap-2 cursor-pointer"
					>
						<Server className="size-4" />
						<span className="text-sm">Account Dashboard</span>
					</Label>
				</div>
			</div>
		</div>
	</div>
);

const AccountInfoContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Email Address</Label>
			<div className="relative">
				<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input type="email" placeholder="you@example.com" className="pl-10" />
			</div>
			<p className="text-xs text-muted-foreground">
				License key will be sent to this email
			</p>
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="create-account" />
			<Label htmlFor="create-account" className="text-sm cursor-pointer">
				Create an account to manage licenses
			</Label>
		</div>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
		<div className="grid grid-cols-3 gap-2">
			<Button
				variant="outline"
				className="h-14 flex-col gap-1 border-primary bg-primary/5"
			>
				<CreditCard className="size-5" />
				<span className="text-xs">Card</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Wallet className="size-5" />
				<span className="text-xs">PayPal</span>
			</Button>
			<Button variant="outline" className="h-14 flex-col gap-1">
				<Smartphone className="size-5" />
				<span className="text-xs">Apple Pay</span>
			</Button>
		</div>
		<Separator />
		<div className="space-y-4">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="1234 5678 9012 3456" className="pl-10" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVV</Label>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
	</div>
);

const LicenseAgreementContent = () => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-muted/30 max-h-40 overflow-y-auto text-xs text-muted-foreground space-y-2">
			<p className="font-medium text-foreground">End User License Agreement</p>
			<p>
				This license grants you the right to use the software according to the
				selected license type.
			</p>
			<p>
				Personal licenses are for individual use only. Team licenses allow usage
				by up to 5 team members. Enterprise licenses include unlimited seats and
				priority support.
			</p>
			<p>
				Redistribution or resale of the software is prohibited. The license is
				non-transferable.
			</p>
			<p>
				Updates and support are included for the duration specified in your
				license.
			</p>
		</div>
		<div className="flex items-start gap-3">
			<Checkbox id="agree" className="mt-0.5" />
			<Label htmlFor="agree" className="text-sm cursor-pointer">
				I agree to the{' '}
				<a href="#" className="text-primary underline">
					License Agreement
				</a>{' '}
				and{' '}
				<a href="#" className="text-primary underline">
					Terms of Service
				</a>
			</Label>
		</div>
	</div>
);

const PurchaseSummary = ({
	license,
	features,
}: {
	license: { name: string; price: string };
	features: string[];
}) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
		<div className="flex items-center justify-between">
			<div>
				<span className="font-medium">{license.name}</span>
				<p className="text-xs text-muted-foreground">One-time purchase</p>
			</div>
			<span className="text-2xl font-bold">{license.price}</span>
		</div>
		<Separator />
		<div className="space-y-2">
			<span className="text-sm font-medium">Includes:</span>
			{features.map((feature, index) => (
				<div key={index} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary" />
					<span className="text-muted-foreground">{feature}</span>
				</div>
			))}
		</div>
	</div>
);

const PurchaseButton = ({ label }: { label: string }) => (
	<div className="space-y-3">
		<Button className="w-full gap-2" size="lg">
			<Lock className="size-4" />
			{label}
		</Button>
		<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
			<div className="flex items-center gap-1">
				<Download className="size-3" />
				<span>Instant Download</span>
			</div>
			<div className="flex items-center gap-1">
				<Key className="size-3" />
				<span>License Key</span>
			</div>
			<div className="flex items-center gap-1">
				<Shield className="size-3" />
				<span>30-Day Refund</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	const licenses: LicenseType[] = [
		{
			id: 'personal',
			name: 'Personal License',
			description: 'For individual use on personal projects',
			price: '$49',
			features: ['1 User', '1 Year Updates', 'Email Support'],
		},
		{
			id: 'team',
			name: 'Team License',
			description: 'For small teams and startups',
			price: '$149',
			features: ['5 Users', '2 Years Updates', 'Priority Support'],
			popular: true,
		},
		{
			id: 'enterprise',
			name: 'Enterprise License',
			description: 'For large organizations',
			price: '$499',
			features: ['Unlimited', 'Lifetime Updates', '24/7 Support'],
		},
	];

	const features = [
		'Full software access',
		'All premium features',
		'1 year of free updates',
		'Email support',
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Key className="size-5 text-primary" />
								<h2 className="text-xl font-semibold">Purchase License</h2>
							</div>
							<Badge variant="outline" className="gap-1">
								<Zap className="size-3" />
								Digital
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion
							type="single"
							collapsible
							defaultValue="license"
							className="w-full"
						>
							<AccordionItem value="license">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Key className="size-4" />
										<span className="font-medium">License Type</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<LicenseSelectionContent licenses={licenses} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="delivery">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Download className="size-4" />
										<span className="font-medium">Delivery Options</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<DeliveryOptionsContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="account">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Mail className="size-4" />
										<span className="font-medium">Account Information</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<AccountInfoContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Payment Method</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="agreement">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Shield className="size-4" />
										<span className="font-medium">License Agreement</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<LicenseAgreementContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PurchaseSummary
							license={{ name: 'Team License', price: '$149' }}
							features={features}
						/>
						<PurchaseButton label="Complete Purchase" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
