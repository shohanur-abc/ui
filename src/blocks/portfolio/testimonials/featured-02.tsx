import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Success Story" />
					<Title text="Impactful Results" />
					<Description text="A featured case study with measurable outcomes." />
				</div>

				<FeaturedWithMetric
					quote="The website redesign was a complete success. Not only did it look stunning, but the performance improvements led to a dramatic increase in conversions. Our sales team has never been happier with the quality of leads coming through."
					author="Michelle Chen"
					role="VP of Marketing"
					company="ConversionPro Inc"
					avatar="https://i.pravatar.cc/100?img=96"
					metric="+420%"
					metricLabel="Conversion Rate Increase"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary">{text}</Badge>
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

const FeaturedWithMetric = ({
	quote,
	author,
	role,
	company,
	avatar,
	metric,
	metricLabel,
}: TestimonialItem) => (
	<div className="max-w-5xl mx-auto">
		<div className="grid @lg:grid-cols-3 gap-6">
			<Card className="@lg:col-span-2">
				<CardContent className="p-8 @md:p-10">
					<Quote className="size-12 text-primary/30 mb-6" />
					<blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-4">
						<Avatar className="size-14 ring-2 ring-primary/20">
							<AvatarImage src={avatar} />
							<AvatarFallback className="bg-primary text-primary-foreground text-lg">
								{author[0]}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-semibold text-lg">{author}</div>
							<div className="text-muted-foreground">
								{role}, {company}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-primary text-primary-foreground">
				<CardContent className="p-8 @md:p-10 h-full flex flex-col items-center justify-center text-center">
					<TrendingUp className="size-10 mb-4 opacity-80" />
					<div className="text-5xl @md:text-6xl font-bold mb-2">{metric}</div>
					<div className="text-sm uppercase tracking-wider opacity-80">
						{metricLabel}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);
