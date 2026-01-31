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
	metric?: {
		value: string;
		label: string;
	};
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Results That Speak" />
					<Title text="Real Impact, Real Stories" />
					<Description text="See the measurable difference we've made for our clients." />
				</div>

				<TestimonialCard
					quote="Their data-driven approach revolutionized our marketing strategy. Within three months, we saw unprecedented growth in customer acquisition and retention."
					author="Sarah Mitchell"
					role="CMO"
					company="DataDriven Marketing"
					avatar="https://i.pravatar.cc/100?img=5"
					metric={{
						value: "247%",
						label: "Revenue Increase",
					}}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge className="gap-1.5">
			<TrendingUp className="size-3" />
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

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	metric,
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto relative overflow-hidden">
		<MetricBadgeDecorative value={metric?.value} label={metric?.label} />
		<CardContent className="p-8 @md:p-12 @lg:pr-64">
			<Quote className="size-10 text-primary/30 mb-6" />
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4">
				<Avatar className="size-12 @md:size-14">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-base @md:text-lg">{author}</div>
					<div className="text-sm text-muted-foreground">
						{role} at {company}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MetricBadgeDecorative = ({
	value,
	label,
}: {
	value?: string;
	label?: string;
}) =>
	value &&
	label && (
		<div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-primary/10 to-transparent hidden @lg:flex flex-col items-center justify-center">
			<div className="text-4xl @xl:text-5xl font-bold text-primary mb-2">
				{value}
			</div>
			<div className="text-sm text-muted-foreground text-center px-4">
				{label}
			</div>
		</div>
	);
