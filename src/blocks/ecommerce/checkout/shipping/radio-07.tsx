import {
	Package,
	Truck,
	Zap,
	Star,
	Clock,
	Check,
	Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const TierRadio = ({
	value,
	tier,
	icon: Icon,
	description,
	time,
	price,
	features,
	color,
	popular,
}: {
	value: string;
	tier: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
	time: string;
	price: string;
	features: string[];
	color: string;
	popular?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<div
			className={`
				relative p-5 rounded-2xl border-2 transition-all overflow-hidden
				hover:shadow-lg hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${popular ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			<div className={`absolute inset-x-0 top-0 h-1.5 ${color}`} />
			{popular && (
				<Badge className="absolute top-4 right-4 gap-1">
					<Sparkles className="size-3" /> Popular
				</Badge>
			)}
			<div className="flex items-start gap-4 pt-2">
				<RadioGroupItem value={value} id={value} className="mt-1" />
				<div
					className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color.replace('bg-', 'from-')} to-transparent`}
				>
					<Icon className="size-7 text-white" />
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-between mb-1">
						<h3 className="text-xl font-bold">{tier}</h3>
						<span className="text-2xl font-bold text-primary">{price}</span>
					</div>
					<p className="text-sm text-muted-foreground mb-1">{description}</p>
					<div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
						<Clock className="size-4" />
						<span>{time}</span>
					</div>
					<div className="grid @sm:grid-cols-2 gap-2">
						{features.map((feature, i) => (
							<div key={i} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								<span>{feature}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</Label>
);

const FreeShippingProgress = ({
	current,
	threshold,
}: {
	current: number;
	threshold: number;
}) => {
	const progress = Math.min((current / threshold) * 100, 100);
	const remaining = threshold - current;

	return (
		<div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 mb-8">
			<div className="flex items-center justify-between mb-2">
				<span className="font-medium">Free Shipping Progress</span>
				<span className="text-sm text-muted-foreground">
					${current} / ${threshold}
				</span>
			</div>
			<Progress value={progress} className="h-2 mb-2" />
			{remaining > 0 ? (
				<p className="text-sm text-muted-foreground">
					Add ${remaining.toFixed(2)} more for free shipping!
				</p>
			) : (
				<p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
					<Check className="size-4" /> You've unlocked free shipping!
				</p>
			)}
		</div>
	);
};

export default function Main() {
	const tiers = [
		{
			value: 'basic',
			tier: 'Basic',
			icon: Package,
			description: 'Standard reliable shipping',
			time: '5-7 business days',
			price: '$5.99',
			color: 'bg-slate-500',
			features: ['Basic tracking', 'Email updates'],
		},
		{
			value: 'plus',
			tier: 'Plus',
			icon: Truck,
			description: 'Faster delivery with extras',
			time: '3-4 business days',
			price: '$9.99',
			color: 'bg-blue-500',
			popular: true,
			features: [
				'Real-time tracking',
				'SMS notifications',
				'Insurance up to $100',
				'Priority handling',
			],
		},
		{
			value: 'premium',
			tier: 'Premium',
			icon: Zap,
			description: 'Fastest option available',
			time: '1-2 business days',
			price: '$19.99',
			color: 'bg-amber-500',
			features: [
				'Express handling',
				'Full insurance',
				'Signature delivery',
				'Dedicated support',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Shipping Tiers
					</h1>
					<p className="text-muted-foreground">
						Choose the shipping experience that's right for you
					</p>
				</div>

				<FreeShippingProgress current={35} threshold={50} />

				<RadioGroup defaultValue="plus" className="space-y-4">
					{tiers.map((tier) => (
						<TierRadio key={tier.value} {...tier} />
					))}
				</RadioGroup>

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
