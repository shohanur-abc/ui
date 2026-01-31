import {
	Calendar,
	ChevronRight,
	Clock,
	Gift,
	Link,
	Mail,
	MoreHorizontal,
	Phone,
	Share2,
	Star,
	Trophy,
	Users,
	Wallet,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ReferralProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	referralCode: string;
	referralLink: string;
	tier: 'starter' | 'advocate' | 'champion' | 'ambassador';
	stats: {
		totalReferrals: number;
		successfulReferrals: number;
		pendingReferrals: number;
		conversionRate: number;
	};
	earnings: {
		total: string;
		pending: string;
		paid: string;
		nextPayout: string;
	};
	referredBy?: {
		name: string;
		initials: string;
	};
	topReferrals: Array<{
		id: string;
		name: string;
		initials: string;
		avatar?: string;
		status: 'active' | 'pending' | 'churned';
		totalSpent: string;
		joinedDate: string;
	}>;
	achievements: Array<{
		id: string;
		name: string;
		icon: string;
		earned: boolean;
	}>;
	tierProgress: {
		current: number;
		required: number;
		nextTier: string;
	};
}

const TierConfig = {
	starter: { label: 'Starter', color: 'text-slate-400', bg: 'bg-slate-400/10' },
	advocate: { label: 'Advocate', color: 'text-blue-500', bg: 'bg-blue-500/10' },
	champion: { label: 'Champion', color: 'text-amber-500', bg: 'bg-amber-500/10' },
	ambassador: { label: 'Ambassador', color: 'text-violet-500', bg: 'bg-violet-500/10' },
};

const TierBadge = ({ tier }: { tier: ReferralProfile['tier'] }) => {
	const config = TierConfig[tier];
	return (
		<Badge variant="outline" className={`${config.color} border-current/30 gap-1`}>
			<Trophy className="size-3" />
			{config.label}
		</Badge>
	);
};

const ReferralStatusBadge = ({ status }: { status: 'active' | 'pending' | 'churned' }) => {
	const config = {
		active: { label: 'Active', className: 'bg-emerald-500/10 text-emerald-500' },
		pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-500' },
		churned: { label: 'Churned', className: 'bg-red-500/10 text-red-500' },
	};
	return <Badge variant="outline" className={config[status].className}>{config[status].label}</Badge>;
};

const StatCard = ({
	label,
	value,
	subtext,
	className,
}: {
	label: string;
	value: string | number;
	subtext?: string;
	className?: string;
}) => (
	<div className={`rounded-lg border bg-muted/30 p-4 ${className || ''}`}>
		<p className="text-muted-foreground text-sm mb-1">{label}</p>
		<p className="text-2xl font-bold">{value}</p>
		{subtext && <p className="text-muted-foreground text-xs mt-1">{subtext}</p>}
	</div>
);

