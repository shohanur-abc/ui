import Link from 'next/link';
import { ArrowRight, Calendar, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SeasonCard = ({
	season,
	dates,
	discount,
	active,
	href,
}: {
	season: string;
	dates: string;
	discount: string;
	active?: boolean;
	href: string;
}) => (
	<Link
		href={href}
		className={`group relative p-6 rounded-2xl border transition-all ${
			active
				? 'bg-primary text-primary-foreground border-primary'
				: 'bg-card border-border/50 hover:border-primary/30'
		}`}
	>
		{active && (
			<Badge variant="secondary" className="absolute -top-2 right-4 text-xs">
				Current
			</Badge>
		)}
		<h3 className="font-bold text-lg mb-1">{season}</h3>
		<p
			className={`text-sm mb-3 ${active ? 'opacity-80' : 'text-muted-foreground'}`}
		>
			{dates}
		</p>
		<span
			className={`text-2xl font-black ${active ? 'text-primary-foreground' : 'text-primary'}`}
		>
			{discount}
		</span>
	</Link>
);

const SectionHeader = ({
	headline,
	subtext,
}: {
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-8 @md:mb-10">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-4"
		>
			<Calendar className="size-3" />
			Seasonal Promotions
		</Badge>
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
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						headline="Seasonal Sales Calendar"
						subtext="Mark your calendars for our biggest sales throughout the year"
					/>
					<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
						<SeasonCard
							season="Winter Sale"
							dates="Dec 26 - Jan 15"
							discount="Up to 60%"
							active
							href="/winter-sale"
						/>
						<SeasonCard
							season="Spring Sale"
							dates="Mar 20 - Apr 10"
							discount="Up to 50%"
							href="/spring-sale"
						/>
						<SeasonCard
							season="Summer Sale"
							dates="Jun 21 - Jul 15"
							discount="Up to 70%"
							href="/summer-sale"
						/>
						<SeasonCard
							season="Fall Sale"
							dates="Sep 22 - Oct 10"
							discount="Up to 55%"
							href="/fall-sale"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
