import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type RewardInfoProps = {
	icon: LucideIcon;
	points: number;
	label: string;
};

const RewardInfo = ({ icon: Icon, points, label }: RewardInfoProps) => (
	<Badge variant="secondary" className="gap-1 py-1">
		<Icon className="size-3 text-amber-500" />
		<span>
			Earn {points} {label}
		</span>
	</Badge>
);

const PriceTotal = ({ value }: { value: string }) => (
	<span className="text-xl font-bold">{value}</span>
);

const MemberBadge = ({
	icon: Icon,
	tier,
}: {
	icon: LucideIcon;
	tier: string;
}) => (
	<Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500">
		<Icon className="size-3" />
		{tier}
	</Badge>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
					<div className="flex flex-wrap items-center gap-3">
						<PriceTotal value="$399.00" />
						<MemberBadge icon={Sparkles} tier="Gold" />
						<RewardInfo icon={Star} points={399} label="points" />
					</div>
					<Button asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
