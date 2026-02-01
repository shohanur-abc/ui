import {
	Truck,
	Zap,
	Package,
	Star,
	Clock,
	Check,
	ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const IconRadioOption = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	features,
	popular,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	features: string[];
	popular?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-lg hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-gradient-to-br has-[:checked]:from-primary/10 has-[:checked]:to-transparent
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
					Most Popular
				</Badge>
			)}
			<CardContent className="p-6 text-center">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<div className="flex size-16 mx-auto mb-4 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<Icon className="size-8" />
				</div>
				<h3 className="text-xl font-bold mb-1">{name}</h3>
				<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
				<span className="text-3xl font-bold text-primary">{price}</span>
				<ul className="mt-4 space-y-2 text-left">
					{features.map((feature, i) => (
						<li key={i} className="flex items-center gap-2 text-sm">
							<Check className="size-4 text-primary shrink-0" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const options = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard',
			time: '5-7 days',
			price: '$5.99',
			features: ['Basic tracking', 'Email updates'],
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express',
			time: '2-3 days',
			price: '$12.99',
			popular: true,
			features: [
				'Real-time tracking',
				'Priority handling',
				'Insurance included',
			],
		},
		{
			value: 'overnight',
			icon: Zap,
			name: 'Overnight',
			time: 'Next day',
			price: '$24.99',
			features: ['Guaranteed delivery', 'Full insurance', 'Signature required'],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Speed
					</h1>
					<p className="text-muted-foreground">
						Select your preferred delivery option
					</p>
				</div>

				<RadioGroup
					defaultValue="express"
					className="grid @md:grid-cols-3 gap-6"
				>
					{options.map((option) => (
						<IconRadioOption key={option.value} {...option} />
					))}
				</RadioGroup>

				<div className="flex justify-center pt-8">
					<Button size="lg" className="min-w-[200px]">
						Continue
						<ChevronRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
