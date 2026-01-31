import { Gift, Tag, Truck, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PromoBanner = ({
	icon: Icon,
	title,
	description,
	code,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	code: string;
}) => (
	<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5">
		<div className="flex items-start gap-4">
			<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
				<Icon className="size-6" />
			</div>
			<div className="flex-1">
				<h4 className="font-semibold">{title}</h4>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<Badge variant="outline" className="shrink-0 font-mono">
				{code}
			</Badge>
		</div>
	</div>
);

const CheckboxOption = ({
	id,
	label,
	description,
	price,
}: {
	id: string;
	label: string;
	description: string;
	price?: string;
}) => (
	<div className="flex items-start gap-3 p-4 rounded-xl border hover:bg-accent/30 transition-colors">
		<Checkbox id={id} className="mt-0.5" />
		<div className="flex-1">
			<Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		{price && <span className="text-sm font-medium text-primary">{price}</span>}
	</div>
);

const FormInput = ({
	label,
	placeholder,
	type = 'text',
	halfWidth,
}: {
	label: string;
	placeholder: string;
	type?: string;
	halfWidth?: boolean;
}) => (
	<div className={`space-y-2 ${halfWidth ? '' : 'col-span-full'}`}>
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const SummaryLine = ({
	label,
	value,
	discount,
	total,
}: {
	label: string;
	value: string;
	discount?: boolean;
	total?: boolean;
}) => (
	<div className={`flex justify-between ${total ? 'text-xl font-bold' : ''}`}>
		<span className={discount ? 'text-green-600' : total ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={discount ? 'text-green-600' : total ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const addons = [
		{ id: 'gift', label: 'Gift Wrapping', description: 'Add premium gift wrap with personalized message', price: '+$5.99' },
		{ id: 'insurance', label: 'Shipping Insurance', description: 'Full coverage for loss or damage', price: '+$3.99' },
		{ id: 'signature', label: 'Signature Required', description: 'Require signature on delivery', price: 'Free' },
	];

	const summary = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Promo Discount', value: '-$25.00', discount: true },
		{ label: 'Tax', value: '$20.16' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @xl:grid-cols-[1fr,420px] gap-8 @xl:gap-12">
					<div className="space-y-8">
						<div>
							<h1 className="text-2xl font-bold mb-2">Shipping Address</h1>
							<p className="text-muted-foreground">Enter your delivery details</p>
						</div>

						<div className="rounded-2xl border bg-card p-6">
							<div className="grid @sm:grid-cols-2 gap-4">
								<FormInput label="First Name" placeholder="John" halfWidth />
								<FormInput label="Last Name" placeholder="Doe" halfWidth />
								<FormInput label="Email Address" placeholder="john@example.com" type="email" />
								<FormInput label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
								<FormInput label="Street Address" placeholder="123 Main Street" />
								<FormInput label="Apt, Suite, Unit" placeholder="Apartment 4B" />
								<FormInput label="City" placeholder="New York" halfWidth />
								<FormInput label="State" placeholder="NY" halfWidth />
								<FormInput label="ZIP Code" placeholder="10001" halfWidth />
								<FormInput label="Country" placeholder="United States" halfWidth />
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold flex items-center gap-2">
								<Sparkles className="size-5 text-primary" />
								Add-on Services
							</h3>
							{addons.map((addon) => (
								<CheckboxOption key={addon.id} {...addon} />
							))}
						</div>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1">Back</Button>
							<Button className="flex-1">Continue to Payment</Button>
						</div>
					</div>

					<div className="space-y-6 @xl:sticky @xl:top-6 @xl:self-start">
						<PromoBanner
							icon={Tag}
							title="10% Off First Order"
							description="Use code at checkout"
							code="WELCOME10"
						/>

						<div className="rounded-2xl border bg-card p-6 space-y-6">
							<h3 className="font-semibold text-lg">Order Summary</h3>

							<div className="flex gap-3">
								<Input placeholder="Promo code" className="h-10" />
								<Button variant="outline" size="sm" className="shrink-0 h-10">
									Apply
								</Button>
							</div>

							<Separator />

							<div className="space-y-3">
								{summary.map((item, i) => (
									<SummaryLine key={i} {...item} />
								))}
							</div>

							<Separator />

							<SummaryLine label="Total" value="$254.15" total />

							<div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
								<Truck className="size-4" />
								<span className="text-sm font-medium">Free shipping on orders over $100!</span>
							</div>
						</div>

						<div className="flex items-center gap-3 p-4 rounded-xl border bg-muted/30">
							<Gift className="size-5 text-primary" />
							<p className="text-sm">
								<span className="font-medium">Free gift</span>
								<span className="text-muted-foreground"> with orders over $200</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
