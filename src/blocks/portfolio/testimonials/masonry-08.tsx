'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	metric: string;
	metricLabel: string;
}

export default function Main() {
	return (
		<section className="@container bg-gradient-to-b from-muted/30 to-background">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Results" />
					<Title text="Metrics Masonry" />
					<Description text="Testimonials with performance metrics." />
				</div>

				<MetricsMasonry
					items={[
						{
							quote:
								'Revenue growth was incredible. The new platform directly contributed to our best quarter ever.',
							author: 'Patricia Lane',
							role: 'CEO',
							company: 'RevenuePro',
							avatar: 'https://i.pravatar.cc/100?img=30',
							metric: '+285%',
							metricLabel: 'Revenue',
						},
						{
							quote: 'Traffic exploded!',
							author: 'Kevin Z.',
							role: 'CMO',
							company: 'TrafficPro',
							avatar: 'https://i.pravatar.cc/100?img=31',
							metric: '+420%',
							metricLabel: 'Traffic',
						},
						{
							quote:
								'Customer acquisition costs dropped significantly after the optimization work.',
							author: 'Maria Santos',
							role: 'VP Growth',
							company: 'CACSaver',
							avatar: 'https://i.pravatar.cc/100?img=32',
							metric: '-45%',
							metricLabel: 'CAC',
						},
						{
							quote: 'Page load under 1s.',
							author: 'James W.',
							role: 'CTO',
							company: 'SpeedTech',
							avatar: 'https://i.pravatar.cc/100?img=33',
							metric: '0.8s',
							metricLabel: 'Load Time',
						},
						{
							quote: 'Conversion rates improved dramatically.',
							author: 'Emily Foster',
							role: 'VP Marketing',
							company: 'ConvertMax',
							avatar: 'https://i.pravatar.cc/100?img=34',
							metric: '+156%',
							metricLabel: 'Conversions',
						},
						{
							quote: '5 star rating.',
							author: 'Mike P.',
							role: 'Product Lead',
							company: 'FiveStar',
							avatar: 'https://i.pravatar.cc/100?img=35',
							metric: '4.9★',
							metricLabel: 'App Rating',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge>{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const MetricsMasonry = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-6xl mx-auto columns-1 @sm:columns-2 @lg:columns-3 gap-5">
		{items.map(
			({ quote, author, role, company, avatar, metric, metricLabel }, i) => (
				<div key={i} className="break-inside-avoid mb-5">
					<div className="bg-card border rounded-xl p-5 shadow-sm">
						<div className="flex items-center gap-3 mb-4 pb-3 border-b">
							<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
								<TrendingUp className="size-5 text-primary" />
							</div>
							<div>
								<div className="text-xl font-bold text-primary">{metric}</div>
								<div className="text-xs text-muted-foreground">
									{metricLabel}
								</div>
							</div>
						</div>
						<Quote className="size-5 text-primary/20 mb-2" />
						<blockquote className="text-sm leading-relaxed mb-4">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-2.5">
							<Avatar className="size-8">
								<AvatarImage src={avatar} />
								<AvatarFallback className="bg-muted text-xs">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-medium text-xs">{author}</div>
								<div className="text-xs text-muted-foreground">
									{role}, {company}
								</div>
							</div>
						</div>
					</div>
				</div>
			),
		)}
	</div>
);
