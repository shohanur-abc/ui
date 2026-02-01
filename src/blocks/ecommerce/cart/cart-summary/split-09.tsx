import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Percent, Sparkles, Gift, Coins, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	isDiscount?: boolean;
};

type RewardProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	action?: { label: string; onClick?: () => void };
};

const SummaryRow = ({ label, value, isDiscount }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span
			className={
				isDiscount
					? 'text-green-600 dark:text-green-400'
					: 'text-muted-foreground'
			}
		>
			{label}
		</span>
		<span
			className={`font-medium ${isDiscount ? 'text-green-600 dark:text-green-400' : ''}`}
		>
			{value}
		</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	originalValue,
}: {
	label: string;
	value: string;
	originalValue?: string;
}) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<div className="text-right">
			{originalValue && (
				<span className="mr-2 text-sm text-muted-foreground line-through">
					{originalValue}
				</span>
			)}
			<span className="text-2xl font-bold">{value}</span>
		</div>
	</div>
);

const RewardCard = ({ icon: Icon, title, value, action }: RewardProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-3">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{value}</p>
		</div>
		{action && (
			<Button variant="ghost" size="sm" onClick={action.onClick}>
				{action.label}
			</Button>
		)}
	</div>
);

const PromoInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="space-y-2">
		<p className="text-sm font-medium">Promo Code</p>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Percent className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={placeholder} className="pl-9" />
			</div>
			<Button variant="secondary">{buttonLabel}</Button>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$589.00' },
		{ label: 'Member Discount (10%)', value: '-$58.90', isDiscount: true },
		{ label: 'Points Redeemed', value: '-$25.00', isDiscount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$40.41' },
	];

	const rewards: RewardProps[] = [
		{
			icon: Coins,
			title: 'Reward Points',
			value: '2,450 points available ($24.50)',
			action: { label: 'Apply' },
		},
		{
			icon: Gift,
			title: 'Gift Card',
			value: 'Add gift card balance',
			action: { label: 'Add' },
		},
		{
			icon: Sparkles,
			title: 'Member Benefits',
			value: 'Gold status: 10% off + free shipping',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Sparkles className="size-5 text-primary" />
								Rewards & Discounts
							</CardTitle>
							<CardDescription>
								Apply your rewards and promo codes
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{rewards.map((reward, i) => (
								<RewardCard key={i} {...reward} />
							))}
							<Separator />
							<PromoInput placeholder="Enter code" buttonLabel="Apply" />
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle className="flex items-center justify-between">
								Summary
								<Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
									Gold Member
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$545.51" originalValue="$629.41" />
							<div className="rounded-lg bg-green-500/10 p-3 text-center">
								<p className="text-sm font-medium text-green-600 dark:text-green-400">
									You&apos;re saving $83.90 on this order!
								</p>
							</div>
							<Button className="w-full" size="lg" asChild>
								<Link href="/checkout">Checkout</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
