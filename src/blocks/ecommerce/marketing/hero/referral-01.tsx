import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Users, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const ReferralStats = ({
	stats,
}: {
	stats: { value: string; label: string }[];
}) => (
	<div className="flex justify-center gap-8 @md:gap-12">
		{stats.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-3xl @md:text-4xl font-bold text-primary">
					{value}
				</div>
				<div className="text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

const HowItWorks = ({
	steps,
}: {
	steps: { icon: React.ElementType; title: string; description: string }[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6">
		{steps.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="text-center space-y-3">
				<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
					<Icon className="size-7 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-5" />
			</Link>
		</Button>
	</div>
);

const RecentReferrals = ({
	users,
}: {
	users: { avatar: string; name: string; earned: string }[];
}) => (
	<div className="max-w-md mx-auto mt-8">
		<p className="text-sm text-muted-foreground text-center mb-4">
			Recent referrals:
		</p>
		<div className="space-y-2">
			{users.map((user, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg border bg-card"
				>
					<Avatar className="size-8">
						<AvatarImage src={user.avatar} />
						<AvatarFallback>{user.name[0]}</AvatarFallback>
					</Avatar>
					<span className="text-sm flex-1">{user.name}</span>
					<Badge variant="secondary" className="text-xs">
						{user.earned}
					</Badge>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={Gift} text="Referral Program" />
					<Title text="Give $20, Get" highlight="$20" />
					<Description text="Share the love and earn rewards! When your friends shop, you both get $20 off. It's a win-win!" />
				</div>
				<ReferralStats
					stats={[
						{ value: '$20', label: 'You Get' },
						{ value: '$20', label: 'Friends Get' },
						{ value: '∞', label: 'No Limits' },
					]}
				/>
				<HowItWorks
					steps={[
						{
							icon: Users,
							title: 'Share Your Link',
							description: 'Send your unique referral link to friends',
						},
						{
							icon: Sparkles,
							title: 'Friends Shop',
							description: 'They get $20 off their first order',
						},
						{
							icon: Zap,
							title: 'You Earn',
							description: 'Get $20 credit when they purchase',
						},
					]}
				/>
				<CTA label="Get My Referral Link" href="/referral" />
				<RecentReferrals
					users={[
						{
							avatar: 'https://i.pravatar.cc/150?img=1',
							name: 'Sarah just earned',
							earned: '+$20',
						},
						{
							avatar: 'https://i.pravatar.cc/150?img=2',
							name: 'Mike just earned',
							earned: '+$20',
						},
						{
							avatar: 'https://i.pravatar.cc/150?img=3',
							name: 'Emma just earned',
							earned: '+$20',
						},
					]}
				/>
			</div>
		</section>
	);
}
