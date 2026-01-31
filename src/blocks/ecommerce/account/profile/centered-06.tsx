import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Check,
	Copy,
	DollarSign,
	Gift,
	Mail,
	Share2,
	Trophy,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const ReferralHeader = ({
	src,
	fallback,
	name,
	referralCode,
}: {
	src: string;
	fallback: string;
	name: string;
	referralCode: string;
}) => (
	<div className="text-center space-y-4">
		<Avatar className="size-20 mx-auto ring-4 ring-border shadow-lg">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h1 className="text-xl font-bold">{name}</h1>
			<p className="text-sm text-muted-foreground">Your Referral Dashboard</p>
		</div>
		<div className="max-w-xs mx-auto">
			<p className="text-xs text-muted-foreground mb-2">Your Referral Code</p>
			<div className="flex gap-2">
				<Input value={referralCode} readOnly className="text-center font-mono font-bold" />
				<Button variant="outline" size="icon">
					<Copy className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const ReferralStats = ({
	earnings,
	referrals,
	pending,
	conversionRate,
}: {
	earnings: string;
	referrals: number;
	pending: number;
	conversionRate: string;
}) => (
	<div className="grid grid-cols-2 gap-3">
		<div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-center">
			<DollarSign className="size-6 mx-auto mb-2 text-green-500" />
			<p className="text-2xl font-bold">{earnings}</p>
			<p className="text-xs text-muted-foreground">Total Earned</p>
		</div>
		<div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-center">
			<Users className="size-6 mx-auto mb-2 text-blue-500" />
			<p className="text-2xl font-bold">{referrals}</p>
			<p className="text-xs text-muted-foreground">Referrals</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 text-center">
			<Gift className="size-6 mx-auto mb-2 text-purple-500" />
			<p className="text-2xl font-bold">{pending}</p>
			<p className="text-xs text-muted-foreground">Pending</p>
		</div>
		<div className="p-4 rounded-xl bg-muted/30 text-center">
			<Trophy className="size-6 mx-auto mb-2 text-amber-500" />
			<p className="text-2xl font-bold">{conversionRate}</p>
			<p className="text-xs text-muted-foreground">Conversion</p>
		</div>
	</div>
);

const HowItWorks = ({
	steps,
}: {
	steps: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="font-semibold text-center">How It Works</h3>
		<div className="space-y-3">
			{steps.map((step, i) => (
				<div key={i} className="flex items-start gap-3">
					<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
						<span className="text-sm font-bold text-primary">{i + 1}</span>
					</div>
					<div>
						<p className="font-medium text-sm">{step.title}</p>
						<p className="text-xs text-muted-foreground">{step.description}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const RecentReferrals = ({
	referrals,
}: {
	referrals: { name: string; status: string; reward: string; date: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="font-semibold text-center">Recent Referrals</h3>
		<div className="space-y-3">
			{referrals.map((referral, i) => (
				<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
					<div>
						<p className="text-sm font-medium">{referral.name}</p>
						<p className="text-xs text-muted-foreground">{referral.date}</p>
					</div>
					<div className="text-right">
						<Badge className={referral.status === 'Completed' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'}>
							{referral.status}
						</Badge>
						<p className="text-xs text-muted-foreground mt-1">{referral.reward}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const ShareButtons = () => (
	<div className="space-y-4">
		<h3 className="font-semibold text-center">Share Your Link</h3>
		<div className="flex gap-3 justify-center">
			<Button variant="outline" size="icon" className="rounded-full">
				<Mail className="size-4" />
			</Button>
			<Button variant="outline" size="icon" className="rounded-full">
				<Share2 className="size-4" />
			</Button>
		</div>
		<Button className="w-full gap-2">
			<Gift className="size-4" />
			Invite Friends
		</Button>
	</div>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
			fallback: 'AN',
			name: 'Amanda Nelson',
			referralCode: 'AMANDA2024',
		},
		stats: {
			earnings: '$245',
			referrals: 12,
			pending: 3,
			conversionRate: '68%',
		},
		steps: [
			{ icon: Share2, title: 'Share your code', description: 'Send your unique code to friends' },
			{ icon: Users, title: 'Friends sign up', description: 'They get $10 off their first order' },
			{ icon: DollarSign, title: 'You earn rewards', description: 'Get $20 for each successful referral' },
		],
		referrals: [
			{ name: 'John D.', status: 'Completed', reward: '+$20', date: '2 days ago' },
			{ name: 'Sarah M.', status: 'Pending', reward: '$20', date: '5 days ago' },
			{ name: 'Mike R.', status: 'Completed', reward: '+$20', date: '1 week ago' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6 space-y-6">
						<ReferralHeader {...profileData.header} />
						<Separator />
						<ReferralStats {...profileData.stats} />
						<Separator />
						<HowItWorks steps={profileData.steps} />
						<Separator />
						<RecentReferrals referrals={profileData.referrals} />
						<ShareButtons />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
