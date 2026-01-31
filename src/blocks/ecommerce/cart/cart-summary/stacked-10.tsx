import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	Star,
	Award,
	Crown,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type RewardsTierProps = {
	icon: LucideIcon;
	name: string;
	current: number;
	target: number;
	reward: string;
};

type PointsEarnedProps = {
	points: number;
	multiplier: number;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	pointsLabel,
}: { label: string; value: string; pointsLabel: string }) => (
	<div className="rounded-lg bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 p-4">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
			{pointsLabel}
		</p>
	</div>
);

const Header = ({
	title,
	tierBadge,
}: { title: string; tierBadge: { label: string; icon: LucideIcon } }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center justify-between">
			{title}
			<Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500">
				<tierBadge.icon className="size-3" />
				{tierBadge.label}
			</Badge>
		</CardTitle>
	</CardHeader>
);

const RewardsTier = ({
	icon: Icon,
	name,
	current,
	target,
	reward,
}: RewardsTierProps) => {
	const progress = Math.min((current / target) * 100, 100);
	return (
		<div className="space-y-2 rounded-lg border p-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
						<Icon className="size-4 text-white" />
					</div>
					<div>
						<p className="text-sm font-medium">{name}</p>
						<p className="text-xs text-muted-foreground">{reward}</p>
					</div>
				</div>
				<span className="text-xs text-muted-foreground">
					${current} / ${target}
				</span>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	);
};

const PointsEarned = ({ points, multiplier }: PointsEarnedProps) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
		<div className="flex items-center gap-2">
			<Star className="size-5 text-amber-500" />
			<div>
				<p className="text-sm font-medium">Points You&apos;ll Earn</p>
				<p className="text-xs text-muted-foreground">{multiplier}x multiplier active</p>
			</div>
		</div>
		<span className="text-lg font-bold text-amber-500">+{points}</span>
	</div>
);

const RewardsLink = ({ label, href }: { label: string; href: string }) => (
	<Link
		href={href}
		className="flex items-center justify-between rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
	>
		<span>{label}</span>
		<ChevronRight className="size-4" />
	</Link>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$1,249.00' },
		{ label: 'Member Discount (15%)', value: '-$187.35' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$84.93' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Order Summary"
						tierBadge={{ label: 'Gold Member', icon: Crown }}
					/>
					<CardContent className="space-y-4">
						<RewardsTier
							icon={Award}
							name="Platinum Status"
							current={1249}
							target={2000}
							reward="Unlock 20% off + free express shipping"
						/>
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow
							label="Total"
							value="$1,146.58"
							pointsLabel="Earn 1,147 reward points with this order!"
						/>
						<PointsEarned points={1147} multiplier={2} />
						<RewardsLink label="View Rewards & Benefits" href="/rewards" />
					</CardContent>
					<CardFooter className="border-t">
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Checkout as Gold Member</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
