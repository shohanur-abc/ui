'use client';

import {
	ArrowLeft,
	Check,
	CreditCard,
	Heart,
	Lock,
	Minus,
	Plus,
	RefreshCcw,
	Shield,
	Sparkles,
	Star,
	Trash2,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface DonationTier {
	id: string;
	amount: string;
	title: string;
	impact: string;
}

const DrawerHeader = ({
	title,
	subtitle,
	onClose,
}: {
	title: string;
	subtitle: string;
	onClose: () => void;
}) => (
	<div className="flex items-start justify-between">
		<div>
			<div className="flex items-center gap-2 mb-1">
				<Heart className="size-5 text-rose-500" />
				<h2 className="text-lg font-semibold">{title}</h2>
			</div>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const DonationTiers = ({
	tiers,
	selected,
	onSelect,
}: {
	tiers: DonationTier[];
	selected: string;
	onSelect: (id: string) => void;
}) => (
	<div className="space-y-3">
		{tiers.map((tier) => (
			<div
				key={tier.id}
				onClick={() => onSelect(tier.id)}
				className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
					selected === tier.id
						? 'border-primary bg-primary/5'
						: 'border-border hover:border-primary/30'
				}`}
			>
				<div
					className={`size-10 rounded-full flex items-center justify-center font-bold ${
						selected === tier.id
							? 'bg-primary text-primary-foreground'
							: 'bg-muted'
					}`}
				>
					{tier.amount}
				</div>
				<div className="flex-1">
					<span className="font-medium">{tier.title}</span>
					<p className="text-xs text-muted-foreground">{tier.impact}</p>
				</div>
				{selected === tier.id && <Check className="size-5 text-primary" />}
			</div>
		))}
	</div>
);

const CustomAmount = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => (
	<div className="space-y-2">
		<Label className="text-sm">Or enter custom amount</Label>
		<div className="relative">
			<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
				$
			</span>
			<Input
				type="number"
				placeholder="0.00"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-8"
			/>
		</div>
	</div>
);

const RecurringOption = () => (
	<div className="flex items-center gap-3 p-3 rounded-lg border border-dashed">
		<RefreshCcw className="size-5 text-muted-foreground" />
		<div className="flex-1">
			<span className="text-sm font-medium">Make this a monthly donation</span>
			<p className="text-xs text-muted-foreground">Cancel anytime</p>
		</div>
		<Checkbox id="recurring" />
	</div>
);

const CardForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4 text-primary" />
			<span className="font-medium">Payment Details</span>
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

const DonorInfo = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Your Name (Optional)</Label>
			<Input placeholder="Anonymous" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Email (for receipt)</Label>
			<Input type="email" placeholder="you@example.com" />
		</div>
		<div className="flex items-center gap-3">
			<Checkbox id="newsletter" defaultChecked />
			<Label htmlFor="newsletter" className="text-sm cursor-pointer">
				Send me updates about impact
			</Label>
		</div>
	</div>
);

const ImpactMessage = ({ amount }: { amount: string }) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20">
		<div className="flex items-center gap-2 mb-2">
			<Sparkles className="size-4 text-rose-500" />
			<span className="font-medium">Your Impact</span>
		</div>
		<p className="text-sm text-muted-foreground">
			Your {amount} donation will provide meals for 10 families for a week
		</p>
	</div>
);

const DonationTotal = ({
	amount,
	isRecurring,
}: {
	amount: string;
	isRecurring?: boolean;
}) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
		<div>
			<span className="text-sm text-muted-foreground">
				{isRecurring ? 'Monthly donation' : 'One-time donation'}
			</span>
			<p className="text-2xl font-bold">{amount}</p>
		</div>
		<Heart className="size-8 text-rose-500" />
	</div>
);

export default function Main() {
	const tiers: DonationTier[] = [
		{
			id: '25',
			amount: '$25',
			title: 'Supporter',
			impact: 'Feed 2 families for a week',
		},
		{
			id: '50',
			amount: '$50',
			title: 'Champion',
			impact: 'Feed 5 families for a week',
		},
		{
			id: '100',
			amount: '$100',
			title: 'Hero',
			impact: 'Feed 10 families for a week',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader
							title="Make a Donation"
							subtitle="Support our mission to end hunger"
							onClose={() => {}}
						/>
					</CardHeader>
					<CardContent className="space-y-6">
						<DonationTiers tiers={tiers} selected="50" onSelect={() => {}} />
						<CustomAmount value="" onChange={() => {}} />
						<RecurringOption />
						<ImpactMessage amount="$50" />
						<Separator />
						<DonorInfo />
						<CardForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<DonationTotal amount="$50" />
						<Button className="w-full gap-2 bg-rose-500 hover:bg-rose-600">
							<Heart className="size-4" />
							Donate $50
						</Button>
						<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>100% secure • Tax-deductible</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
