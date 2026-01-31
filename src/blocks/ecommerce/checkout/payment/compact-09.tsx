'use client';

import { Award, CreditCard, Gift, Lock, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

const PointsBalance = ({ balance, value }: { balance: number; value: string }) => (
	<div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
		<div className="flex items-center gap-2">
			<Award className="size-4 text-amber-500" />
			<span className="text-sm font-medium">{balance.toLocaleString()} pts</span>
		</div>
		<span className="text-sm text-muted-foreground">Worth {value}</span>
	</div>
);

const PointsSlider = ({ max, value }: { max: number; value: number }) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">Apply points</span>
			<span className="font-medium">{value.toLocaleString()} pts</span>
		</div>
		<Slider defaultValue={[value]} max={max} step={100} className="w-full" />
	</div>
);

const CompactCardForm = () => (
	<div className="space-y-2">
		<div className="relative">
			<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
			<Input placeholder="Card number" className="h-9 text-sm pl-8" />
		</div>
		<div className="grid grid-cols-2 gap-2">
			<Input placeholder="MM/YY" className="h-9 text-sm" />
			<Input placeholder="CVV" type="password" className="h-9 text-sm" />
		</div>
	</div>
);

const PricingSummary = ({ original, discount, total, pointsEarned }: { original: string; discount: string; total: string; pointsEarned: number }) => (
	<div className="space-y-1.5">
		<div className="flex justify-between text-xs">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{original}</span>
		</div>
		<div className="flex justify-between text-xs text-emerald-600">
			<span>Points discount</span>
			<span>-{discount}</span>
		</div>
		<Separator className="my-1" />
		<div className="flex justify-between">
			<span className="text-sm font-medium">Total</span>
			<span className="font-bold">{total}</span>
		</div>
		<div className="flex items-center gap-1 text-xs text-amber-600">
			<Star className="size-3" />
			<span>Earn {pointsEarned} points</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardContent className="p-4 space-y-4">
						<PointsBalance balance={5000} value="$50" />
						<PointsSlider max={5000} value={2000} />
						<Separator />
						<CompactCardForm />
						<PricingSummary original="$100.00" discount="$20.00" total="$80.00" pointsEarned={80} />
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
