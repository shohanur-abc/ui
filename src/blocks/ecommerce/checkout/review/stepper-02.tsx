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

const StepButton = ({
	number,
	label,
	active,
	completed,
	onClick,
}: {
	number: number;
	label: string;
	active: boolean;
	completed: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
			active
				? 'bg-primary text-primary-foreground'
				: completed
					? 'bg-green-500/10 text-green-500'
					: 'bg-muted text-muted-foreground hover:bg-muted/80'
		}`}
	>
		{completed ? (
			<Check className="size-4" />
		) : (
			<span className="flex size-5 items-center justify-center rounded-full bg-background/20 text-xs font-bold">
				{number}
			</span>
		)}
		<span className="hidden @sm:inline">{label}</span>
	</button>
);

const ItemCard = ({ item }: { item: CartItem }) => (
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

const AddressCard = ({
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

const DeliveryCard = ({
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

const PaymentCard = ({
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

const SummaryLine = ({
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
	const [step, setStep] = useState(0);
	const steps = ['Items', 'Shipping', 'Payment', 'Review'];

	const items: CartItem[] = [
		{
			id: '1',
			name: 'Espresso Machine',
			variant: 'Semi-Auto / Black',
			price: 549.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Grinder',
			variant: 'Burr / Conical',
			price: 199.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Complete Your Order
					</h1>
				</div>

				<div className="mb-8 flex justify-center gap-2">
					{steps.map((s, i) => (
						<StepButton
							key={s}
							number={i + 1}
							label={s}
							active={step === i}
							completed={step > i}
							onClick={() => setStep(i)}
						/>
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{step === 0 &&
							items.map((item) => <ItemCard key={item.id} item={item} />)}
						{step === 1 && (
							<div className="grid gap-4 @sm:grid-cols-2">
								<AddressCard
									type="Shipping"
									name="David R."
									address="456 Barista Blvd, Seattle, WA 98101"
								/>
								<AddressCard
									type="Billing"
									name="David R."
									address="456 Barista Blvd, Seattle, WA 98101"
								/>
							</div>
						)}
						{step === 2 && (
							<>
								<DeliveryCard
									method="Premium"
									date="Dec 18-19, 2025"
									price="$24.99"
								/>
								<PaymentCard brand="Visa" last4="6543" exp="12/27" />
							</>
						)}
						{step === 3 && (
							<>
								{items.map((item) => (
									<ItemCard key={item.id} item={item} />
								))}
								<div className="grid gap-4 @sm:grid-cols-2">
									<AddressCard
										type="Shipping"
										name="David R."
										address="456 Barista Blvd, Seattle, WA"
									/>
									<AddressCard
										type="Billing"
										name="David R."
										address="456 Barista Blvd, Seattle, WA"
									/>
								</div>
								<DeliveryCard
									method="Premium"
									date="Dec 18-19"
									price="$24.99"
								/>
								<PaymentCard brand="Visa" last4="6543" exp="12/27" />
							</>
						)}

						<div className="flex justify-between pt-4">
							<Button
								variant="outline"
								onClick={() => setStep((s) => Math.max(0, s - 1))}
								disabled={step === 0}
							>
								<ArrowLeft className="mr-2 size-4" />
								Back
							</Button>
							{step < 3 && (
								<Button onClick={() => setStep((s) => Math.min(3, s + 1))}>
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
							<SummaryLine label="Subtotal (2 items)" value="$749.98" />
							<SummaryLine label="Shipping" value="$24.99" />
							<SummaryLine label="Tax" value="$63.75" />
							<SummaryLine label="Discount (COFFEE10)" value="-$75.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$763.72" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2" disabled={step !== 3}>
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
