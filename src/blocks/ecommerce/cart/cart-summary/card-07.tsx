import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Crown, Star, ArrowUpRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

type MemberCardProps = {
	icon: LucideIcon;
	tier: string;
	discount: string;
	pointsToNext: number;
	nextTier: string;
};

const MemberCard = ({
	icon: Icon,
	tier,
	discount,
	pointsToNext,
	nextTier,
}: MemberCardProps) => (
	<Card className="mb-4 overflow-hidden border-amber-500/30">
		<div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
		<CardContent className="py-4">
			<div className="flex items-center gap-3">
				<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
					<Icon className="size-6 text-white" />
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-semibold">{tier}</span>
						<Badge className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:text-amber-400">
							{discount}
						</Badge>
					</div>
					<p className="text-xs text-muted-foreground">
						{pointsToNext} pts to {nextTier}
					</p>
				</div>
				<Link
					href="/rewards"
					className="flex items-center gap-1 text-xs text-amber-600 hover:underline dark:text-amber-400"
				>
					View
					<ArrowUpRight className="size-3" />
				</Link>
			</div>
		</CardContent>
	</Card>
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

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$549.00' },
		{ label: 'Gold Discount (15%)', value: '-$82.35', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$37.33' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<MemberCard
					icon={Crown}
					tier="Gold Member"
					discount="15% Off"
					pointsToNext={850}
					nextTier="Platinum"
				/>
				<Card>
					<CardContent className="space-y-3 pt-6">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold">Total</span>
								<span className="text-2xl font-bold">$503.98</span>
							</div>
							<div className="flex items-center justify-end gap-1 text-xs text-amber-600 dark:text-amber-400">
								<Star className="size-3" />
								<span>+504 points earned</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
							size="lg"
							asChild
						>
							<Link href="/checkout">Checkout as Gold Member</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
