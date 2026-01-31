import { Package, Truck, MapPin, Clock, Check, ChevronRight, Shield, Gift, Leaf } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProgressBar = ({
	steps,
	currentStep,
}: {
	steps: { label: string; icon: React.ComponentType<{ className?: string }> }[];
	currentStep: number;
}) => {
	const progress = ((currentStep) / (steps.length - 1)) * 100;

	return (
		<div className="mb-10">
			<div className="relative">
				<div className="h-2 bg-muted rounded-full overflow-hidden">
					<div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
				</div>
				<div className="absolute inset-0 flex justify-between">
					{steps.map((step, i) => {
						const Icon = step.icon;
						const isCompleted = i < currentStep;
						const isCurrent = i === currentStep;
						return (
							<div key={step.label} className="flex flex-col items-center -mt-2">
								<div
									className={`
										flex size-6 items-center justify-center rounded-full border-2 bg-background transition-all
										${isCompleted ? 'bg-primary border-primary text-primary-foreground' : ''}
										${isCurrent ? 'border-primary ring-4 ring-primary/20' : ''}
										${!isCompleted && !isCurrent ? 'border-muted' : ''}
									`}
								>
									{isCompleted ? <Check className="size-3" /> : null}
								</div>
								<span className={`text-xs mt-2 ${isCurrent ? 'font-medium' : 'text-muted-foreground'}`}>
									{step.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const ShippingTier = ({
	value,
	name,
	time,
	price,
	features,
	recommended,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	recommended?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative transition-all hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${recommended ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{recommended && <Badge className="absolute -top-2.5 left-4">Recommended</Badge>}
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<span className="font-semibold">{name}</span>
							<span className="font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
							<Clock className="size-3.5" />
							<span>{time}</span>
						</div>
						<div className="flex flex-wrap gap-1">
							{features.map((f, i) => (
								<Badge key={i} variant="secondary" className="text-xs font-normal">{f}</Badge>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const AddonCheckbox = ({
	id,
	icon: Icon,
	name,
	price,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	price: string;
}) => (
	<Label htmlFor={id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<Checkbox id={id} />
		<Icon className="size-4 text-muted-foreground" />
		<span className="flex-1 text-sm font-medium">{name}</span>
		<span className="text-sm font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const steps = [
		{ label: 'Cart', icon: Package },
		{ label: 'Address', icon: MapPin },
		{ label: 'Shipping', icon: Truck },
		{ label: 'Payment', icon: Package },
	];

	const tiers = [
		{ value: 'standard', name: 'Standard', time: '5-7 business days', price: '$5.99', features: ['Tracking', 'Email updates'] },
		{ value: 'express', name: 'Express', time: '2-3 business days', price: '$12.99', features: ['Priority', 'SMS updates', 'Insurance'], recommended: true },
		{ value: 'overnight', name: 'Overnight', time: 'Next business day', price: '$24.99', features: ['Guaranteed', 'Full insurance', 'Signature'] },
	];

	const addons = [
		{ id: 'insurance', icon: Shield, name: 'Shipping Insurance', price: '+$3.99' },
		{ id: 'gift', icon: Gift, name: 'Gift Wrapping', price: '+$5.99' },
		{ id: 'carbon', icon: Leaf, name: 'Carbon Neutral', price: '+$0.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2 text-center">Shipping</h1>
				<p className="text-muted-foreground text-center mb-8">Step 3 of 4</p>

				<ProgressBar steps={steps} currentStep={2} />

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4">Select Shipping Speed</h2>
					<RadioGroup defaultValue="express" className="space-y-3">
						{tiers.map((tier) => (
							<ShippingTier key={tier.value} {...tier} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-4">Add-ons</h2>
					<div className="space-y-2">
						{addons.map((addon) => (
							<AddonCheckbox key={addon.id} {...addon} />
						))}
					</div>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">
						Continue to Payment
						<ChevronRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
