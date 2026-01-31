import { Shield, Gift, Package, Leaf, Clock, Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const SpeedRadio = ({
	value,
	name,
	time,
	price,
	selected,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex-1 flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<span className="font-bold text-lg">{name}</span>
		<span className="text-sm opacity-70">{time}</span>
		<span className="text-lg font-bold mt-1">{price}</span>
	</Label>
);

const AddonRadio = ({
	value,
	icon: Icon,
	name,
	description,
	price,
	recommended,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: string;
	recommended?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
			${recommended ? 'ring-2 ring-primary/20' : ''}
		`}
	>
		{recommended && <Badge className="absolute -top-2.5 right-4">Recommended</Badge>}
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<span className="font-semibold">{name}</span>
				<span className="font-bold text-primary">{price}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const ExtraCheckbox = ({
	id,
	icon: Icon,
	label,
	price,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	price: string;
}) => (
	<Label
		htmlFor={id}
		className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<Checkbox id={id} />
			<Icon className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<span className="text-sm font-medium text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const speeds = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	const insuranceOptions = [
		{ value: 'no-insurance', icon: Package, name: 'No Insurance', description: 'Standard carrier liability only', price: '$0' },
		{ value: 'basic-insurance', icon: Shield, name: 'Basic Protection', description: 'Coverage up to $100', price: '+$2.99', recommended: true },
		{ value: 'premium-insurance', icon: Shield, name: 'Premium Protection', description: 'Full coverage up to $500', price: '+$6.99' },
	];

	const extras = [
		{ id: 'gift-wrap', icon: Gift, label: 'Gift Wrapping', price: '+$4.99' },
		{ id: 'carbon-offset', icon: Leaf, label: 'Carbon Neutral Shipping', price: '+$0.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-8">Customize Shipping</h1>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg">Delivery Speed</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="flex gap-3">
							{speeds.map((speed) => (
								<SpeedRadio key={speed.value} {...speed} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-lg">Shipping Protection</CardTitle>
						<CardDescription>Protect your order against loss or damage</CardDescription>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="basic-insurance" className="space-y-3">
							{insuranceOptions.map((option) => (
								<AddonRadio key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg">Extra Services</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{extras.map((extra) => (
							<ExtraCheckbox key={extra.id} {...extra} />
						))}
					</CardContent>
				</Card>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
