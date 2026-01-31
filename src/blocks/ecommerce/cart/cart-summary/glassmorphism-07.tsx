'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck, Zap, Package, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ShippingOptionProps = {
	id: string;
	icon: LucideIcon;
	name: string;
	estimate: string;
	price: string;
	recommended?: boolean;
};

const BlueGlassBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
		{children}
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const ShippingOption = ({
	id,
	icon: Icon,
	name,
	estimate,
	price,
	recommended,
}: ShippingOptionProps) => (
	<label
		htmlFor={id}
		className="relative flex cursor-pointer items-center gap-3 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur transition-all hover:bg-white/10 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="flex size-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{recommended && (
					<Badge className="bg-white/20 text-xs backdrop-blur">Best</Badge>
				)}
			</div>
			<p className="text-xs text-muted-foreground">{estimate}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</label>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$529.00' },
		{ label: 'Shipping', value: '$0.00' },
		{ label: 'Tax', value: '$42.32' },
	];

	const shippingOptions: ShippingOptionProps[] = [
		{
			id: 'standard',
			icon: Package,
			name: 'Standard',
			estimate: '5-7 business days',
			price: 'Free',
			recommended: true,
		},
		{
			id: 'express',
			icon: Truck,
			name: 'Express',
			estimate: '2-3 business days',
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

	return (
		<section className="@container relative">
			<BlueGlassBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<h3 className="mb-4 text-base font-semibold">Shipping Method</h3>
					<RadioGroup defaultValue="standard" className="space-y-2">
						{shippingOptions.map((option) => (
							<ShippingOption key={option.id} {...option} />
						))}
					</RadioGroup>
					<Separator className="my-4 bg-white/20" />
					<div className="space-y-2">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$571.32" />
					<Button
						className="mt-6 w-full bg-white/20 backdrop-blur hover:bg-white/30"
						size="lg"
						asChild
					>
						<Link href="/checkout">Continue to Payment</Link>
					</Button>
				</GlassCard>
			</div>
		</section>
	);
}
