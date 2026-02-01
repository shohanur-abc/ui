import { Zap, Truck, Package, Clock, ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const GlowDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
		<div className="absolute top-1/4 -left-1/4 size-[500px] rounded-full bg-primary/10 blur-3xl" />
		<div className="absolute bottom-1/4 -right-1/4 size-[400px] rounded-full bg-primary/5 blur-3xl" />
	</div>
);

const SpeedCard = ({
	icon: Icon,
	name,
	time,
	price,
	description,
	features,
	highlighted,
	badge,
	onSelect,
}: {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	description: string;
	features: string[];
	highlighted?: boolean;
	badge?: string;
	onSelect?: () => void;
}) => (
	<Card
		className={`
			relative overflow-hidden transition-all hover:shadow-xl cursor-pointer
			${highlighted ? 'border-primary ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent' : 'hover:border-primary/50'}
		`}
		onClick={onSelect}
	>
		{badge && <Badge className="absolute top-4 right-4">{badge}</Badge>}
		<CardHeader className="pb-0">
			<div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg shadow-primary/30">
				<Icon className="size-7" />
			</div>
		</CardHeader>
		<CardContent className="pt-4">
			<h3 className="text-xl font-bold mb-1">{name}</h3>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>

			<div className="flex items-center gap-2 mb-4 text-sm">
				<Clock className="size-4 text-muted-foreground" />
				<span className="font-medium">{time}</span>
			</div>

			<Separator className="my-4" />

			<ul className="space-y-2 mb-6">
				{features.map((feature, i) => (
					<li key={i} className="flex items-center gap-2 text-sm">
						<Sparkles className="size-4 text-primary" />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<div className="flex items-center justify-between">
				<div>
					<span className="text-3xl font-bold">{price}</span>
				</div>
				<Button variant={highlighted ? 'default' : 'outline'} className="gap-2">
					Select
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const speedOptions = [
		{
			icon: Package,
			name: 'Standard',
			time: '5-7 business days',
			price: '$5.99',
			description: 'Reliable ground shipping',
			features: [
				'Package tracking',
				'Delivery confirmation',
				'Standard packaging',
			],
		},
		{
			icon: Truck,
			name: 'Express',
			time: '2-3 business days',
			price: '$14.99',
			description: 'Fast and dependable',
			features: [
				'Priority handling',
				'Real-time tracking',
				'Insurance included',
			],
			highlighted: true,
			badge: 'Best Value',
		},
		{
			icon: Zap,
			name: 'Rush',
			time: 'Next business day',
			price: '$29.99',
			description: 'When time is critical',
			features: [
				'Next-day guarantee',
				'Premium packaging',
				'Signature delivery',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<GlowDecorative />
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold tracking-tight mb-3">
						How Fast Do You Need It?
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Choose the delivery speed that fits your schedule
					</p>
				</div>

				<div className="grid @md:grid-cols-3 gap-6 mb-10">
					{speedOptions.map((option) => (
						<SpeedCard key={option.name} {...option} />
					))}
				</div>

				<div className="flex justify-center">
					<Button variant="ghost" size="lg">
						← Back to Cart
					</Button>
				</div>
			</div>
		</section>
	);
}
