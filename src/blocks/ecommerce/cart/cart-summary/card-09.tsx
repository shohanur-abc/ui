'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck, Zap, Package, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ShippingOptionCardProps = {
	id: string;
	icon: LucideIcon;
	name: string;
	estimate: string;
	price: string;
	recommended?: boolean;
};

const ShippingOptionCard = ({
	id,
	icon: Icon,
	name,
	estimate,
	price,
	recommended,
}: ShippingOptionCardProps) => (
	<Card className="cursor-pointer transition-all has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
		<label htmlFor={id} className="cursor-pointer">
			<CardContent className="flex items-center gap-3 py-3">
				<RadioGroupItem value={id} id={id} className="sr-only" />
				<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
					<Icon className="size-5" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">{name}</span>
						{recommended && (
							<Badge variant="secondary" className="text-xs">
								Best
							</Badge>
						)}
					</div>
					<p className="text-xs text-muted-foreground">{estimate}</p>
				</div>
				<span className="font-semibold">{price}</span>
			</CardContent>
		</label>
	</Card>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const shippingOptions: ShippingOptionCardProps[] = [
		{
			id: 'standard',
			icon: Package,
			name: 'Standard',
			estimate: '5-7 days',
			price: 'Free',
			recommended: true,
		},
		{
			id: 'express',
			icon: Truck,
			name: 'Express',
			estimate: '2-3 days',
			price: '$9.99',
		},
		{
			id: 'overnight',
			icon: Zap,
			name: 'Overnight',
			estimate: 'Next day',
			price: '$24.99',
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$449.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$35.92' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<h3 className="mb-4 font-semibold">Shipping Method</h3>
				<RadioGroup defaultValue="standard" className="mb-4 space-y-2">
					{shippingOptions.map((option) => (
						<ShippingOptionCard key={option.id} {...option} />
					))}
				</RadioGroup>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$484.92</span>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Continue to Payment</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
