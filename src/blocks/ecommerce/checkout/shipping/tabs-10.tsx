import { Truck, Gift, Shield, Package, Check, Sparkles, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const ShippingOption = ({
	value,
	name,
	time,
	price,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<p className="text-sm text-muted-foreground">{time}</p>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const GiftOption = ({
	id,
	icon: Icon,
	name,
	description,
	price,
	popular,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: string;
	popular?: boolean;
}) => (
	<Label
		htmlFor={id}
		className="relative flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		{popular && <Badge className="absolute -top-2.5 right-4">Popular</Badge>}
		<Checkbox id={id} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<span className="font-medium shrink-0">{price}</span>
	</Label>
);

const ProtectionPlan = ({
	value,
	name,
	coverage,
	price,
	recommended,
}: {
	value: string;
	name: string;
	coverage: string[];
	price: string;
	recommended?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${recommended ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			{recommended && <Badge className="absolute -top-2.5 left-4">Recommended</Badge>}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold">{name}</h3>
							<span className="text-lg font-bold text-primary">{price}</span>
						</div>
						<ul className="space-y-1">
							{coverage.map((item, i) => (
								<li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
									<Check className="size-4 text-primary" />
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const shippingOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
	];

	const giftOptions = [
		{
			id: 'gift-wrap',
			icon: Gift,
			name: 'Premium Gift Wrap',
			description: 'Elegant wrapping with ribbon',
			price: '+$5.99',
			popular: true,
		},
		{
			id: 'gift-message',
			icon: Heart,
			name: 'Personal Message',
			description: 'Add a custom message card',
			price: 'Free',
		},
	];

	const protectionPlans = [
		{
			value: 'none',
			name: 'No Protection',
			coverage: ['Standard carrier liability only'],
			price: '$0',
		},
		{
			value: 'basic',
			name: 'Basic Protection',
			coverage: ['Lost package coverage', 'Damaged item replacement'],
			price: '$3.99',
		},
		{
			value: 'premium',
			name: 'Premium Protection',
			coverage: ['All basic coverage', 'Theft protection', 'Hassle-free returns', 'Priority support'],
			price: '$7.99',
			recommended: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Customize Your Delivery</h1>
					<p className="text-muted-foreground">Add shipping options, gift services, and protection</p>
				</div>

				<Tabs defaultValue="shipping" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-8">
						<TabsTrigger value="shipping" className="gap-2">
							<Truck className="size-4" />
							Shipping
						</TabsTrigger>
						<TabsTrigger value="gift" className="gap-2">
							<Gift className="size-4" />
							Gift Options
						</TabsTrigger>
						<TabsTrigger value="protection" className="gap-2">
							<Shield className="size-4" />
							Protection
						</TabsTrigger>
					</TabsList>

					<TabsContent value="shipping">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Select Shipping Speed</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup defaultValue="express" className="space-y-3">
									{shippingOptions.map((option) => (
										<ShippingOption key={option.value} {...option} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="gift">
						<div className="space-y-4 mb-6">
							{giftOptions.map((option) => (
								<GiftOption key={option.id} {...option} />
							))}
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Gift Message</CardTitle>
							</CardHeader>
							<CardContent>
								<Textarea placeholder="Write a personal message for the recipient..." rows={4} />
								<p className="text-sm text-muted-foreground mt-2">200 characters remaining</p>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="protection">
						<RadioGroup defaultValue="basic" className="space-y-4">
							{protectionPlans.map((plan) => (
								<ProtectionPlan key={plan.value} {...plan} />
							))}
						</RadioGroup>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
