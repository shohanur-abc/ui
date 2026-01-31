import Link from 'next/link';
import { ArrowRight, Zap, Star, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EarnWay = ({
	icon: Icon,
	title,
	points,
}: {
	icon: React.ElementType;
	title: string;
	points: string;
}) => (
	<div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<h3 className="font-semibold">{title}</h3>
		</div>
		<Badge className="bg-primary/10 text-primary border-0">+{points}</Badge>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	subtext: string;
}) => (
	<div className="text-center mb-10">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-4"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-2xl mx-auto">
					<SectionHeader
						badge={{ icon: Zap, text: 'Earn Points' }}
						headline={{ text: 'Multiple Ways to', highlight: 'Earn' }}
						subtext="Stack up points with every action and unlock amazing rewards"
					/>
					<div className="space-y-3 mb-8">
						<EarnWay icon={Star} title="Make a purchase" points="1pt/$1" />
						<EarnWay icon={Gift} title="Refer a friend" points="500 pts" />
						<EarnWay icon={Check} title="Write a review" points="100 pts" />
						<EarnWay icon={Zap} title="Follow on social" points="50 pts" />
					</div>
					<div className="text-center">
						<Button size="lg" className="gap-2" asChild>
							<Link href="/rewards/join">
								Start Earning
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
