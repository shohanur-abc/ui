import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Quote, Zap } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	projectType: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Innovation Stories" />
					<Title text="Breakthrough Solutions" />
					<Description text="How creative thinking solved complex challenges." />
				</div>

				<TestimonialCard
					quote="They took our seemingly impossible requirements and delivered an innovative solution that nobody else could envision. True creative problem-solvers."
					author="Nathan Park"
					role="CTO"
					company="Innovation Labs"
					avatar="https://i.pravatar.cc/100?img=57"
					projectType="AI-Powered Analytics"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5">
			<Lightbulb className="size-3" />
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
	projectType,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto overflow-hidden">
		<div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-4 text-center">
			<div className="flex items-center justify-center gap-2 text-sm font-medium">
				<Zap className="size-4 text-primary" />
				<span>Project: {projectType}</span>
			</div>
		</div>
		<CardContent className="p-8 @md:p-10">
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
					<div className="text-sm text-muted-foreground">{role}</div>
					<div className="text-sm text-primary font-medium">{company}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
