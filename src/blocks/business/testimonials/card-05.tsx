import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Award, Quote } from 'lucide-react';
import Link from 'next/link';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	caseStudyUrl?: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Featured Story" />
					<Title text="Success in Action" />
					<Description text="Explore how our partnership delivered transformative outcomes." />
				</div>

				<TestimonialCard
					quote="From concept to launch, they were with us every step of the way. Their innovative approach helped us enter new markets and establish ourselves as industry leaders."
					author="David Thompson"
					role="Founder & CEO"
					company="NexGen Industries"
					avatar="https://i.pravatar.cc/100?img=11"
					caseStudyUrl="/case-studies/nexgen"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge className="gap-1.5 bg-primary/10 text-primary hover:bg-primary/20">
			<Award className="size-3" />
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
	caseStudyUrl,
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto group">
		<CardContent className="p-8 @md:p-12">
			<div className="flex flex-col @lg:flex-row gap-8 @lg:gap-12">
				<div className="@lg:w-1/3">
					<div className="flex flex-col items-center text-center">
						<Avatar className="size-24 @md:size-32 ring-4 ring-primary/10 mb-4">
							<AvatarImage src={avatar} alt={author} />
							<AvatarFallback className="bg-primary text-primary-foreground text-2xl @md:text-3xl">
								{author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div className="font-bold text-lg @md:text-xl">{author}</div>
						<div className="text-sm text-muted-foreground mb-1">{role}</div>
						<div className="text-sm text-primary font-medium">{company}</div>
					</div>
				</div>
				<div className="@lg:w-2/3 flex flex-col justify-center">
					<Quote className="size-8 text-primary/30 mb-4" />
					<blockquote className="text-lg @md:text-xl leading-relaxed mb-6">
						&ldquo;{quote}&rdquo;
					</blockquote>
					{caseStudyUrl && (
						<div>
							<Button variant="outline" className="group/btn gap-2" asChild>
								<Link href={caseStudyUrl}>
									Read Case Study
									<ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);
