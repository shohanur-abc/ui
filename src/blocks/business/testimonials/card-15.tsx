import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Rocket, Target } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	companyStage: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Startup Success" />
					<Title text="Scaling Together" />
					<Description text="From seed stage to series funding and beyond." />
				</div>

				<TestimonialCard
					quote="They helped us build an MVP that secured our Series A. Now, three years later, they're still our go-to team for all major product initiatives."
					author="Alex Morgan"
					role="Founder"
					company="RocketLaunch.io"
					avatar="https://i.pravatar.cc/100?img=68"
					companyStage="Series B"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5">
			<Rocket className="size-3" />
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
	companyStage,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto relative">
		<StageBadgeDecorative stage={companyStage} />
		<CardContent className="p-8 @md:p-10">
			<div className="flex flex-col @md:flex-row gap-8">
				<div className="@md:w-1/3 text-center @md:text-left">
					<Avatar className="size-20 @md:size-24 mx-auto @md:mx-0 mb-4 ring-4 ring-primary/10">
						<AvatarImage src={avatar} alt={author} />
						<AvatarFallback className="bg-primary text-primary-foreground text-xl">
							{author
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div className="font-bold text-lg">{author}</div>
					<div className="text-sm text-muted-foreground">{role}</div>
					<div className="text-sm text-primary font-medium mt-1">{company}</div>
				</div>
				<div className="@md:w-2/3">
					<Quote className="size-8 text-primary/30 mb-4" />
					<blockquote className="text-lg @md:text-xl leading-relaxed">
						&ldquo;{quote}&rdquo;
					</blockquote>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StageBadgeDecorative = ({ stage }: { stage: string }) => (
	<div className="absolute top-4 right-4">
		<Badge className="gap-1.5 bg-primary">
			<Target className="size-3" />
			{stage}
		</Badge>
	</div>
);
