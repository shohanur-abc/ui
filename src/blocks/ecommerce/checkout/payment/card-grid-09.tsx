'use client';

import { Building2, Check, CreditCard, Gift, Globe, Lock, Percent, Shield, Smartphone, Star, Wallet, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface RewardTier {
	id: string;
	name: string;
	points: string;
	cashback: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	current?: boolean;
}

interface PaymentMethod {
	id: string;
	name: string;
	bonus: string;
	icon: React.ComponentType<{ className?: string }>;
}

const MembershipBanner = ({ tier, points, nextTier }: { tier: string; points: string; nextTier: string }) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
					<Star className="size-5 text-primary" />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<span className="font-semibold">{tier} Member</span>
						<Badge variant="secondary" className="text-xs">{points} pts</Badge>
					</div>
					<p className="text-xs text-muted-foreground">{nextTier}</p>
				</div>
			</div>
			<Zap className="size-5 text-primary" />
		</div>
	</div>
);

const PaymentMethodCard = ({ 
	id, 
	name, 
	bonus, 
	icon: Icon, 
	selected, 
	onSelect 
}: PaymentMethod & { selected: boolean; onSelect: (id: string) => void }) => (
	<button
		type="button"
		onClick={() => onSelect(id)}
		className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
			selected 
				? 'border-primary bg-primary/5' 
				: 'border-border/50 hover:border-primary/30'
		}`}
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-5" />
		</div>
		<div className="flex-1 text-left">
			<span className="text-sm font-medium">{name}</span>
			<p className="text-xs text-primary">{bonus}</p>
		</div>
		{selected && (
			<div className="size-5 rounded-full bg-primary flex items-center justify-center">
				<Check className="size-3 text-primary-foreground" />
			</div>
		)}
	</button>
);

const PaymentMethodsGrid = ({ 
	methods, 
	selected, 
	onSelect 
}: { 
	methods: PaymentMethod[]; 
	selected: string; 
	onSelect: (id: string) => void 
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium">Select Payment Method</h3>
		<div className="grid grid-cols-2 gap-2">
			{methods.map((method) => (
				<PaymentMethodCard 
					key={method.id} 
					{...method} 
					selected={selected === method.id}
					onSelect={onSelect}
				/>
			))}
		</div>
	</div>
);

const CardForm = () => (
	<div className="space-y-3 p-4 rounded-xl bg-muted/30">
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

const RewardsInput = () => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">Use Rewards</h3>
			<Badge variant="outline" className="text-xs">2,500 pts available</Badge>
		</div>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Points to redeem" className="pl-10" />
			</div>
			<Button variant="outline" size="sm">Apply</Button>
		</div>
	</div>
);

const OrderSummary = ({ lines }: { lines: { label: string; value: string; isTotal?: boolean; isBonus?: boolean }[] }) => (
	<div className="p-4 rounded-xl bg-muted/30 space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-2" />}
				<div className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}>
					<span className={line.isBonus ? 'text-primary' : line.isTotal ? '' : 'text-muted-foreground'}>
						{line.label}
					</span>
					<span className={line.isBonus ? 'text-primary' : ''}>{line.value}</span>
				</div>
			</div>
		))}
	</div>
);

const EarnedBadge = ({ points }: { points: string }) => (
	<div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary/10 text-sm">
		<Star className="size-4 text-primary" />
		<span>You'll earn <strong className="text-primary">{points}</strong> on this purchase!</span>
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const paymentMethods: PaymentMethod[] = [
		{ id: 'card', name: 'Credit Card', bonus: '+3% points', icon: CreditCard },
		{ id: 'wallet', name: 'Apple Pay', bonus: '+2% points', icon: Smartphone },
		{ id: 'paypal', name: 'PayPal', bonus: '+1% points', icon: Wallet },
		{ id: 'bank', name: 'Bank', bonus: 'No bonus', icon: Building2 },
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Points Discount', value: '-$25.00', isBonus: true },
		{ label: 'Tax', value: '$17.92' },
		{ label: 'Total', value: '$241.92', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<MembershipBanner 
							tier="Gold"
							points="2,500"
							nextTier="500 pts to Platinum"
						/>
					</CardHeader>
					<CardContent className="space-y-6">
						<PaymentMethodsGrid 
							methods={paymentMethods} 
							selected="card" 
							onSelect={() => {}} 
						/>
						<CardForm />
						<Separator />
						<RewardsInput />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary lines={orderLines} />
						<EarnedBadge points="747 points" />
						<PayButton label="Pay $241.92" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
