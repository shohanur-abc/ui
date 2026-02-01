import { Truck, Clock, Check, Package, Star, Zap, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const SpeedCard = ({
	value,
	name,
	time,
	price,
	icon: Icon,
	features,
	recommended,
	color,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	icon: React.ComponentType<{ className?: string }>;
	features: string[];
	recommended?: boolean;
	color: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 has-[:checked]:border-primary
				${recommended ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{recommended && (
				<Badge className="absolute top-4 right-4">Recommended</Badge>
			)}
			<div className={`absolute inset-x-0 top-0 h-1 ${color}`} />
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<RadioGroupItem value={value} id={value} className="mt-1" />
					<div
						className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${color.replace('bg-', 'bg-').replace('-500', '-500/20')} text-${color.replace('bg-', '')}`}
					>
						<Icon className="size-7" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1">
							<h3 className="text-xl font-bold">{name}</h3>
							<span className="text-2xl font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground mb-4">
							<Clock className="size-4" />
							<span>{time}</span>
						</div>
						<div className="grid @sm:grid-cols-2 gap-2">
							{features.map((feature, i) => (
								<div key={i} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary" />
									<span>{feature}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const OrderProgress = ({
	items,
	subtotal,
	shipping,
	total,
}: {
	items: number;
	subtotal: string;
	shipping: string;
	total: string;
}) => (
	<Card className="bg-muted/30">
		<CardHeader className="pb-2">
			<CardTitle className="text-base">Order Summary</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">{items} items</span>
					<span>{subtotal}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span className="text-primary">{shipping}</span>
				</div>
				<Separator className="my-2" />
				<div className="flex justify-between font-semibold text-base">
					<span>Total</span>
					<span>{total}</span>
				</div>
			</div>
			<div className="mt-4">
				<div className="flex justify-between text-xs text-muted-foreground mb-1">
					<span>Free shipping at $50</span>
					<span>$35.00 / $50.00</span>
				</div>
				<Progress value={70} className="h-2" />
				<p className="text-xs text-muted-foreground mt-1">
					Add $15.00 more for free shipping
				</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const shippingOptions = [
		{
			value: 'economy',
			name: 'Economy',
			time: '7-10 business days',
			price: '$3.99',
			icon: Package,
			color: 'bg-slate-500',
			features: ['Basic tracking', 'Standard packaging'],
		},
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 business days',
			price: '$7.99',
			icon: Truck,
			color: 'bg-blue-500',
			features: [
				'Full tracking',
				'Secure packaging',
				'Email updates',
				'Insurance up to $50',
			],
		},
		{
			value: 'express',
			name: 'Express',
			time: '2-3 business days',
			price: '$14.99',
			icon: Zap,
			color: 'bg-primary',
			recommended: true,
			features: [
				'Priority handling',
				'Real-time tracking',
				'Insurance included',
				'SMS updates',
			],
		},
		{
			value: 'overnight',
			name: 'Overnight',
			time: 'Next business day',
			price: '$29.99',
			icon: Star,
			color: 'bg-amber-500',
			features: [
				'Guaranteed delivery',
				'Full insurance',
				'Signature required',
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
						Choose how fast you want your order delivered
					</p>
				</div>

				<RadioGroup defaultValue="express" className="space-y-4 mb-8">
					{shippingOptions.map((option) => (
						<SpeedCard key={option.value} {...option} />
					))}
				</RadioGroup>

				<OrderProgress
					items={3}
					subtotal="$35.00"
					shipping="$14.99"
					total="$49.99"
				/>

				<Button className="w-full h-12 text-base mt-6">
					Continue to Payment
				</Button>
			</div>
		</section>
	);
}