const ReferralCard = ({ referral }: { referral: ReferralProfile['topReferrals'][0] }) => (
	<div className="flex items-center gap-3 rounded-lg border p-3">
		<Avatar className="size-10">
			<AvatarImage src={referral.avatar} alt={referral.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-sm">
				{referral.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-medium text-sm truncate">{referral.name}</p>
				<ReferralStatusBadge status={referral.status} />
			</div>
			<p className="text-xs text-muted-foreground">Joined {referral.joinedDate}</p>
		</div>
		<div className="text-right">
			<p className="font-semibold text-sm">{referral.totalSpent}</p>
			<p className="text-xs text-muted-foreground">Total spent</p>
		</div>
	</div>
);

const ProfileHeader = ({ profile }: { profile: ReferralProfile }) => (
	<div className="flex flex-col @md:flex-row gap-6">
		<Avatar className="size-20">
			<AvatarImage src={profile.avatar} alt={profile.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-2xl">
				{profile.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-3 mb-2">
				<h1 className="text-2xl font-bold">{profile.name}</h1>
				<TierBadge tier={profile.tier} />
			</div>
			<p className="text-muted-foreground text-sm mb-3">{profile.email}</p>
			
			<div className="flex flex-col @sm:flex-row gap-3">
				<div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
					<code className="font-mono font-bold">{profile.referralCode}</code>
					<Button variant="ghost" size="icon-sm" className="size-6">
						<Link className="size-3.5" />
					</Button>
				</div>
				<Button variant="outline" size="sm" className="gap-1.5">
					<Share2 className="size-3.5" />
					Share Link
				</Button>
			</div>
		</div>
	</div>
);

const TierProgress = ({ progress }: { progress: ReferralProfile['tierProgress'] }) => (
	<Card>
		<CardHeader className="pb-2">
			<CardTitle className="text-base flex items-center gap-2">
				<Trophy className="size-4" />
				Tier Progress
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="flex items-center justify-between mb-2 text-sm">
				<span>Progress to {progress.nextTier}</span>
				<span className="font-medium">{progress.current} / {progress.required}</span>
			</div>
			<Progress value={(progress.current / progress.required) * 100} className="h-2" />
			<p className="text-xs text-muted-foreground mt-2">
				{progress.required - progress.current} more successful referrals needed
			</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const profile: ReferralProfile = {
		id: '1',
		name: 'Olivia Martinez',
		email: 'olivia.m@email.com',
		initials: 'OM',
		referralCode: 'OLIVIA25',
		referralLink: 'shop.com/ref/olivia25',
		tier: 'champion',
		stats: {
			totalReferrals: 28,
			successfulReferrals: 22,
			pendingReferrals: 6,
			conversionRate: 78,
		},
		earnings: {
			total: '$1,100',
			pending: '$300',
			paid: '$800',
			nextPayout: 'Feb 1, 2024',
		},
		topReferrals: [
			{ id: '1', name: 'Sarah Johnson', initials: 'SJ', status: 'active', totalSpent: '$2,450', joinedDate: 'Dec 2023' },
			{ id: '2', name: 'Mike Wilson', initials: 'MW', status: 'active', totalSpent: '$1,890', joinedDate: 'Nov 2023' },
			{ id: '3', name: 'Emma Davis', initials: 'ED', status: 'pending', totalSpent: '$0', joinedDate: 'Jan 2024' },
			{ id: '4', name: 'Chris Lee', initials: 'CL', status: 'active', totalSpent: '$956', joinedDate: 'Oct 2023' },
		],
		achievements: [
			{ id: '1', name: 'First Referral', icon: '🎉', earned: true },
			{ id: '2', name: '10 Referrals', icon: '🌟', earned: true },
			{ id: '3', name: '25 Referrals', icon: '🏆', earned: false },
			{ id: '4', name: 'Top Earner', icon: '💰', earned: true },
		],
		tierProgress: {
			current: 22,
			required: 30,
			nextTier: 'Ambassador',
		},
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<StatCard label="Total Referrals" value={profile.stats.totalReferrals} />
					<StatCard label="Successful" value={profile.stats.successfulReferrals} className="text-emerald-500" />
					<StatCard label="Pending" value={profile.stats.pendingReferrals} className="text-amber-500" />
					<StatCard label="Conversion Rate" value={`${profile.stats.conversionRate}%`} />
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Wallet className="size-4" />
								Earnings
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-4 mb-6">
								<div className="text-center p-4 rounded-lg bg-emerald-500/10">
									<p className="text-2xl font-bold text-emerald-500">{profile.earnings.total}</p>
									<p className="text-sm text-muted-foreground">Total Earned</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-amber-500/10">
									<p className="text-2xl font-bold text-amber-500">{profile.earnings.pending}</p>
									<p className="text-sm text-muted-foreground">Pending</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-blue-500/10">
									<p className="text-2xl font-bold text-blue-500">{profile.earnings.paid}</p>
									<p className="text-sm text-muted-foreground">Paid Out</p>
								</div>
							</div>
							<div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
								<span className="text-sm">Next payout</span>
								<span className="font-medium">{profile.earnings.nextPayout}</span>
							</div>
						</CardContent>
					</Card>

					<TierProgress progress={profile.tierProgress} />
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Users className="size-4" />
								Top Referrals
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{profile.topReferrals.map((referral) => (
								<ReferralCard key={referral.id} referral={referral} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Star className="size-4" />
								Achievements
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-3">
								{profile.achievements.map((achievement) => (
									<div
										key={achievement.id}
										className={`flex items-center gap-3 rounded-lg border p-3 ${achievement.earned ? '' : 'opacity-50'}`}
									>
										<span className="text-2xl">{achievement.icon}</span>
										<div>
											<p className="font-medium text-sm">{achievement.name}</p>
											<p className="text-xs text-muted-foreground">
												{achievement.earned ? 'Earned' : 'Locked'}
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
