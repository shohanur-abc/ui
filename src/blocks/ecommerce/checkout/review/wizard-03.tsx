'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	ArrowLeft,
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const WizardStep = ({
	number,
	label,
	active,
	completed,
}: {
	number: number;
	label: string;
	active: boolean;
	completed: boolean;
}) => (
	<div className="flex flex-col items-center gap-1">
		<div
			className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
				completed
					? 'bg-green-500 text-white'
					: active
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{completed ? <Check className="size-5" /> : number}
		</div>
		<span
			className={`text-xs ${active ? 'font-medium' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const AddressBox = ({
	type,
	name,
	address,
}: {
	type: string;
	name: string;
	address: string;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<p className="mb-1 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryBox = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentBox = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<CreditCard className="size-6 text-primary" />
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const SummaryRow = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const [step, setStep] = useState(3);
	const totalSteps = 4;

	const items: CartItem[] = [
		{
			id: '1',
			name: 'Standing Desk',
			variant: 'Electric / Walnut',
			price: 599.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Monitor Arm',
			variant: 'Dual / Clamp',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Complete Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Step {step} of {totalSteps} - Review
					</p>
				</div>

				<div className="mb-8">
					<div className="flex justify-between">
						{[
							{ label: 'Cart', icon: Package },
							{ label: 'Shipping', icon: MapPin },
							{ label: 'Payment', icon: CreditCard },
							{ label: 'Review', icon: Check },
						].map((s, i) => (
							<WizardStep
								key={s.label}
								number={i + 1}
								label={s.label}
								active={step === i + 1}
								completed={step > i + 1}
							/>
						))}
					</div>
					<Progress value={(step / totalSteps) * 100} className="mt-4" />
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-6">
						<div className="space-y-4">
							<h2 className="font-semibold">Order Items</h2>
							{items.map((item) => (
								<ItemRow key={item.id} item={item} />
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<AddressBox
								type="Shipping"
								name="Thomas W."
								address="456 Office Blvd, Chicago, IL 60601"
							/>
							<AddressBox
								type="Billing"
								name="Thomas W."
								address="456 Office Blvd, Chicago, IL 60601"
							/>
						</div>

						<DeliveryBox
							method="White Glove Delivery"
							date="Dec 22-23, 2025"
							price="$49.99"
						/>

						<PaymentBox brand="Amex" last4="0002" exp="03/28" />

						<div className="flex justify-between pt-4">
							<Button
								variant="outline"
								onClick={() => setStep((s) => Math.max(1, s - 1))}
							>
								<ArrowLeft className="mr-2 size-4" />
								Back
							</Button>
							{step < totalSteps && (
								<Button
									onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
								>
									Next
									<ArrowRight className="ml-2 size-4" />
								</Button>
							)}
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (2 items)" value="$749.98" />
							<SummaryRow label="Shipping" value="$49.99" />
							<SummaryRow label="Tax" value="$63.75" />
							<SummaryRow label="Discount (DESK20)" value="-$150.00" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$713.72" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button
								size="lg"
								className="w-full gap-2"
								disabled={step !== totalSteps}
							>
								<Lock className="size-4" />
								Place Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
