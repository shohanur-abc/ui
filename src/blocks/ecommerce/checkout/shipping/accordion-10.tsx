import {
	Truck,
	Package,
	Shield,
	Gift,
	Leaf,
	Clock,
	Check,
	Star,
	ArrowRight,
	Info,
	ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const ShippingTier = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	color,
	selected,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	color: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all
			hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
		`}
	>
		<RadioGroupItem value={value} id={value} className="sr-only" />
		<div
			className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white mb-2`}
		>
			<Icon className="size-6" />
		</div>
		<span className="font-bold">{name}</span>
		<span className="text-sm text-muted-foreground">{time}</span>
		<span className="text-lg font-bold text-primary mt-1">{price}</span>
	</Label>
);

const AddonItem = ({
	id,
	icon: Icon,
	name,
	description,
	price,
}: {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	price: string;
}) => (
	<Label
		htmlFor={id}
		className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<Checkbox id={id} />
		<Icon className="size-5 text-muted-foreground shrink-0" />
		<div className="flex-1">
			<span className="font-medium">{name}</span>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<span className="font-bold text-primary shrink-0">{price}</span>
	</Label>
);

const TierFeature = ({
	text,
	included,
}: {
	text: string;
	included: boolean;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Check
			className={`size-4 shrink-0 ${included ? 'text-primary' : 'text-muted-foreground/30'}`}
		/>
		<span className={included ? '' : 'text-muted-foreground/50 line-through'}>
			{text}
		</span>
	</div>
);

export default function Main() {
	const tiers = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard',
			time: '5-7 days',
			price: '$5.99',
			color: 'from-slate-500 to-slate-600',
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express',
			time: '2-3 days',
			price: '$12.99',
			color: 'from-blue-500 to-blue-600',
		},
		{
			value: 'premium',
			icon: Star,
			name: 'Premium',
			time: '1 day',
			price: '$24.99',
			color: 'from-amber-500 to-amber-600',
		},
	];

	const addons = [
		{
			id: 'insurance',
			icon: Shield,
			name: 'Insurance',
			description: 'Coverage up to $200',
			price: '+$3.99',
		},
		{
			id: 'gift',
			icon: Gift,
			name: 'Gift Wrap',
			description: 'Premium packaging',
			price: '+$5.99',
		},
		{
			id: 'carbon',
			icon: Leaf,
			name: 'Carbon Offset',
			description: 'Eco-friendly shipping',
			price: '+$0.99',
		},
	];

	const tierFeatures = [
		{ text: 'Basic tracking', standard: true, express: true, premium: true },
		{
			text: 'Real-time updates',
			standard: false,
			express: true,
			premium: true,
		},
		{
			text: 'Priority handling',
			standard: false,
			express: true,
			premium: true,
		},
		{
			text: 'Signature delivery',
			standard: false,
			express: false,
			premium: true,
		},
		{ text: 'Premium support', standard: false, express: false, premium: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Complete Shipping
					</h1>
					<p className="text-muted-foreground">
						Select your tier and customize your experience
					</p>
				</div>

				<Accordion
					type="multiple"
					defaultValue={['speed', 'features']}
					className="space-y-4"
				>
					<AccordionItem value="speed" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Truck className="size-5 text-primary" />
								<span className="font-semibold">Shipping Speed</span>
								<Badge variant="secondary">Express selected</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup
								defaultValue="express"
								className="grid grid-cols-3 gap-4"
							>
								{tiers.map((tier) => (
									<ShippingTier key={tier.value} {...tier} />
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="features" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Check className="size-5 text-primary" />
								<span className="font-semibold">What's Included</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<div className="grid @sm:grid-cols-3 gap-4">
								{['Standard', 'Express', 'Premium'].map((tier, tierIdx) => (
									<div
										key={tier}
										className={`p-4 rounded-xl ${tierIdx === 1 ? 'bg-primary/5 ring-2 ring-primary/30' : 'bg-muted/30'}`}
									>
										<h4 className="font-semibold mb-3">{tier}</h4>
										<div className="space-y-2">
											{tierFeatures.map((feature, i) => {
												const included =
													tierIdx === 0
														? feature.standard
														: tierIdx === 1
															? feature.express
															: feature.premium;
												return (
													<TierFeature
														key={i}
														text={feature.text}
														included={included}
													/>
												);
											})}
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="addons" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<div className="flex items-center gap-3">
								<Star className="size-5 text-primary" />
								<span className="font-semibold">Add-ons</span>
								<Badge variant="outline">Optional</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4 space-y-2">
							{addons.map((addon) => (
								<AddonItem key={addon.id} {...addon} />
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Separator className="my-6" />

				<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-6">
					<div>
						<p className="text-sm text-muted-foreground">Shipping Total</p>
						<p className="text-2xl font-bold">$17.97</p>
						<p className="text-sm text-muted-foreground">
							Express + Insurance + Carbon
						</p>
					</div>
					<Button size="lg">
						Continue to Payment
						<ArrowRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
