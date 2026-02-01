import {
	Truck,
	Check,
	MapPin,
	Clock,
	Package,
	ChevronRight,
	Shield,
	Leaf,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const ShippingSummary = ({
	address,
	method,
	price,
}: {
	address: string;
	method: string;
	price: string;
}) => (
	<Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
		<CardContent className="p-5">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-semibold">Shipping Summary</h3>
				<Badge>Step 2 of 4</Badge>
			</div>
			<div className="space-y-3 text-sm">
				<div className="flex items-start gap-3">
					<MapPin className="size-4 text-primary shrink-0 mt-0.5" />
					<span className="text-muted-foreground">{address}</span>
				</div>
				<div className="flex items-center gap-3">
					<Truck className="size-4 text-primary shrink-0" />
					<span className="text-muted-foreground">{method}</span>
				</div>
				<Separator className="my-2" />
				<div className="flex justify-between font-semibold">
					<span>Shipping Cost</span>
					<span className="text-primary">{price}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ShippingTier = ({
	value,
	name,
	time,
	price,
	features,
	popular,
	eco,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	popular?: boolean;
	eco?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-md hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 left-4">Most Popular</Badge>
			)}
			{eco && (
				<Badge variant="secondary" className="absolute -top-2.5 left-4 gap-1">
					<Leaf className="size-3" /> Eco
				</Badge>
			)}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold text-lg">{name}</h3>
							<span className="text-xl font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
							<Clock className="size-4" />
							<span>{time}</span>
						</div>
						<ul className="grid @sm:grid-cols-2 gap-2">
							{features.map((feature, i) => (
								<li key={i} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
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

const AddonCard = ({
	id,
	icon: Icon,
	title,
	description,
	price,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	price: string;
}) => (
	<Label
		htmlFor={id}
		className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<Checkbox id={id} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{title}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<span className="font-medium text-primary shrink-0">{price}</span>
	</Label>
);

export default function Main() {
	const shippingTiers = [
		{
			value: 'economy',
			name: 'Economy',
			time: '7-10 business days',
			price: '$4.99',
			features: ['Basic tracking', 'Standard packaging'],
		},
		{
			value: 'eco-friendly',
			name: 'Eco-Friendly',
			time: '6-8 business days',
			price: '$5.99',
			eco: true,
			features: [
				'Carbon neutral',
				'Recyclable packaging',
				'Consolidated shipping',
			],
		},
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 business days',
			price: '$7.99',
			popular: true,
			features: [
				'Full tracking',
				'Secure packaging',
				'Email updates',
				'Insurance up to $100',
			],
		},
		{
			value: 'express',
			name: 'Express',
			time: '2-3 business days',
			price: '$14.99',
			features: [
				'Priority handling',
				'Real-time tracking',
				'Full insurance',
				'SMS notifications',
			],
		},
	];

	const addons = [
		{
			id: 'insurance',
			icon: Shield,
			title: 'Extended Insurance',
			description: 'Full coverage up to $500',
			price: '+$4.99',
		},
		{
			id: 'carbon',
			icon: Leaf,
			title: 'Carbon Offset',
			description: 'Offset your delivery emissions',
			price: '+$0.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<ShippingSummary
					address="123 Main St, Apt 4B, New York, NY 10001"
					method="Express Shipping"
					price="$14.99"
				/>

				<div className="mt-8 mb-6">
					<h2 className="text-xl font-bold mb-2">Choose Shipping Speed</h2>
					<p className="text-muted-foreground">
						Select your preferred delivery option
					</p>
				</div>

				<RadioGroup defaultValue="standard" className="space-y-4 mb-8">
					{shippingTiers.map((tier) => (
						<ShippingTier key={tier.value} {...tier} />
					))}
				</RadioGroup>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg">Optional Add-ons</CardTitle>
						<CardDescription>Enhance your shipping experience</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{addons.map((addon) => (
							<AddonCard key={addon.id} {...addon} />
						))}
					</CardContent>
				</Card>

				<Button className="w-full h-12 text-base">
					Continue to Payment
					<ChevronRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
