'use client';

import { ArrowRight, CreditCard, Gift, Lock, Percent } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const PromoCodeInline = ({ applied }: { applied?: boolean }) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input
				placeholder="Promo code"
				className="h-8 text-sm pl-8"
				defaultValue={applied ? 'SAVE20' : ''}
			/>
		</div>
		<Button variant="outline" size="sm" className="h-8 text-xs">
			{applied ? 'Applied' : 'Apply'}
		</Button>
	</div>
);

const DiscountBadge = () => (
	<Badge variant="secondary" className="gap-1 text-emerald-600">
		<Percent className="size-3" />
		20% Off Applied
	</Badge>
);

const CompactCardForm = () => (
	<div className="space-y-2.5">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="flex gap-2">
			<Input placeholder="Name on card" className="h-9 text-sm flex-1" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const SaveCardOption = () => (
	<div className="flex items-center gap-2">
		<Checkbox id="save" className="size-3.5" />
		<Label
			htmlFor="save"
			className="text-xs text-muted-foreground cursor-pointer"
		>
			Save card for future
		</Label>
	</div>
);

const PriceSummary = ({
	original,
	discount,
	total,
}: {
	original: string;
	discount: string;
	total: string;
}) => (
	<div className="space-y-1.5">
		<div className="flex justify-between text-xs">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{original}</span>
		</div>
		<div className="flex justify-between text-xs text-emerald-600">
			<span>Discount</span>
			<span>-{discount}</span>
		</div>
		<Separator className="my-1" />
		<div className="flex justify-between">
			<span className="text-sm font-medium">Total</span>
			<span className="font-semibold">{total}</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">Checkout</span>
							<DiscountBadge />
						</div>
						<PromoCodeInline applied />
						<CompactCardForm />
						<SaveCardOption />
						<PriceSummary original="$100.00" discount="$20.00" total="$80.00" />
						<Button className="w-full h-9 text-sm gap-2">
							<Lock className="size-3.5" />
							Pay $80.00
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
