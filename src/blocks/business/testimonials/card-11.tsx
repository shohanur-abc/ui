import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	yearsPartner: number;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Long-term Partners" />
					<Title text="Built on Trust" />
					<Description text="Relationships that stand the test of time." />
				</div>

				<TestimonialCard
					quote="Five years and counting. They've been instrumental in every major milestone of our company, from startup to market leader. The consistency of their work is remarkable."
					author="Elizabeth Crawford"
					role="CEO"
					company="Evergreen Solutions"
					avatar="https://i.pravatar.cc/100?img=41"
					yearsPartner={5}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline" className="gap-1.5">
			<Clock className="size-3" />
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
	yearsPartner,
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto">
		<CardContent className="p-0">
			<div className="grid @lg:grid-cols-[auto_1fr]">
				<div className="bg-primary text-primary-foreground p-8 @lg:p-10 flex flex-col items-center justify-center min-w-[200px]">
					<div className="text-6xl @md:text-7xl font-bold">{yearsPartner}</div>
					<div className="text-sm uppercase tracking-wider opacity-80 mt-2">
						Years Partner
					</div>
					<TimelineDecorative years={yearsPartner} />
				</div>
				<div className="p-8 @md:p-10">
					<Quote className="size-10 text-primary/30 mb-6" />
					<blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-4">
						<Avatar className="size-14 ring-2 ring-border">
							<AvatarImage src={avatar} alt={author} />
							<AvatarFallback className="bg-primary text-primary-foreground">
								{author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-semibold text-lg">{author}</div>
							<div className="text-sm text-muted-foreground">{role}</div>
							<div className="text-sm text-primary font-medium">{company}</div>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TimelineDecorative = ({ years }: { years: number }) => (
	<div className="flex gap-1 mt-4">
		{Array.from({ length: years }).map((_, i) => (
			<div
				key={i}
				className="w-2 h-2 rounded-full bg-primary-foreground/60"
			/>
		))}
	</div>
);
