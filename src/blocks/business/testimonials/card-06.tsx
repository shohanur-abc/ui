import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	industry: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Industry Leaders" />
					<Title text="Trusted by Executives" />
					<Description text="Leaders across industries rely on our expertise to drive growth." />
				</div>

				<TestimonialCard
					quote="Their strategic insights and technical prowess helped us navigate a complex digital transformation. The ROI exceeded our projections within the first quarter."
					author="Michael Roberts"
					role="Chief Digital Officer"
					company="Fortune Financial"
					avatar="https://i.pravatar.cc/100?img=12"
					industry="Financial Services"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline" className="gap-1.5">
			<Briefcase className="size-3" />
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
	industry,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto border-l-4 border-l-primary shadow-lg">
		<CardContent className="p-8 @md:p-10">
			<div className="flex flex-col @md:flex-row gap-6 @md:gap-8">
				<div className="@md:w-1/4 flex @md:flex-col items-center @md:items-start gap-4 @md:gap-0">
					<Avatar className="size-16 @md:size-20 @md:mb-4">
						<AvatarImage src={avatar} alt={author} />
						<AvatarFallback className="bg-primary text-primary-foreground text-lg">
							{author
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div className="@md:text-left">
						<div className="font-semibold text-base @md:text-lg">{author}</div>
						<div className="text-sm text-muted-foreground">{role}</div>
						<div className="text-sm text-primary font-medium">{company}</div>
					</div>
				</div>
				<div className="@md:w-3/4">
					<Badge variant="secondary" className="mb-4">
						{industry}
					</Badge>
					<Quote className="size-8 text-primary/20 mb-4" />
					<blockquote className="text-lg @md:text-xl leading-relaxed">
						&ldquo;{quote}&rdquo;
					</blockquote>
				</div>
			</div>
		</CardContent>
	</Card>
);
