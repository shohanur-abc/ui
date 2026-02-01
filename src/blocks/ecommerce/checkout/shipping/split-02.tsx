import { ShieldCheck, RotateCcw, Headphones, CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TrustBadge = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<div className="flex items-start gap-3">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div>
			<p className="font-medium text-sm">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const AddressTypeOption = ({
	value,
	label,
	description,
}: {
	value: string;
	label: string;
	description: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div>
			<span className="font-medium">{label}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const InputField = ({
	label,
	placeholder,
	type = 'text',
	required,
}: {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
}) => (
	<div className="space-y-2">
		<Label>
			{label}
			{required && <span className="text-destructive ml-0.5">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const PromoCode = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="h-11" />
		<Button variant="outline" className="h-11 shrink-0">
			{buttonLabel}
		</Button>
	</div>
);

export default function Main() {
	const trustBadges = [
		{
			icon: ShieldCheck,
			title: 'Secure Checkout',
			description: '256-bit SSL encryption',
		},
		{
			icon: RotateCcw,
			title: '30-Day Returns',
			description: 'Hassle-free returns',
		},
		{
			icon: Headphones,
			title: '24/7 Support',
			description: 'Always here to help',
		},
		{
			icon: CreditCard,
			title: 'Safe Payment',
			description: 'All cards accepted',
		},
	];

	const addressTypes = [
		{
			value: 'home',
			label: 'Home Address',
			description: 'Residential delivery',
		},
		{
			value: 'office',
			label: 'Office Address',
			description: 'Business hours delivery',
		},
	];

	return (
		<section className="@container relative overflow-hidden bg-muted/20">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16">
					<div>
						<h1 className="text-3xl font-bold mb-2">Shipping Details</h1>
						<p className="text-muted-foreground mb-8">
							Enter your delivery information
						</p>

						<Card className="mb-6">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Address Type</h3>
								<RadioGroup
									defaultValue="home"
									className="grid @sm:grid-cols-2 gap-4"
								>
									{addressTypes.map((type) => (
										<AddressTypeOption key={type.value} {...type} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 space-y-5">
								<div className="grid @sm:grid-cols-2 gap-4">
									<InputField label="First Name" placeholder="John" required />
									<InputField label="Last Name" placeholder="Doe" required />
								</div>
								<InputField
									label="Email"
									placeholder="john@example.com"
									type="email"
									required
								/>
								<InputField
									label="Phone"
									placeholder="+1 (555) 000-0000"
									type="tel"
									required
								/>
								<InputField
									label="Street Address"
									placeholder="123 Main St"
									required
								/>
								<InputField
									label="Apt / Suite / Unit"
									placeholder="Apartment 4B"
								/>
								<div className="grid @sm:grid-cols-3 gap-4">
									<InputField label="City" placeholder="City" required />
									<InputField label="State" placeholder="State" required />
									<InputField label="ZIP" placeholder="ZIP" required />
								</div>

								<div className="flex flex-col @sm:flex-row gap-3 pt-4">
									<Button variant="outline" className="flex-1">
										Back
									</Button>
									<Button className="flex-1">Continue</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="@xl:sticky @xl:top-6 @xl:self-start">
						<Card className="mb-6">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Have a promo code?</h3>
								<PromoCode placeholder="Enter code" buttonLabel="Apply" />
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-6">Why Shop With Us</h3>
								<div className="grid @sm:grid-cols-2 gap-6">
									{trustBadges.map((badge, i) => (
										<TrustBadge key={i} {...badge} />
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
