import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Crown, Star, Gift, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

type RewardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
};

const MemberBanner = ({
	tier,
	badge,
}: { tier: string; badge: string }) => (
	<div className="mb-4 rounded-lg bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 p-4">
		<div className="flex items-center gap-2">
			<Crown className="size-5 text-amber-500" />
			<span className="font-semibold">{tier}</span>
			<Badge className="ml-auto bg-amber-500/30 text-amber-600 dark:text-amber-400">
				{badge}
			</Badge>
		</div>
	</div>
);

const RewardRow = ({ icon: Icon, label, value }: RewardProps) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-amber-500" />
		<span className="flex-1 text-muted-foreground">{label}</span>
		<span className="font-medium text-amber-600 dark:text-amber-400">{value}</span>
	</div>
);

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className={highlight ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={`font-medium ${highlight ? 'text-amber-600 dark:text-amber-400' : ''}`}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const rewards: RewardProps[] = [
		{ icon: Star, label: 'Points Earned', value: '+458 pts' },
		{ icon: Gift, label: 'Free Gift', value: 'Unlocked' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$458.00' },
		{ label: 'Member Discount (10%)', value: '-$45.80', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$32.98' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[560px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Rewards Summary</h3>
				<MemberBanner tier="Gold Member" badge="-10% on all" />
				<div className="mb-4 space-y-2 rounded-lg bg-muted/50 p-3">
					{rewards.map((reward, i) => (
						<RewardRow key={i} {...reward} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					<div className="flex items-center justify-between">
						<span className="text-lg font-semibold">Total</span>
						<span className="text-2xl font-bold">$445.18</span>
					</div>
					<p className="text-right text-xs text-green-600 dark:text-green-400">
						You save $45.80!
					</p>
				</div>
				<Button
					className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
					size="lg"
					asChild
				>
					<Link href="/checkout">
						Checkout
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</aside>
		</section>
	);
}
