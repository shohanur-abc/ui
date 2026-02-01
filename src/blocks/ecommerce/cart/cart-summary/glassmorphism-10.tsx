import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Crown, Star, ArrowUpRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

type MemberBannerProps = {
	icon: LucideIcon;
	tier: string;
	pointsToNext: number;
	nextTier: string;
};

const GoldGlassBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-orange-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-amber-500/30 bg-white/10 p-6 shadow-xl shadow-amber-500/5 backdrop-blur-xl dark:bg-black/20">
		{children}
	</div>
);

const MemberBanner = ({
	icon: Icon,
	tier,
	pointsToNext,
	nextTier,
}: MemberBannerProps) => (
	<div className="mb-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 p-4 backdrop-blur">
		<div className="flex items-center gap-3">
			<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
				<Icon className="size-6 text-white" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-semibold">{tier}</span>
					<Badge className="bg-amber-500/30 text-amber-300 backdrop-blur hover:bg-amber-500/40">
						Active
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">
					{pointsToNext} points to {nextTier}
				</p>
			</div>
			<Link
				href="/rewards"
				className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
			>
				View
				<ArrowUpRight className="size-3" />
			</Link>
		</div>
	</div>
);

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			highlight ? 'text-amber-400' : ''
		}`}
	>
		<span className={highlight ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	points,
}: {
	label: string;
	value: string;
	points: number;
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<div className="flex items-center justify-end gap-1 text-sm text-amber-400">
			<Star className="size-4" />
			<span>+{points} points</span>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$749.00' },
		{ label: 'Gold Discount (15%)', value: '-$112.35', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$50.93' },
	];

	return (
		<section className="@container relative">
			<GoldGlassBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<MemberBanner
						icon={Crown}
						tier="Gold Member"
						pointsToNext={1250}
						nextTier="Platinum"
					/>
					<div className="space-y-2">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$687.58" points={688} />
					<Button
						className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
						size="lg"
						asChild
					>
						<Link href="/checkout">Checkout as Gold Member</Link>
					</Button>
				</GlassCard>
			</div>
		</section>
	);
}
