'use client';

import { Award, Check, CreditCard, DollarSign, Gift, Lock, Plus, Shield, Star, Wallet, Zap } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

interface RewardTier {
	name: string;
	points: number;
	multiplier: string;
	color: string;
}

const PointsBalanceContent = ({ balance, value, tier }: { balance: number; value: string; tier: RewardTier }) => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Award className={`size-5 ${tier.color}`} />
					<span className="font-medium">{tier.name} Member</span>
				</div>
				<Badge variant="outline" className="gap-1">{tier.multiplier} Points</Badge>
			</div>
			<div className="flex items-end justify-between">
				<div>
					<span className="text-3xl font-bold">{balance.toLocaleString()}</span>
					<p className="text-sm text-muted-foreground">Available points</p>
				</div>
				<div className="text-right">
					<span className="text-lg font-medium">{value}</span>
					<p className="text-xs text-muted-foreground">Cash value</p>
				</div>
			</div>
		</div>
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Next tier: {tier.name === 'Gold' ? 'Platinum' : 'Diamond'}</span>
			<span className="font-medium">2,500 more points</span>
		</div>
	</div>
);

const RedeemPointsContent = ({ maxPoints, orderTotal }: { maxPoints: number; orderTotal: number }) => (
	<div className="space-y-4 pt-4">
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label className="text-sm">Points to redeem</Label>
				<span className="text-sm font-medium">0 / {maxPoints.toLocaleString()}</span>
			</div>
			<Slider defaultValue={[0]} max={maxPoints} step={100} className="w-full" />
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>0 pts ($0.00)</span>
				<span>{maxPoints.toLocaleString()} pts (${(maxPoints / 100).toFixed(2)})</span>
			</div>
		</div>
		<RadioGroup defaultValue="none" className="space-y-2">
			<Label htmlFor="none" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="none" id="none" />
				<span className="text-sm">Don't use points</span>
			</Label>
			<Label htmlFor="partial" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="partial" id="partial" />
				<span className="text-sm">Use 2,500 points (-$25.00)</span>
			</Label>
			<Label htmlFor="max" className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
				<RadioGroupItem value="max" id="max" />
				<span className="text-sm">Use all points (-${(maxPoints / 100).toFixed(2)})</span>
			</Label>
		</RadioGroup>
	</div>
);

const EarnPointsContent = ({ earnablePoints, bonusItems }: { earnablePoints: number; bonusItems: { name: string; points: number }[] }) => (
	<div className="space-y-4 pt-4">
		<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Star className="size-4 text-emerald-500" />
				<span className="font-medium text-emerald-700 dark:text-emerald-400">Earn {earnablePoints.toLocaleString()} points!</span>
			</div>
			<p className="text-sm text-muted-foreground">Points will be added after order completion</p>
		</div>
		<div className="space-y-2">
			<span className="text-sm font-medium">Point breakdown:</span>
			{bonusItems.map((item, index) => (
				<div key={index} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/30">
					<span className="text-muted-foreground">{item.name}</span>
					<span className="font-medium">+{item.points} pts</span>
				</div>
			))}
		</div>
	</div>
);

const GiftCardsContent = () => (
	<div className="space-y-4 pt-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Gift card code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Gift className="size-4 text-primary" />
				<div>
					<span className="text-sm font-medium">•••• 7890</span>
					<p className="text-xs text-muted-foreground">Balance: $75.00</p>
				</div>
			</div>
			<Badge variant="secondary">-$75.00</Badge>
		</div>
		<Button variant="ghost" className="w-full gap-2 text-sm">
			<Plus className="size-4" />
			Add another gift card
		</Button>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4 pt-4">
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on Card</Label>
			<Input placeholder="JOHN DOE" />
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
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
			<span className="text-primary font-medium">2x points</span> earned when using your rewards card
		</div>
	</div>
);

const OrderSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean; isDiscount?: boolean; isPoints?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={`${line.isDiscount ? 'text-emerald-600' : ''} ${line.isPoints ? 'flex items-center gap-1' : ''} ${!line.isTotal && !line.isDiscount ? 'text-muted-foreground' : ''}`}>
						{line.isPoints && <Star className="size-3 text-amber-500" />}
						{line.label}
					</span>
					<span className={line.isDiscount ? 'text-emerald-600' : ''}>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label, earnPoints }: { label: string; earnPoints: number }) => (
	<div className="space-y-3">
		<Button className="w-full gap-2" size="lg">
			<Lock className="size-4" />
			{label}
		</Button>
		<p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
			<Star className="size-3 text-amber-500" />
			Earn {earnPoints.toLocaleString()} points with this purchase
		</p>
	</div>
);

export default function Main() {
	const tier: RewardTier = { name: 'Gold', points: 12500, multiplier: '2x', color: 'text-amber-500' };

	const earnableItems = [
		{ name: 'Base points', points: 299 },
		{ name: 'Gold member bonus (2x)', points: 299 },
		{ name: 'Category bonus', points: 100 },
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Gift Card', value: '-$75.00', isDiscount: true },
		{ label: 'Points Redeemed (2,500 pts)', value: '-$25.00', isDiscount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$15.92' },
		{ label: 'Total', value: '$214.92', isTotal: true },
		{ label: 'Points Earned', value: '+698 pts', isPoints: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Award className="size-5 text-amber-500" />
								<h2 className="text-xl font-semibold">Rewards Checkout</h2>
							</div>
							<Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500">
								<Star className="size-3" />
								Gold
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="multiple" defaultValue={['balance', 'redeem']} className="w-full">
							<AccordionItem value="balance">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Award className="size-4 text-amber-500" />
										<span className="font-medium">Points Balance</span>
										<Badge variant="secondary" className="text-xs">{tier.points.toLocaleString()}</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PointsBalanceContent balance={tier.points} value="$125.00" tier={tier} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="redeem">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<DollarSign className="size-4" />
										<span className="font-medium">Redeem Points</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<RedeemPointsContent maxPoints={tier.points} orderTotal={299} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="earn">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Star className="size-4" />
										<span className="font-medium">Points You'll Earn</span>
										<Badge variant="outline" className="text-xs text-emerald-600">+698</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<EarnPointsContent earnablePoints={698} bonusItems={earnableItems} />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="giftcards">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Gift className="size-4" />
										<span className="font-medium">Gift Cards</span>
										<Badge variant="secondary" className="text-xs text-emerald-600">-$75</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<GiftCardsContent />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="payment">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<CreditCard className="size-4" />
										<span className="font-medium">Payment Method</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<PaymentMethodContent />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<PayButton label="Complete Order" earnPoints={698} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
