import {
	Truck,
	Package,
	Zap,
	Clock,
	Check,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShippingTierAccordion = ({
	value,
	icon: Icon,
	tier,
	time,
	price,
	description,
	features,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	tier: string;
	time: string;
	price: string;
	description: string;
	features: string[];
	popular?: boolean;
}) => (
	<AccordionItem
		value={value}
		className={`border rounded-xl px-4 ${popular ? 'ring-2 ring-primary/30' : ''}`}
	>
		{popular && (
			<Badge className="absolute -top-2.5 left-4 z-10">Most Popular</Badge>
		)}
		<AccordionTrigger className="hover:no-underline py-4">
			<div className="flex items-center gap-4 w-full">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
					<Icon className="size-6" />
				</div>
				<div className="flex-1 text-left">
					<div className="flex items-center gap-2">
						<h3 className="font-bold text-lg">{tier}</h3>
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Clock className="size-3.5" />
						<span>{time}</span>
					</div>
				</div>
				<span className="text-xl font-bold text-primary mr-2">{price}</span>
			</div>
		</AccordionTrigger>
		<AccordionContent className="pb-4">
			<p className="text-muted-foreground mb-4">{description}</p>
			<div className="space-y-2 mb-4">
				{features.map((feature, i) => (
					<div key={i} className="flex items-center gap-2">
						<Check className="size-4 text-primary" />
						<span className="text-sm">{feature}</span>
					</div>
				))}
			</div>
			<Button className="w-full">Select {tier}</Button>
		</AccordionContent>
	</AccordionItem>
);

export default function Main() {
	const tiers = [
		{
			value: 'economy',
			icon: Package,
			tier: 'Economy',
			time: '7-10 business days',
			price: '$4.99',
			description:
				'Our most affordable shipping option. Perfect for non-urgent orders.',
			features: ['Basic tracking', 'Email notifications', 'Standard packaging'],
		},
		{
			value: 'standard',
			icon: Truck,
			tier: 'Standard',
			time: '5-7 business days',
			price: '$7.99',
			description:
				'Reliable delivery at a great value. Best for most customers.',
			features: [
				'Real-time tracking',
				'SMS & email updates',
				'Insurance up to $100',
				'Priority handling',
			],
			popular: true,
		},
		{
			value: 'express',
			icon: Zap,
			tier: 'Express',
			time: '2-3 business days',
			price: '$14.99',
			description: 'Fast delivery for when you need it quickly.',
			features: [
				'Priority handling',
				'Real-time tracking',
				'Full insurance coverage',
				'Dedicated support',
			],
		},
		{
			value: 'overnight',
			icon: Zap,
			tier: 'Overnight',
			time: 'Next business day',
			price: '$29.99',
			description: 'Guaranteed next-day delivery for urgent orders.',
			features: [
				'Guaranteed delivery',
				'Premium tracking',
				'Full insurance',
				'Signature on delivery',
				'24/7 support',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Options
					</h1>
					<p className="text-muted-foreground">
						Expand to see details about each tier
					</p>
				</div>

				<Accordion type="single" defaultValue="standard" className="space-y-4">
					{tiers.map((tier) => (
						<ShippingTierAccordion key={tier.value} {...tier} />
					))}
				</Accordion>

				<div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
					<Info className="size-4" />
					<span>All shipping options include free returns within 30 days</span>
				</div>
			</div>
		</section>
	);
}
