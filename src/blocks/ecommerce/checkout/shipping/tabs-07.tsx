import { CreditCard, Package, Gift, Truck, Shield, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const CompareHeader = ({
	features,
}: {
	features: string[];
}) => (
	<div className="hidden @lg:block">
		<div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-t-xl">
			<div className="font-semibold">Features</div>
			{features.map((feature, i) => (
				<div key={i} className="font-semibold text-center">{feature}</div>
			))}
		</div>
	</div>
);

const CompareRow = ({
	feature,
	values,
}: {
	feature: string;
	values: (boolean | string)[];
}) => (
	<div className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
		<div className="text-muted-foreground">{feature}</div>
		{values.map((value, i) => (
			<div key={i} className="text-center">
				{typeof value === 'boolean' ? (
					value ? <Check className="size-5 text-primary mx-auto" /> : <span className="text-muted-foreground">—</span>
				) : (
					<span>{value}</span>
				)}
			</div>
		))}
	</div>
);

const QuickOption = ({
	value,
	name,
	time,
	price,
	best,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	best?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		{best && <Badge className="absolute -top-2.5">Best Value</Badge>}
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<span className="font-bold text-lg">{name}</span>
		<span className="text-sm text-muted-foreground">{time}</span>
		<span className="text-xl font-bold text-primary mt-2">{price}</span>
	</Label>
);

export default function Main() {
	const plans = ['Standard', 'Express', 'Premium'];
	const compareData = [
		{ feature: 'Delivery Time', values: ['5-7 days', '2-3 days', '1 day'] },
		{ feature: 'Tracking', values: [true, true, true] },
		{ feature: 'Insurance', values: [false, true, true] },
		{ feature: 'Signature', values: [false, false, true] },
		{ feature: 'Gift Wrap', values: [false, false, true] },
		{ feature: 'Priority Support', values: [false, false, true] },
	];

	const quickOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99', best: true },
		{ value: 'premium', name: 'Premium', time: '1 day', price: '$24.99' },
	];

	const addons = [
		{ id: 'insurance', icon: Shield, label: 'Shipping Insurance', price: '+$2.99' },
		{ id: 'gift', icon: Gift, label: 'Gift Wrapping', price: '+$4.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Choose Your Shipping</h1>
					<p className="text-muted-foreground">Compare options or quickly select a plan</p>
				</div>

				<Tabs defaultValue="quick" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-8">
						<TabsTrigger value="quick" className="gap-2">
							<Truck className="size-4" />
							Quick Select
						</TabsTrigger>
						<TabsTrigger value="compare" className="gap-2">
							<Package className="size-4" />
							Compare Plans
						</TabsTrigger>
					</TabsList>

					<TabsContent value="quick">
						<RadioGroup defaultValue="express" className="grid @sm:grid-cols-3 gap-4 mb-6">
							{quickOptions.map((option) => (
								<QuickOption key={option.value} {...option} />
							))}
						</RadioGroup>

						<Card className="mb-6">
							<CardContent className="p-5">
								<h3 className="font-semibold mb-4">Add-ons</h3>
								<div className="space-y-3">
									{addons.map((addon) => (
										<div key={addon.id} className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Checkbox id={addon.id} />
												<Label htmlFor={addon.id} className="flex items-center gap-2 cursor-pointer">
													<addon.icon className="size-4 text-muted-foreground" />
													{addon.label}
												</Label>
											</div>
											<span className="text-sm font-medium">{addon.price}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="compare">
						<Card>
							<CompareHeader features={plans} />
							<CardContent className="p-0">
								{compareData.map((row) => (
									<CompareRow key={row.feature} {...row} />
								))}
								<div className="grid grid-cols-4 gap-4 p-4 bg-muted/30">
									<div className="font-semibold">Price</div>
									<div className="text-center font-bold">$5.99</div>
									<div className="text-center font-bold text-primary">$12.99</div>
									<div className="text-center font-bold">$24.99</div>
								</div>
							</CardContent>
						</Card>
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
