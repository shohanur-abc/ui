import {
	MapPin,
	Truck,
	Package,
	Clock,
	Check,
	Shield,
	ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const AddressDisplay = ({
	type,
	name,
	address,
	phone,
}: {
	type: string;
	name: string;
	address: string;
	phone: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50">
		<div className="flex items-center justify-between mb-2">
			<Badge variant="secondary">{type}</Badge>
			<Button variant="ghost" size="sm">
				Change
			</Button>
		</div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
		<p className="text-sm text-muted-foreground">{phone}</p>
	</div>
);

const ShippingCard = ({
	value,
	name,
	time,
	price,
	features,
	best,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	best?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${best ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			{best && <Badge className="absolute -top-2.5 left-4">Best Value</Badge>}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<span className="font-semibold text-lg">{name}</span>
							<span className="text-xl font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
							<Clock className="size-4" />
							<span>{time}</span>
						</div>
						<ul className="space-y-1">
							{features.map((feature, i) => (
								<li key={i} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const AddonItem = ({
	id,
	label,
	description,
	price,
}: {
	id: string;
	label: string;
	description: string;
	price: string;
}) => (
	<div className="flex items-start gap-3">
		<Checkbox id={id} className="mt-0.5" />
		<div className="flex-1">
			<Label htmlFor={id} className="cursor-pointer font-medium">
				{label}
			</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<span className="text-sm font-medium">{price}</span>
	</div>
);

export default function Main() {
	const shippingOptions = [
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 business days',
			price: '$5.99',
			features: ['Full tracking', 'Email updates'],
		},
		{
			value: 'express',
			name: 'Express',
			time: '2-3 business days',
			price: '$12.99',
			features: [
				'Priority handling',
				'Real-time tracking',
				'Insurance included',
			],
			best: true,
		},
		{
			value: 'overnight',
			name: 'Overnight',
			time: 'Next business day',
			price: '$24.99',
			features: [
				'Guaranteed delivery',
				'Premium protection',
				'Signature required',
			],
		},
	];

	const addons = [
		{
			id: 'insurance',
			label: 'Shipping Insurance',
			description: 'Full coverage for lost or damaged items',
			price: '+$3.99',
		},
		{
			id: 'gift',
			label: 'Gift Wrapping',
			description: 'Premium gift wrap with ribbon',
			price: '+$5.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2">Shipping</h1>
				<p className="text-muted-foreground mb-8">
					Choose your delivery options
				</p>

				{/* Shipping Address */}
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<MapPin className="size-5 text-primary" />
						Shipping Address
					</h2>
					<AddressDisplay
						type="Home"
						name="John Doe"
						address="123 Main Street, Apt 4B, New York, NY 10001"
						phone="+1 (555) 123-4567"
					/>
				</div>

				<Separator className="my-6" />

				{/* Shipping Method */}
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Truck className="size-5 text-primary" />
						Shipping Method
					</h2>
					<RadioGroup defaultValue="express" className="space-y-4">
						{shippingOptions.map((option) => (
							<ShippingCard key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				{/* Add-ons */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Package className="size-5 text-primary" />
						Add-ons
					</h2>
					<Card>
						<CardContent className="p-5 space-y-4">
							{addons.map((addon) => (
								<AddonItem key={addon.id} {...addon} />
							))}
						</CardContent>
					</Card>
				</div>

				<Button className="w-full h-12 text-base">Continue to Payment</Button>
			</div>
		</section>
	);
}
