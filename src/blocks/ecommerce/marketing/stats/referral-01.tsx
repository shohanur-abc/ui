import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Gift, TrendingUp, DollarSign, Crown } from 'lucide-react';

interface ReferralStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
}

interface TopReferrerProps {
	name: string;
	referrals: number;
	revenue: string;
	tier: 'gold' | 'silver' | 'bronze';
}

const ReferralMetric = ({
	icon: Icon,
	label,
	value,
	change,
}: ReferralStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center justify-between">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<Badge variant="outline">{change}</Badge>
		</div>
		<p className="mt-4 text-2xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
	</Card>
);

const ReferrerRow = ({ name, referrals, revenue, tier }: TopReferrerProps) => {
	const tierConfig = {
		gold: { color: 'text-yellow-500', icon: Crown },
		silver: { color: 'text-gray-400', icon: Crown },
		bronze: { color: 'text-orange-600', icon: Crown },
	};

	const TierIcon = tierConfig[tier].icon;

	return (
		<div className="flex items-center gap-4 py-3">
			<TierIcon className={`size-5 ${tierConfig[tier].color}`} />
			<div className="flex-1">
				<p className="font-medium">{name}</p>
				<p className="text-xs text-muted-foreground">{referrals} referrals</p>
			</div>
			<span className="font-semibold">{revenue}</span>
		</div>
	);
};

export default function Main() {
	const metrics: ReferralStatProps[] = [
		{ icon: Users, label: 'Total Referrers', value: '2,847', change: '+124' },
		{
			icon: Gift,
			label: 'Successful Referrals',
			value: '8,294',
			change: '+18%',
		},
		{
			icon: DollarSign,
			label: 'Revenue Generated',
			value: '$284K',
			change: '+24%',
		},
		{ icon: TrendingUp, label: 'Conversion Rate', value: '42%', change: '+5%' },
	];

	const topReferrers: TopReferrerProps[] = [
		{ name: 'Sarah Johnson', referrals: 248, revenue: '$24.8K', tier: 'gold' },
		{ name: 'Mike Chen', referrals: 184, revenue: '$18.4K', tier: 'silver' },
		{ name: 'Emily Davis', referrals: 142, revenue: '$14.2K', tier: 'bronze' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-4">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-3 @lg:grid-cols-4">
						{metrics.map((metric, i) => (
							<ReferralMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<h3 className="font-semibold">Top Referrers</h3>
						<Separator className="my-4" />
						<div className="space-y-1">
							{topReferrers.map((referrer, i) => (
								<ReferrerRow key={i} {...referrer} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
