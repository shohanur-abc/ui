import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import {
	Clock,
	Copy,
	Gift,
	Share2,
	Sparkles,
	Star,
	Users,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-24 -right-24 size-48 bg-primary/20 rounded-full blur-3xl" />
		<div className="absolute -bottom-24 -left-24 size-48 bg-accent/20 rounded-full blur-3xl" />
	</div>
);

const ProfileSection = ({
	src,
	fallback,
	name,
	username,
	bio,
}: {
	src: string;
	fallback: string;
	name: string;
	username: string;
	bio: string;
}) => (
	<div className="text-center space-y-3">
		<Avatar className="size-24 mx-auto ring-4 ring-primary/20 shadow-lg shadow-primary/10">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h2 className="text-xl font-bold">{name}</h2>
			<p className="text-sm text-muted-foreground">@{username}</p>
		</div>
		<p className="text-sm text-muted-foreground max-w-xs mx-auto">{bio}</p>
	</div>
);

const ReferralCard = ({
	code,
	reward,
	referrals,
	earnings,
}: {
	code: string;
	reward: string;
	referrals: number;
	earnings: string;
}) => (
	<div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 rounded-xl border border-primary/20 space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Gift className="size-5 text-primary" />
				<span className="font-semibold">Referral Program</span>
			</div>
			<Badge variant="secondary" className="gap-1">
				<Sparkles className="size-3" />
				{reward}
			</Badge>
		</div>
		<div className="flex items-center gap-2 bg-background/80 rounded-lg p-3">
			<code className="flex-1 text-sm font-mono">{code}</code>
			<Button variant="ghost" size="icon-sm">
				<Copy className="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm">
				<Share2 className="size-4" />
			</Button>
		</div>
		<div className="grid grid-cols-2 gap-4 text-center">
			<div>
				<p className="text-2xl font-bold">{referrals}</p>
				<p className="text-xs text-muted-foreground">Referrals</p>
			</div>
			<div>
				<p className="text-2xl font-bold text-primary">{earnings}</p>
				<p className="text-xs text-muted-foreground">Earned</p>
			</div>
		</div>
	</div>
);

const AchievementBadges = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; unlocked: boolean }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium">Achievements</h3>
		<div className="flex flex-wrap gap-2">
			{items.map((badge, i) => (
				<div
					key={i}
					className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
						badge.unlocked
							? 'bg-primary/10 text-primary border border-primary/20'
							: 'bg-muted text-muted-foreground opacity-50'
					}`}
				>
					<badge.icon className="size-3" />
					{badge.label}
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
			fallback: 'EW',
			name: 'Emma Wilson',
			username: 'emmaw',
			bio: 'Fashion enthusiast & early adopter. Love discovering new brands!',
		},
		referral: {
			code: 'EMMA25OFF',
			reward: '$25 per referral',
			referrals: 18,
			earnings: '$450',
		},
		achievements: [
			{ icon: Star, label: 'First Purchase', unlocked: true },
			{ icon: Zap, label: 'Speed Shopper', unlocked: true },
			{ icon: Users, label: 'Social Butterfly', unlocked: true },
			{ icon: Gift, label: 'Gift Giver', unlocked: true },
			{ icon: Clock, label: 'Early Bird', unlocked: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card className="relative overflow-hidden">
					<GlowDecorative />
					<CardHeader className="relative">
						<ProfileSection {...profileData.profile} />
					</CardHeader>
					<CardContent className="relative space-y-6">
						<ReferralCard {...profileData.referral} />
						<AchievementBadges items={profileData.achievements} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
