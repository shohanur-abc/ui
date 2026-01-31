'use client';

import { ArrowLeft, ArrowRight, Award, Check, CreditCard, Gift, Lock, Percent, Shield, Star, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

interface RewardOption {
	id: string;
	points: number;
	value: string;
	description: string;
}

const HorizontalStepIndicator = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => (
	<div className="flex items-center gap-1 mb-6">
		{steps.map((step, index) => (
			<div key={index} className="flex-1 flex flex-col items-center">
				<div className="flex items-center w-full">
					<div
						className={`size-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
							index < currentStep
								? 'bg-primary text-primary-foreground'
								: index === currentStep
									? 'bg-primary text-primary-foreground'
									: 'bg-muted text-muted-foreground'
						}`}
					>
						{index < currentStep ? <Check className="size-3" /> : index + 1}
					</div>
					{index < steps.length - 1 && (
						<div className={`flex-1 h-0.5 mx-1 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
					)}
				</div>
				<span className={`text-xs mt-1 ${index === currentStep ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
					{step}
				</span>
			</div>
		))}
	</div>
);

const RewardBalanceDisplay = ({ balance, tier }: { balance: number; tier: { name: string; color: string; multiplier: string } }) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
		<div className="flex items-center justify-between mb-3">
			<div className="flex items-center gap-2">
				<Award className={`size-5 ${tier.color}`} />
				<span className="font-medium">{tier.name} Member</span>
			</div>
			<Badge variant="outline" className="gap-1">{tier.multiplier}</Badge>
		</div>
		<div className="flex items-end gap-4">
			<div>
				<span className="text-3xl font-bold">{balance.toLocaleString()}</span>
				<p className="text-sm text-muted-foreground">Available points</p>
			</div>
			<div className="text-right">
				<span className="text-lg font-medium">${(balance / 100).toFixed(2)}</span>
				<p className="text-xs text-muted-foreground">Value</p>
			</div>
		</div>
	</div>
);

const PointsRedemptionContent = ({ options, maxPoints }: { options: RewardOption[]; maxPoints: number }) => (
	<div className="space-y-4">
		<div className="space-y-3">
			<div className="flex items-center justify-between text-sm">
				<span>Apply points</span>
				<span className="font-medium">0 / {maxPoints.toLocaleString()}</span>
			</div>
			<Slider defaultValue={[0]} max={maxPoints} step={100} className="w-full" />
		</div>
		<Separator />
		<RadioGroup defaultValue="none" className="space-y-2">
			{options.map((option) => (
				<Label
					key={option.id}
					htmlFor={option.id}
					className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={option.id} id={option.id} />
					<div className="flex-1">
						<span className="text-sm font-medium">{option.points.toLocaleString()} points</span>
						<p className="text-xs text-muted-foreground">{option.description}</p>
					</div>
					<span className="font-medium text-emerald-600">-{option.value}</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const GiftCardContent = () => (
	<div className="space-y-4">
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Enter gift card code" className="pl-10" />
			</div>
			<Button variant="outline">Apply</Button>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Gift className="size-4 text-emerald-500" />
				<div>
					<span className="text-sm font-medium">•••• 7890</span>
					<p className="text-xs text-muted-foreground">Balance: $50.00</p>
				</div>
			</div>
			<Badge variant="secondary">Applied</Badge>
		</div>
	</div>
);

const PaymentMethodContent = () => (
	<div className="space-y-4">
		<div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-3">
			<Star className="size-4 text-primary" />
			<span className="text-sm">Use your <strong>Gold Rewards Card</strong> for 2x points!</span>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Card Number</Label>
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="1234 5678 9012 3456" className="pl-10" />
			</div>
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
);

const EarnSummary = ({ earnablePoints }: { earnablePoints: number }) => (
	<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
		<div className="flex items-center gap-2">
			<Star className="size-4 text-emerald-500" />
			<span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
				Earn {earnablePoints.toLocaleString()} points with this order!
			</span>
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

const NavigationButtons = ({ step, totalSteps, onPrev, onNext }: { step: number; totalSteps: number; onPrev: () => void; onNext: () => void }) => (
	<div className="flex gap-3">
		{step > 0 && (
			<Button variant="outline" onClick={onPrev} className="gap-2">
				<ArrowLeft className="size-4" />
			</Button>
		)}
		<Button onClick={onNext} className="flex-1 gap-2">
			{step < totalSteps - 1 ? (
				<>
					Continue
					<ArrowRight className="size-4" />
				</>
			) : (
				<>
					<Lock className="size-4" />
					Complete Order
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const currentStep = 2;
	const steps = ['Rewards', 'Gift Cards', 'Payment', 'Review'];

	const tier = { name: 'Gold', color: 'text-amber-500', multiplier: '2x Points' };
	const pointsBalance = 15000;

	const rewardOptions: RewardOption[] = [
		{ id: 'none', points: 0, value: '$0.00', description: 'Don\'t use points' },
		{ id: 'partial', points: 5000, value: '$50.00', description: 'Use 5,000 points' },
		{ id: 'max', points: 15000, value: '$150.00', description: 'Use all points' },
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Points Redeemed', value: '-$50.00', isDiscount: true },
		{ label: 'Gift Card', value: '-$50.00', isDiscount: true },
		{ label: 'Tax', value: '$15.92' },
		{ label: 'Total', value: '$214.92', isTotal: true },
		{ label: 'Points Earned', value: '+430 pts', isPoints: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<HorizontalStepIndicator steps={steps} currentStep={currentStep} />
						<div className="text-center">
							<h2 className="text-xl font-semibold">Payment Method</h2>
							<p className="text-sm text-muted-foreground">Add your card details</p>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<PaymentMethodContent />
						<EarnSummary earnablePoints={430} />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<NavigationButtons step={currentStep} totalSteps={steps.length} onPrev={() => {}} onNext={() => {}} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
