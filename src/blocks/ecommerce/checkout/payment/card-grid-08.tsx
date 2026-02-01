'use client';

import {
	BadgeCheck,
	Check,
	Clock,
	CreditCard,
	Gift,
	Lock,
	Percent,
	Shield,
	Star,
	Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface Product {
	name: string;
	variant: string;
	price: string;
	originalPrice?: string;
	image: string;
	badge?: string;
}

interface InstallmentOption {
	id: string;
	months: number;
	monthly: string;
	total: string;
	apr: string;
	popular?: boolean;
}

const ProductCard = ({
	name,
	variant,
	price,
	originalPrice,
	image,
	badge,
}: Product) => (
	<div className="flex gap-4 p-4 rounded-xl bg-muted/30">
		<div className="size-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl shrink-0">
			{image}
		</div>
		<div className="flex-1">
			<div className="flex items-start justify-between">
				<div>
					<h3 className="font-semibold">{name}</h3>
					<p className="text-sm text-muted-foreground">{variant}</p>
				</div>
				{badge && (
					<Badge variant="secondary" className="text-xs">
						{badge}
					</Badge>
				)}
			</div>
			<div className="flex items-center gap-2 mt-2">
				<span className="text-lg font-bold">{price}</span>
				{originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						{originalPrice}
					</span>
				)}
			</div>
		</div>
	</div>
);

const InstallmentCard = ({
	id,
	months,
	monthly,
	total,
	apr,
	popular,
	selected,
	onSelect,
}: InstallmentOption & {
	selected: boolean;
	onSelect: (id: string) => void;
}) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`relative flex-1 p-3 rounded-xl border-2 transition-all ${
			selected
				? 'border-primary bg-primary/5'
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		{popular && (
			<Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs gap-0.5">
				<Star className="size-2.5" />
				Best
			</Badge>
		)}
		<div className="text-center">
			<span className="text-lg font-bold">{months}×</span>
			<p className="text-sm font-medium">{monthly}</p>
			<p className="text-xs text-muted-foreground">{apr}</p>
		</div>
		{selected && (
			<div className="absolute top-2 right-2 size-4 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-2.5 text-primary-foreground" />
			</div>
		)}
	</button>
);

const InstallmentSelector = ({
	options,
	selected,
	onSelect,
}: {
	options: InstallmentOption[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<h3 className="text-sm font-medium">Split Payment</h3>
		</div>
		<div className="flex gap-2">
			{options.map((option) => (
				<InstallmentCard
					key={option.id}
					{...option}
					selected={selected === option.id}
					onSelect={onSelect}
				/>
			))}
		</div>
	</div>
);

const PaymentForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4 text-muted-foreground" />
			<h3 className="text-sm font-medium">Card Details</h3>
		</div>
		<div className="space-y-3">
			<div className="space-y-2">
				<Label className="text-sm">Card Number</Label>
				<Input placeholder="1234 5678 9012 3456" />
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-2">
					<Label className="text-sm">Expiry</Label>
					<Input placeholder="MM/YY" />
				</div>
				<div className="space-y-2">
					<Label className="text-sm">CVV</Label>
					<Input type="password" placeholder="•••" />
				</div>
			</div>
		</div>
	</div>
);

const PromoInput = () => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder="Promo code" className="pl-10" />
		</div>
		<Button variant="outline" size="sm">
			Apply
		</Button>
	</div>
);

const PaymentSummary = ({
	firstPayment,
	remaining,
}: {
	firstPayment: string;
	remaining: string;
}) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
		<div className="flex justify-between items-center">
			<div>
				<span className="font-medium">Due today</span>
				<p className="text-xs text-muted-foreground">First installment</p>
			</div>
			<span className="text-2xl font-bold">{firstPayment}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">5 remaining payments</span>
			<span>{remaining} each</span>
		</div>
	</div>
);

const TrustFeatures = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1">
			<Percent className="size-3" />
			<span>0% APR</span>
		</div>
		<div className="flex items-center gap-1">
			<BadgeCheck className="size-3" />
			<span>No fees</span>
		</div>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: Product = {
		name: 'MacBook Pro 14"',
		variant: 'M3 Pro • 18GB • 512GB',
		price: '$1,999',
		originalPrice: '$2,199',
		image: '💻',
		badge: 'Save $200',
	};

	const installmentOptions: InstallmentOption[] = [
		{ id: '3', months: 3, monthly: '$666.33', total: '$1,999', apr: '0% APR' },
		{
			id: '6',
			months: 6,
			monthly: '$333.17',
			total: '$1,999',
			apr: '0% APR',
			popular: true,
		},
		{
			id: '12',
			months: 12,
			monthly: '$174.92',
			total: '$2,099',
			apr: '5% APR',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<ProductCard {...product} />
					</CardHeader>
					<CardContent className="space-y-6">
						<InstallmentSelector
							options={installmentOptions}
							selected="6"
							onSelect={() => {}}
						/>
						<Separator />
						<PaymentForm />
						<PromoInput />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PaymentSummary firstPayment="$333.17" remaining="$333.17" />
						<PayButton label="Pay $333.17 now" />
						<TrustFeatures />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
