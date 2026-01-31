import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Crown, Star, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

const GoldBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="relative overflow-hidden rounded-xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/5 to-transparent p-6">
		<div className="absolute -right-8 -top-8 size-24 rounded-full bg-amber-500/10 blur-2xl" />
		<div className="relative">{children}</div>
	</div>
);

const MemberHeader = ({
	icon: Icon,
	tier,
	discount,
}: { icon: LucideIcon; tier: string; discount: string }) => (
	<div className="mb-4 flex items-center gap-3">
		<div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
			<Icon className="size-5 text-white" />
		</div>
		<div>
			<span className="font-semibold">{tier}</span>
			<p className="text-xs text-muted-foreground">{discount} on all orders</p>
		</div>
	</div>
);

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			highlight ? 'text-amber-600 dark:text-amber-400' : ''
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
}: { label: string; value: string; points: number }) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="font-semibold">{label}</span>
			<span className="text-xl font-bold">{value}</span>
		</div>
		<div className="flex items-center justify-end gap-1 text-xs text-amber-600 dark:text-amber-400">
			<Star className="size-3" />
			<span>Earn {points} points</span>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$449.00' },
		{ label: 'Gold Discount (15%)', value: '-$67.35', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$30.53' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GoldBorderBox>
					<MemberHeader icon={Crown} tier="Gold Member" discount="15% off" />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$412.18" points={412} />
					<Button
						className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
						size="lg"
						asChild
					>
						<Link href="/checkout">Checkout as Gold Member</Link>
					</Button>
				</GoldBorderBox>
			</div>
		</section>
	);
}
