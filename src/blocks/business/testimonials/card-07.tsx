import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Quote, Sparkles } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	highlights: string[];
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Verified Success" />
					<Title text="Proven Excellence" />
					<Description text="Real achievements backed by measurable results." />
				</div>

				<TestimonialCard
					quote="The platform they built has become essential to our daily operations. It streamlined our workflows, reduced errors, and improved team collaboration significantly."
					author="Amanda Foster"
					role="Head of Product"
					company="StreamlineOps"
					avatar="https://i.pravatar.cc/100?img=20"
					highlights={[
						'50% reduction in processing time',
						'99.9% system uptime',
						'Team productivity increased 3x',
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge className="gap-1.5">
			<Sparkles className="size-3" />
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
	highlights,
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto">
		<CardContent className="p-8 @md:p-10">
			<div className="grid @lg:grid-cols-[2fr_1fr] gap-8">
				<div>
					<Quote className="size-10 text-primary/30 mb-6" />
					<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
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
							<div className="text-sm text-muted-foreground">
								{role}, {company}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-muted/50 rounded-lg p-6">
					<h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
						Key Results
					</h4>
					<ul className="space-y-3">
						{highlights.map((highlight, i) => (
							<li key={i} className="flex items-start gap-2 text-sm">
								<CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
								<span>{highlight}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
);
