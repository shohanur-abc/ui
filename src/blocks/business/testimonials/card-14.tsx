import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Quote, TrendingUp } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	stats: Array<{ label: string; value: string }>;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Data-Driven Results" />
					<Title text="Numbers That Matter" />
					<Description text="Quantifiable impact backed by real metrics." />
				</div>

				<TestimonialCard
					quote="The analytics platform they built gives us unprecedented visibility into our operations. Decision-making has never been this data-informed."
					author="Christina Reyes"
					role="VP of Analytics"
					company="DataFirst Corp"
					avatar="https://i.pravatar.cc/100?img=44"
					stats={[
						{ label: 'Faster Insights', value: '10x' },
						{ label: 'Cost Reduction', value: '35%' },
						{ label: 'ROI', value: '400%' },
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge className="gap-1.5">
			<BarChart3 className="size-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
		{text}
	</p>
);

const StatsRow = ({
	stats,
}: {
	stats: Array<{ label: string; value: string }>;
}) => (
	<div className="grid grid-cols-3 gap-4 mb-8">
		{stats.map(({ label, value }, i) => (
			<div key={i} className="text-center p-4 bg-primary/5 rounded-lg">
				<div className="flex items-center justify-center gap-1 text-primary mb-1">
					<TrendingUp className="size-4" />
				</div>
				<div className="text-2xl @md:text-3xl font-bold text-primary">
					{value}
				</div>
				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	stats,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto">
		<CardContent className="p-8 @md:p-10">
			<StatsRow stats={stats} />
			<Quote className="size-8 text-primary/30 mb-4" />
			<blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4 pt-6 border-t border-border">
				<Avatar className="size-12 ring-2 ring-border">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold">{author}</div>
					<div className="text-sm text-muted-foreground">
						{role}, {company}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
