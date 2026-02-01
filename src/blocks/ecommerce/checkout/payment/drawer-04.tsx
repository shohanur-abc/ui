'use client';

import {
	AlertCircle,
	Check,
	Clock,
	CreditCard,
	Gift,
	Lock,
	Percent,
	Shield,
	X,
	Zap,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface PromoOffer {
	code: string;
	description: string;
	discount: string;
	expiresIn?: string;
}

const DrawerHeader = ({
	title,
	onClose,
}: {
	title: string;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between pb-4 border-b">
		<h2 className="text-lg font-semibold">{title}</h2>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const DiscountBanner = ({ code, description, discount }: PromoOffer) => (
	<div className="relative p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 overflow-hidden">
		<div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mr-8 -mt-8" />
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
				<Percent className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<span className="font-semibold text-primary">{discount}</span>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			<Badge className="bg-primary">{code}</Badge>
		</div>
	</div>
);

const InstallmentOption = () => (
	<div className="p-4 rounded-xl border space-y-3">
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-primary" />
			<span className="font-medium">Pay in 4 installments</span>
			<Badge variant="secondary" className="text-xs">
				0% APR
			</Badge>
		</div>
		<RadioGroup defaultValue="4x" className="grid grid-cols-3 gap-2">
			{['2x', '3x', '4x'].map((option) => (
				<Label
					key={option}
					htmlFor={option}
					className="flex flex-col items-center p-2 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={option} id={option} className="sr-only" />
					<span className="font-bold">{option}</span>
					<span className="text-xs text-muted-foreground">
						${(299 / parseInt(option)).toFixed(2)}
					</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
				<div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
					<div className="size-6 rounded bg-muted" />
					<div className="size-6 rounded bg-muted" />
				</div>
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
		</div>
		<div className="grid grid-cols-2 gap-3">
			<div className="space-y-2">
				<Label className="text-sm">Expiry Date</Label>
				<Input placeholder="MM/YY" />
			</div>
			<div className="space-y-2">
				<Label className="text-sm">Security Code</Label>
				<div className="relative">
					<Input type="password" placeholder="•••" className="pr-10" />
					<Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				</div>
			</div>
		</div>
	</div>
);

const GiftCardSection = () => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Gift className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Have a gift card?</span>
		</div>
		<div className="flex gap-2">
			<Input placeholder="Enter gift card code" className="flex-1" />
			<Button variant="outline">Apply</Button>
		</div>
	</div>
);

const PromoCodeSection = () => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Promo code</span>
		</div>
		<div className="flex gap-2">
			<Input placeholder="Enter code" className="flex-1" />
			<Button variant="outline">Apply</Button>
		</div>
		<div className="flex items-center gap-2 text-emerald-600 text-sm">
			<Check className="size-4" />
			<span>SAVE20 applied - 20% off</span>
		</div>
	</div>
);

const OrderSummary = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isDiscount?: boolean;
	}[];
}) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span
						className={
							line.isDiscount
								? 'text-emerald-600'
								: !line.isTotal
									? 'text-muted-foreground'
									: ''
						}
					>
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>
						{line.value}
					</span>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const offer: PromoOffer = {
		code: 'SAVE20',
		description: 'First order discount',
		discount: '20% OFF',
	};

	const orderLines = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Discount (20%)', value: '-$59.80', isDiscount: true },
		{ label: 'Tax', value: '$19.14' },
		{ label: 'Total', value: '$258.34', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader title="Secure Checkout" onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-6">
						<DiscountBanner {...offer} />
						<InstallmentOption />
						<Separator />
						<CardForm />
						<GiftCardSection />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Pay $258.34
						</Button>
						<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<Shield className="size-3" />
								<span>Secure</span>
							</div>
							<div className="flex items-center gap-1">
								<Zap className="size-3" />
								<span>Instant</span>
							</div>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
