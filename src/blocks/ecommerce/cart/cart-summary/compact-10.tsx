import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Check, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CouponDisplayProps = {
	icon: LucideIcon;
	code: string;
	discount: string;
	applied: boolean;
};

const AppliedCoupon = ({ icon: Icon, code, discount }: CouponDisplayProps) => (
	<div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2">
		<Check className="size-4 text-green-500" />
		<span className="font-mono text-sm">{code}</span>
		<span className="text-sm text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const PriceDisplay = ({
	original,
	final,
}: {
	original: string;
	final: string;
}) => (
	<div className="flex items-baseline gap-2">
		<span className="text-sm text-muted-foreground line-through">
			{original}
		</span>
		<span className="text-xl font-bold">{final}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
					<AppliedCoupon
						icon={Tag}
						code="WELCOME15"
						discount="-15%"
						applied={true}
					/>
					<div className="flex items-center gap-4">
						<PriceDisplay original="$299.00" final="$254.15" />
						<Button asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
