import { Package, Truck, Clock, Check, MapPin, Calendar, ArrowRight, ShoppingCart, CreditCard, Gift } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const VerticalStep = ({
	step,
	title,
	subtitle,
	icon: Icon,
	status,
	children,
	isLast,
}: {
	step: number;
	title: string;
	subtitle?: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'completed' | 'current' | 'upcoming';
	children?: React.ReactNode;
	isLast?: boolean;
}) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`
					flex size-12 shrink-0 items-center justify-center rounded-full border-2 transition-all
					${status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : ''}
					${status === 'current' ? 'border-primary bg-primary/10 text-primary ring-4 ring-primary/20' : ''}
					${status === 'upcoming' ? 'border-muted bg-muted text-muted-foreground' : ''}
				`}
			>
				{status === 'completed' ? <Check className="size-6" /> : <Icon className="size-6" />}
			</div>
			{!isLast && (
				<div className={`w-0.5 flex-1 my-2 min-h-[40px] ${status === 'completed' ? 'bg-primary' : 'bg-muted'}`} />
			)}
		</div>
		<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
			<div className="flex items-center gap-2 mb-1">
				<h3 className={`font-semibold text-lg ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}>{title}</h3>
				{status === 'completed' && <Badge variant="secondary" className="text-xs">Complete</Badge>}
				{status === 'current' && <Badge className="text-xs">Current Step</Badge>}
			</div>
			{subtitle && <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>}
			{status === 'current' && children && (
				<Card className="mt-4">
					<CardContent className="p-4">{children}</CardContent>
				</Card>
			)}
		</div>
	</div>
);

const ShippingRadio = ({
	value,
	name,
	time,
	price,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<span className="font-medium">{name}</span>
			<span className="text-sm text-muted-foreground">{time}</span>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const shippingOptions = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold">Checkout</h1>
					<div className="text-right">
						<p className="text-sm text-muted-foreground">Step 2 of 4</p>
						<Progress value={50} className="w-24 h-2 mt-1" />
					</div>
				</div>

				<VerticalStep
					step={1}
					title="Shopping Cart"
					subtitle="3 items • $89.97"
					icon={ShoppingCart}
					status="completed"
				/>

				<VerticalStep
					step={2}
					title="Shipping Method"
					subtitle="Choose your delivery speed"
					icon={Truck}
					status="current"
				>
					<RadioGroup defaultValue="express" className="space-y-2">
						{shippingOptions.map((option) => (
							<ShippingRadio key={option.value} {...option} />
						))}
					</RadioGroup>
					<Button className="w-full mt-4">
						Continue to Payment
						<ArrowRight className="size-4 ml-2" />
					</Button>
				</VerticalStep>

				<VerticalStep
					step={3}
					title="Payment"
					subtitle="Credit card, PayPal, or more"
					icon={CreditCard}
					status="upcoming"
				/>

				<VerticalStep
					step={4}
					title="Review & Confirm"
					subtitle="Final order review"
					icon={Gift}
					status="upcoming"
					isLast
				/>
			</div>
		</section>
	);
}
