import { Package, Truck, Zap, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const SpeedOption = ({
	value,
	name,
	time,
	price,
	features,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card className="transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
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
						<ul className="space-y-1.5">
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

const TabIcon = ({
	icon: Icon,
	label,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) => (
	<span className="flex items-center gap-2">
		<Icon className="size-4" />
		{label}
	</span>
);

export default function Main() {
	const standardOptions = [
		{
			value: 'economy',
			name: 'Economy',
			time: '7-10 business days',
			price: '$4.99',
			features: ['Basic tracking', 'Standard packaging'],
		},
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 business days',
			price: '$7.99',
			features: ['Full tracking', 'Secure packaging', 'Email updates'],
		},
	];

	const expressOptions = [
		{
			value: 'express',
			name: 'Express',
			time: '2-3 business days',
			price: '$14.99',
			features: [
				'Priority handling',
				'Real-time tracking',
				'Insurance included',
			],
		},
		{
			value: 'priority',
			name: 'Priority Express',
			time: '1-2 business days',
			price: '$19.99',
			features: [
				'Fastest ground option',
				'Premium packaging',
				'Signature delivery',
			],
		},
	];

	const overnightOptions = [
		{
			value: 'overnight',
			name: 'Overnight',
			time: 'Next business day',
			price: '$29.99',
			features: [
				'Next-day guarantee',
				'Premium protection',
				'Priority support',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Select Shipping Speed
					</h1>
					<p className="text-muted-foreground">
						Choose the delivery option that works best for you
					</p>
				</div>

				<Tabs defaultValue="express" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-6">
						<TabsTrigger value="standard">
							<TabIcon icon={Package} label="Standard" />
						</TabsTrigger>
						<TabsTrigger value="express">
							<TabIcon icon={Truck} label="Express" />
						</TabsTrigger>
						<TabsTrigger value="overnight">
							<TabIcon icon={Zap} label="Overnight" />
						</TabsTrigger>
					</TabsList>

					<TabsContent value="standard">
						<RadioGroup defaultValue="standard" className="space-y-4">
							{standardOptions.map((option) => (
								<SpeedOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="express">
						<RadioGroup defaultValue="express" className="space-y-4">
							{expressOptions.map((option) => (
								<SpeedOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>

					<TabsContent value="overnight">
						<RadioGroup defaultValue="overnight" className="space-y-4">
							{overnightOptions.map((option) => (
								<SpeedOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</TabsContent>
				</Tabs>

				<div className="flex gap-3 pt-8">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
