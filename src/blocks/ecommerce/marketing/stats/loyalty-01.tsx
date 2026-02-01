import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Star, Gift, TrendingUp, Users } from 'lucide-react';

interface LoyaltyTierProps {
	tier: string;
	members: string;
	percentage: number;
	avgSpend: string;
	color: string;
}

const LoyaltyTierCard = ({
	tier,
	members,
	percentage,
	avgSpend,
	color,
}: LoyaltyTierProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div
				className="rounded-full p-2"
				style={{ backgroundColor: `${color}20` }}
			>
				<Crown className="size-5" style={{ color }} />
			</div>
			<div className="flex-1">
				<p className="font-semibold">{tier}</p>
				<p className="text-xs text-muted-foreground">
					{percentage}% of customers
				</p>
			</div>
		</div>
		<div className="mt-4 space-y-3">
			<div className="flex justify-between">
				<span className="text-sm text-muted-foreground">Members</span>
				<span className="font-semibold">{members}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-sm text-muted-foreground">Avg. Spend</span>
				<span className="font-semibold">{avgSpend}</span>
			</div>
			<Progress
				value={percentage}
				className="h-1.5"
				style={{ ['--primary' as string]: color }}
			/>
		</div>
	</Card>
);

export default function Main() {
	const tiers: LoyaltyTierProps[] = [
		{
			tier: 'Platinum',
			members: '847',
			percentage: 5,
			avgSpend: '$2,847',
			color: '#9333EA',
		},
		{
			tier: 'Gold',
			members: '2,847',
			percentage: 15,
			avgSpend: '$1,284',
			color: '#EAB308',
		},
		{
			tier: 'Silver',
			members: '8,294',
			percentage: 35,
			avgSpend: '$524',
			color: '#6B7280',
		},
		{
			tier: 'Bronze',
			members: '12,847',
			percentage: 45,
			avgSpend: '$184',
			color: '#EA580C',
		},
	];

	const summaryStats = [
		{ icon: Users, label: 'Total Members', value: '24,835' },
		{ icon: Star, label: 'Points Issued', value: '2.4M' },
		{ icon: Gift, label: 'Rewards Redeemed', value: '8,294' },
		{ icon: TrendingUp, label: 'Program ROI', value: '312%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-6 grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{summaryStats.map((stat, i) => (
						<Card key={i} className="flex items-center gap-4 p-4">
							<div className="rounded-lg bg-primary/10 p-2">
								<stat.icon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xl font-bold">{stat.value}</p>
								<p className="text-xs text-muted-foreground">{stat.label}</p>
							</div>
						</Card>
					))}
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{tiers.map((tier, i) => (
						<LoyaltyTierCard key={i} {...tier} />
					))}
				</div>
			</div>
		</section>
	);
}
