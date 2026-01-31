import Link from 'next/link';
import {
	ArrowRight,
	Crown,
	Star,
	Zap,
	Gift,
	Percent,
	Truck,
	Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const TierBenefit = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-primary shrink-0" />
		<span>{text}</span>
	</div>
);

const MembershipTier = ({
	name,
	icon: Icon,
	benefits,
	cta,
	featured,
}: {
	name: string;
	icon: React.ElementType;
	benefits: { icon: React.ElementType; text: string }[];
	cta: { label: string; href: string };
	featured?: boolean;
}) => (
	<Card
		className={`relative p-6 ${featured ? 'bg-primary text-primary-foreground border-primary' : 'bg-card'}`}
	>
		{featured && (
			<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
				Most Popular
			</Badge>
		)}
		<div className="flex items-center gap-3 mb-4">
			<div
				className={`size-12 rounded-xl flex items-center justify-center ${featured ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}
			>
				<Icon
					className={`size-6 ${featured ? 'text-primary-foreground' : 'text-primary'}`}
				/>
			</div>
			<h3 className="font-bold text-xl">{name}</h3>
		</div>
		<div className="space-y-3 mb-6">
			{benefits.map((benefit, i) => (
				<TierBenefit key={i} {...benefit} />
			))}
		</div>
		<Button
			variant={featured ? 'secondary' : 'default'}
			className="w-full gap-2"
			asChild
		>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</Card>
);

const SectionHeader = ({
	headline,
	subtext,
}: {
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-10 @md:mb-12">
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline}
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<SectionHeader
						headline="Membership Tiers"
						subtext="Unlock exclusive benefits and rewards based on your membership level"
					/>
					<div className="grid @md:grid-cols-3 gap-6">
						<MembershipTier
							name="Silver"
							icon={Star}
							benefits={[
								{ icon: Percent, text: '5% off all orders' },
								{ icon: Gift, text: 'Birthday reward' },
							]}
							cta={{ label: 'Join Free', href: '/membership/silver' }}
						/>
						<MembershipTier
							name="Gold"
							icon={Crown}
							benefits={[
								{ icon: Percent, text: '10% off all orders' },
								{ icon: Truck, text: 'Free express shipping' },
								{ icon: Gift, text: 'Exclusive gifts' },
							]}
							cta={{ label: 'Upgrade', href: '/membership/gold' }}
							featured
						/>
						<MembershipTier
							name="Platinum"
							icon={Award}
							benefits={[
								{ icon: Percent, text: '15% off all orders' },
								{ icon: Zap, text: 'Early access to sales' },
								{ icon: Gift, text: 'VIP concierge' },
							]}
							cta={{ label: 'Go Platinum', href: '/membership/platinum' }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
