import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Crown, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type MemberBadgeProps = {
	icon: LucideIcon;
	tier: string;
	discount: string;
};

const MemberBadge = ({ icon: Icon, tier, discount }: MemberBadgeProps) => (
	<Badge className="gap-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 hover:from-amber-500/30 hover:to-orange-500/30 dark:text-amber-400">
		<Icon className="size-3" />
		{tier} • {discount} off
	</Badge>
);

type PointsEarnedProps = {
	icon: LucideIcon;
	points: number;
};

const PointsEarned = ({ icon: Icon, points }: PointsEarnedProps) => (
	<span className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
		<Icon className="size-4" />
		+{points} pts
	</span>
);

const TotalPrice = ({ value }: { value: string }) => (
	<span className="text-lg font-bold">{value}</span>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-4 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
					<MemberBadge icon={Crown} tier="Gold" discount="15%" />
					<Separator orientation="vertical" className="h-5" />
					<TotalPrice value="$424.15" />
					<PointsEarned icon={Star} points={424} />
					<div className="ml-auto">
						<Button asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
