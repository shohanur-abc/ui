import { Truck, Package, Clock, Check, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const CompactRadio = ({
	value,
	name,
	time,
	price,
	free,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	free?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<span className="font-medium">{name}</span>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-sm text-muted-foreground">{time}</span>
			<span
				className={`font-bold ${free ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}
			>
				{price}
			</span>
		</div>
	</Label>
);

const DetailedRadio = ({
	value,
	name,
	time,
	price,
	features,
	bestValue,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	bestValue?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<div
			className={`
				relative p-5 rounded-xl border-2 cursor-pointer transition-all
				hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${bestValue ? 'ring-2 ring-primary/20' : ''}
			`}
		>
			{bestValue && (
				<Badge className="absolute -top-2.5 right-4">Best Value</Badge>
			)}
			<div className="flex items-start gap-4">
				<RadioGroupItem value={value} id={value} className="mt-1" />
				<div className="flex-1">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-semibold text-lg">{name}</h3>
						<span className="text-xl font-bold text-primary">{price}</span>
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
						<Clock className="size-4" />
						<span>{time}</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{features.map((feature, i) => (
							<Badge key={i} variant="secondary" className="font-normal">
								{feature}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	</Label>
);

export default function Main() {
	const compactOptions = [
		{
			value: 'free',
			name: 'Free Shipping',
			time: '7-10 days',
			price: 'Free',
			free: true,
		},
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
	];

	const detailedOptions = [
		{
			value: 'express',
			name: 'Express',
			time: '2-3 business days',
			price: '$12.99',
			features: ['Priority handling', 'Full tracking', 'Insurance'],
			bestValue: true,
		},
		{
			value: 'overnight',
			name: 'Overnight',
			time: 'Next business day',
			price: '$24.99',
			features: [
				'Guaranteed delivery',
				'Signature required',
				'Premium support',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<Truck className="size-6" />
					</div>
					<div>
						<h1 className="text-2xl font-bold">Shipping Method</h1>
						<p className="text-muted-foreground">Choose your delivery speed</p>
					</div>
				</div>

				<div className="mb-6">
					<h2 className="text-sm font-medium text-muted-foreground mb-3">
						ECONOMY OPTIONS
					</h2>
					<RadioGroup defaultValue="free" className="space-y-2">
						{compactOptions.map((option) => (
							<CompactRadio key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Separator className="my-6" />

				<div>
					<h2 className="text-sm font-medium text-muted-foreground mb-3">
						FAST DELIVERY
					</h2>
					<RadioGroup className="space-y-4">
						{detailedOptions.map((option) => (
							<DetailedRadio key={option.value} {...option} />
						))}
					</RadioGroup>
				</div>

				<Button className="w-full h-12 text-base mt-8">
					Continue to Payment
					<ArrowRight className="size-5 ml-2" />
				</Button>
			</div>
		</section>
	);
}
