import { Package, Truck, Clock, Check, ArrowRight, Circle, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CompactTimeline = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-center justify-between mb-8">
		{steps.map((step, i) => (
			<div key={step} className="flex items-center flex-1">
				<div className="flex flex-col items-center">
					<div
						className={`
							flex size-8 items-center justify-center rounded-full text-sm font-bold
							${i < currentStep ? 'bg-primary text-primary-foreground' : ''}
							${i === currentStep ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
							${i > currentStep ? 'bg-muted text-muted-foreground' : ''}
						`}
					>
						{i < currentStep ? <Check className="size-4" /> : i + 1}
					</div>
					<span className={`text-xs mt-1 ${i > currentStep ? 'text-muted-foreground' : 'font-medium'}`}>
						{step}
					</span>
				</div>
				{i < steps.length - 1 && (
					<div className={`h-0.5 flex-1 mx-2 ${i < currentStep ? 'bg-primary' : 'bg-muted'}`} />
				)}
			</div>
		))}
	</div>
);

const ShippingTierCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	eta,
	color,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	eta: string;
	color: string;
	popular?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Best Value</Badge>}
			<CardContent className="p-5">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color} text-white`}>
						<Icon className="size-6" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<h3 className="font-bold text-lg">{name}</h3>
							<span className="text-xl font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<span className="flex items-center gap-1">
								<Clock className="size-3.5" />
								{time}
							</span>
							<span>•</span>
							<span>Arrives {eta}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const OrderProgress = ({
	progress,
	label,
}: {
	progress: number;
	label: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50">
		<div className="flex items-center justify-between mb-2">
			<span className="text-sm font-medium">{label}</span>
			<span className="text-sm text-muted-foreground">{progress}%</span>
		</div>
		<Progress value={progress} className="h-2" />
	</div>
);

export default function Main() {
	const steps = ['Cart', 'Address', 'Shipping', 'Payment'];
	const currentStep = 2;

	const tiers = [
		{ value: 'economy', icon: Package, name: 'Economy', time: '7-10 days', price: '$3.99', eta: 'Jan 24', color: 'bg-slate-500' },
		{ value: 'standard', icon: Truck, name: 'Standard', time: '5-7 days', price: '$7.99', eta: 'Jan 20', color: 'bg-blue-500', popular: true },
		{ value: 'express', icon: Zap, name: 'Express', time: '2-3 days', price: '$14.99', eta: 'Jan 16', color: 'bg-amber-500' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
				</div>

				<CompactTimeline steps={steps} currentStep={currentStep} />

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Truck className="size-5 text-primary" />
						Select Shipping Speed
					</h2>
					<RadioGroup defaultValue="standard" className="space-y-4">
						{tiers.map((tier) => (
							<ShippingTierCard key={tier.value} {...tier} />
						))}
					</RadioGroup>
				</div>

				<OrderProgress progress={60} label="Checkout Progress" />

				<div className="flex gap-3 pt-6">
					<Button variant="outline" className="flex-1">Back</Button>
					<Button className="flex-1">
						Continue to Payment
						<ArrowRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
