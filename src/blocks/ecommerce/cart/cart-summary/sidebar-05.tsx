'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck, Zap, Calendar, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ShippingOptionProps = {
	id: string;
	icon: LucideIcon;
	name: string;
	duration: string;
	price: string;
};

const ShippingOption = ({
	id,
	icon: Icon,
	name,
	duration,
	price,
}: ShippingOptionProps) => (
	<label
		htmlFor={id}
		className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="flex size-8 items-center justify-center rounded-full bg-muted">
			<Icon className="size-4" />
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{duration}</p>
		</div>
		<span className="text-sm font-semibold">{price}</span>
	</label>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const shippingOptions: ShippingOptionProps[] = [
		{ id: 'standard', icon: Truck, name: 'Standard', duration: '5-7 days', price: '$9.99' },
		{ id: 'express', icon: Zap, name: 'Express', duration: '2-3 days', price: '$19.99' },
		{ id: 'scheduled', icon: Calendar, name: 'Scheduled', duration: 'Pick a date', price: '$14.99' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$285.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$23.60' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[560px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Checkout</h3>
				<div className="mb-4">
					<p className="mb-2 text-sm font-medium">Delivery Method</p>
					<RadioGroup defaultValue="standard" className="space-y-2">
						{shippingOptions.map((option) => (
							<ShippingOption key={option.id} {...option} />
						))}
					</RadioGroup>
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$318.59</span>
				</div>
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href="/checkout/payment">
						Continue
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</aside>
		</section>
	);
}
