import { MapPin, Clock, Truck, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DeliveryOption = ({
	value,
	name,
	time,
	price,
	recommended,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	recommended?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-semibold">{name}</span>
				{recommended && (
					<Badge variant="secondary" className="text-xs">
						Recommended
					</Badge>
				)}
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
				<Clock className="size-3.5" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-semibold text-primary">{price}</span>
	</Label>
);

const MapPreview = ({ address }: { address: string }) => (
	<div className="relative h-48 rounded-xl bg-muted overflow-hidden">
		<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
		<div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 rounded-lg bg-card border shadow-lg">
			<MapPin className="size-5 text-primary shrink-0" />
			<p className="text-sm truncate">{address}</p>
		</div>
	</div>
);

const InputField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const NavigationButtons = ({
	backLabel,
	nextLabel,
	nextIcon: NextIcon,
}: {
	backLabel: string;
	nextLabel: string;
	nextIcon: React.ComponentType<{ className?: string }>;
}) => (
	<div className="flex gap-3 pt-6">
		<Button variant="ghost" className="flex-1">
			{backLabel}
		</Button>
		<Button className="flex-1 gap-2">
			{nextLabel}
			<NextIcon className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const deliveryOptions = [
		{
			value: 'express',
			name: 'Express Delivery',
			time: '1-2 business days',
			price: '$12.99',
			recommended: true,
		},
		{
			value: 'standard',
			name: 'Standard Delivery',
			time: '3-5 business days',
			price: '$5.99',
		},
		{
			value: 'free',
			name: 'Economy Delivery',
			time: '7-10 business days',
			price: 'Free',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-start">
					<div className="space-y-6">
						<div>
							<h1 className="text-2xl font-bold mb-2">Delivery Address</h1>
							<p className="text-muted-foreground">
								Where should we deliver your order?
							</p>
						</div>

						<MapPreview address="123 Main Street, Apt 4B, New York, NY 10001" />

						<div className="space-y-4 p-6 rounded-xl border bg-card">
							<div className="grid @sm:grid-cols-2 gap-4">
								<InputField label="First Name" placeholder="John" />
								<InputField label="Last Name" placeholder="Doe" />
							</div>
							<InputField
								label="Street Address"
								placeholder="123 Main Street"
							/>
							<InputField label="Apt, Suite, Unit" placeholder="Apartment 4B" />
							<div className="grid @sm:grid-cols-3 gap-4">
								<InputField label="City" placeholder="New York" />
								<InputField label="State" placeholder="NY" />
								<InputField label="ZIP" placeholder="10001" />
							</div>
							<InputField
								label="Phone"
								placeholder="+1 (555) 000-0000"
								type="tel"
							/>
						</div>
					</div>

					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<Truck className="size-6 text-primary" />
							<div>
								<h2 className="text-xl font-bold">Delivery Options</h2>
								<p className="text-sm text-muted-foreground">
									Choose your preferred speed
								</p>
							</div>
						</div>

						<RadioGroup defaultValue="express" className="space-y-3">
							{deliveryOptions.map((option) => (
								<DeliveryOption key={option.value} {...option} />
							))}
						</RadioGroup>

						<div className="p-4 rounded-xl bg-muted/50 border">
							<h3 className="font-semibold mb-3">
								Delivery Instructions (Optional)
							</h3>
							<textarea
								placeholder="Special instructions for the courier..."
								className="w-full min-h-[100px] p-3 rounded-lg border bg-background resize-none text-sm"
							/>
						</div>

						<NavigationButtons
							backLabel="Back"
							nextLabel="Continue to Payment"
							nextIcon={ChevronRight}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
