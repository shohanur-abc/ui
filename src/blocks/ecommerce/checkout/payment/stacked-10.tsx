import { AlertTriangle, CheckCircle2, CreditCard, Gift, Lock, RotateCcw, Shield, Tag } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface GiftCardProps {
	code: string;
	balance: string;
	applied: string;
}

interface RewardProps {
	points: number;
	value: string;
	applied: boolean;
}

interface OrderLineProps {
	label: string;
	value: string;
	type?: 'discount' | 'total';
}

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
	<div>
		<h2 className="text-lg font-semibold">{title}</h2>
		{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
	</div>
);

const GiftCardInput = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
		<Button variant="outline">{buttonText}</Button>
	</div>
);

const AppliedGiftCard = ({ code, balance, applied }: GiftCardProps) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
		<div className="flex items-center gap-3">
			<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
				<Gift className="size-4 text-primary" />
			</div>
			<div>
				<p className="text-sm font-medium">{code}</p>
				<p className="text-xs text-muted-foreground">Balance: {balance}</p>
			</div>
		</div>
		<div className="text-right">
			<Badge variant="secondary">-{applied}</Badge>
		</div>
	</div>
);

const RewardsSection = ({ points, value, applied }: RewardProps) => (
	<div className="p-4 rounded-xl border border-border/50 bg-muted/30">
		<div className="flex items-center justify-between mb-3">
			<div className="flex items-center gap-2">
				<Tag className="size-4 text-primary" />
				<span className="font-medium">Reward Points</span>
			</div>
			<Badge variant="outline">{points.toLocaleString()} pts</Badge>
		</div>
		<p className="text-sm text-muted-foreground mb-3">
			Use your points for a {value} discount
		</p>
		<Button variant={applied ? 'secondary' : 'outline'} size="sm" className="w-full gap-2">
			{applied ? (
				<>
					<CheckCircle2 className="size-4" />
					Applied
				</>
			) : (
				'Apply Points'
			)}
		</Button>
	</div>
);

const BalanceWarning = ({ message }: { message: string }) => (
	<Alert variant="default" className="border-amber-500/30 bg-amber-500/5">
		<AlertTriangle className="size-4 text-amber-500" />
		<AlertDescription className="text-sm">{message}</AlertDescription>
	</Alert>
);

const RemainingPayment = ({ label, amount }: { label: string; amount: string }) => (
	<div className="p-4 rounded-xl bg-muted/50">
		<div className="flex justify-between items-center mb-2">
			<span className="text-sm text-muted-foreground">{label}</span>
			<span className="text-xl font-bold">{amount}</span>
		</div>
	</div>
);

const CardInput = ({
	id,
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ComponentType<{ className?: string }>;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<div className="relative">
			{Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />}
			<Input id={id} type={type} placeholder={placeholder} className={Icon ? 'pl-10' : ''} />
		</div>
	</div>
);

const OrderSummaryLine = ({ label, value, type }: OrderLineProps) => (
	<div className={`flex justify-between ${type === 'total' ? 'font-semibold text-lg pt-2' : 'text-sm'}`}>
		<span className={type === 'discount' ? 'text-primary' : type === 'total' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={type === 'discount' ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({ lines }: { lines: OrderLineProps[] }) => (
	<div className="space-y-2 p-4 rounded-xl bg-muted/30">
		{lines.map((line, index) => (
			<div key={index}>
				{line.type === 'total' && <Separator className="mb-2" />}
				<OrderSummaryLine {...line} />
			</div>
		))}
	</div>
);

const PayButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		{label}
	</Button>
);

const TrustFooter = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1.5">
			<Shield className="size-3.5" />
			<span>Secure</span>
		</div>
		<div className="flex items-center gap-1.5">
			<RotateCcw className="size-3.5" />
			<span>30-day Returns</span>
		</div>
	</div>
);

export default function Main() {
	const giftCard: GiftCardProps = {
		code: 'GIFT-XXXX-1234',
		balance: '$50.00',
		applied: '$50.00',
	};

	const rewards: RewardProps = {
		points: 2500,
		value: '$25.00',
		applied: true,
	};

	const orderLines: OrderLineProps[] = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Gift Card', value: '-$50.00', type: 'discount' },
		{ label: 'Rewards', value: '-$25.00', type: 'discount' },
		{ label: 'Tax', value: '$17.92' },
		{ label: 'Total Due', value: '$241.92', type: 'total' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<SectionHeader title="Apply Discounts" subtitle="Use gift cards and rewards for savings" />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-3">
							<Label className="text-sm font-medium">Gift Card</Label>
							<GiftCardInput placeholder="Enter gift card code" buttonText="Apply" />
							<AppliedGiftCard {...giftCard} />
						</div>
						<RewardsSection {...rewards} />
						<Separator />
						<OrderSummary lines={orderLines} />
						<RemainingPayment label="Pay with card" amount="$241.92" />
						<div className="space-y-4">
							<CardInput id="card" label="Card Number" placeholder="4242 4242 4242 4242" icon={CreditCard} />
							<div className="grid grid-cols-2 gap-4">
								<CardInput id="exp" label="Expiry" placeholder="MM/YY" />
								<CardInput id="cvc" label="CVC" placeholder="123" type="password" />
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PayButton label="Pay $241.92" />
						<TrustFooter />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
