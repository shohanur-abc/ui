'use client';

import {
	Award,
	Check,
	CreditCard,
	Gift,
	Lock,
	Star,
	Trophy,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

const RewardsBalanceCell = ({
	points,
	tier,
}: {
	points: number;
	tier: { name: string; color: string };
}) => (
	<Card className="border-border/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-2">
				<Award className={`size-5 ${tier.color}`} />
				<span className="font-medium">{tier.name} Member</span>
			</div>
			<div className="text-3xl font-bold">{points.toLocaleString()}</div>
			<span className="text-sm text-muted-foreground">points available</span>
		</CardContent>
	</Card>
);

const PointsSliderCell = ({
	max,
	value,
	onValueChange,
}: {
	max: number;
	value: number;
	onValueChange: (value: number) => void;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Use Points</span>
				<Badge variant="secondary">${(value / 100).toFixed(2)} value</Badge>
			</div>
			<Slider
				defaultValue={[value]}
				max={max}
				step={100}
				onValueChange={(v) => onValueChange(v[0])}
			/>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>0 pts</span>
				<span>{max.toLocaleString()} pts</span>
			</div>
		</CardContent>
	</Card>
);

const GiftCardCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Gift className="size-4 text-primary" />
				<span className="font-semibold text-sm">Gift Card</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-2">
				<Input placeholder="Card code" className="h-9 text-sm" />
				<Button variant="outline" size="sm">
					Add
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CardFormCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-primary" />
				<span className="font-semibold text-sm">Card Payment</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="relative">
				<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Card number" className="h-10 pl-9" />
			</div>
			<Input placeholder="Name on card" className="h-10" />
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="MM/YY" className="h-10" />
				<Input placeholder="CVV" type="password" className="h-10" />
			</div>
		</CardContent>
	</Card>
);

const EarnPointsCell = ({ earnablePoints }: { earnablePoints: number }) => (
	<Card className="border-border/50 bg-emerald-500/5 border-emerald-500/20 backdrop-blur-sm">
		<CardContent className="p-4 flex items-center gap-3">
			<div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
				<Star className="size-5 text-emerald-500" />
			</div>
			<div>
				<span className="font-medium">
					Earn {earnablePoints.toLocaleString()} points
				</span>
				<p className="text-xs text-muted-foreground">With this purchase</p>
			</div>
		</CardContent>
	</Card>
);

const CheckoutCell = ({
	total,
	pointsDiscount,
}: {
	total: string;
	pointsDiscount: string;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="space-y-1">
					<div className="flex justify-between text-sm gap-4">
						<span className="text-muted-foreground">Subtotal</span>
						<span>$299.00</span>
					</div>
					<div className="flex justify-between text-sm text-emerald-600 gap-4">
						<span>Points discount</span>
						<span>-{pointsDiscount}</span>
					</div>
				</div>
				<Separator orientation="vertical" className="h-10 mx-4" />
				<div className="text-right">
					<span className="text-sm text-muted-foreground">Pay</span>
					<p className="text-2xl font-bold">{total}</p>
				</div>
			</div>
			<Button className="w-full gap-2">
				<Lock className="size-4" />
				Complete Purchase
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const tier = { name: 'Gold', color: 'text-amber-500' };
	const pointsBalance = 15000;

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 gap-4">
					<RewardsBalanceCell points={pointsBalance} tier={tier} />
					<PointsSliderCell
						max={pointsBalance}
						value={5000}
						onValueChange={() => {}}
					/>
					<GiftCardCell />
					<CardFormCell />
					<EarnPointsCell earnablePoints={299} />
					<CheckoutCell total="$249.00" pointsDiscount="$50.00" />
				</div>
			</div>
		</section>
	);
}
