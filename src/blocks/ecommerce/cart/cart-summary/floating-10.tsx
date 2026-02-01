import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	Award,
	Crown,
	Gem,
	ArrowUpRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

type MembershipTierProps = {
	icon: LucideIcon;
	name: string;
	perks: string[];
	active?: boolean;
};

const GradientBackground = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span
			className={
				discount
					? 'text-amber-600 dark:text-amber-400'
					: 'text-muted-foreground'
			}
		>
			{label}
		</span>
		<span
			className={
				discount
					? 'font-medium text-amber-600 dark:text-amber-400'
					: 'font-medium'
			}
		>
			{value}
		</span>
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
		<div className="flex items-center justify-end gap-1 text-sm text-amber-600 dark:text-amber-400">
			<Star className="size-4" />
			<span>+{points} points earned</span>
		</div>
	</div>
);

const MembershipBanner = ({
	tier,
	nextTier,
	pointsToNext,
}: {
	tier: MembershipTierProps;
	nextTier: string;
	pointsToNext: number;
}) => (
	<div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 p-4">
		<div className="flex items-center gap-3">
			<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
				<tier.icon className="size-6 text-white" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-semibold">{tier.name}</span>
					<Badge className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:text-amber-400">
						Active
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">
					{pointsToNext} points to {nextTier}
				</p>
			</div>
			<Link
				href="/rewards"
				className="flex items-center gap-1 text-xs text-primary hover:underline"
			>
				View
				<ArrowUpRight className="size-3" />
			</Link>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$749.00' },
		{ label: 'Gold Member Discount (15%)', value: '-$112.35', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$50.93' },
	];

	const memberTier: MembershipTierProps = {
		icon: Crown,
		name: 'Gold Member',
		perks: ['15% off all orders', 'Free shipping', 'Early access'],
		active: true,
	};

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="relative overflow-hidden shadow-xl">
					<GradientBackground />
					<CardHeader className="relative pb-3">
						<MembershipBanner
							tier={memberTier}
							nextTier="Platinum"
							pointsToNext={1250}
						/>
					</CardHeader>
					<CardContent className="relative space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$687.58" points={688} />
					</CardContent>
					<CardFooter className="relative">
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
