import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Search,
	Palette,
	Code2,
	Rocket,
	Headphones,
	TrendingUp,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Process" />
					<Title text="How We Deliver Results" />
					<Description text="A proven six-step methodology that ensures successful project delivery." />
				</div>

				<TimelineVertical
					items={[
						{
							icon: Search,
							step: 1,
							title: 'Discovery',
							description:
								'We start by understanding your business, goals, and challenges through stakeholder interviews and research.',
							duration: '1-2 weeks',
						},
						{
							icon: Palette,
							step: 2,
							title: 'Strategy & Design',
							description:
								'Our design team creates wireframes, prototypes, and visual designs based on research insights.',
							duration: '2-4 weeks',
						},
						{
							icon: Code2,
							step: 3,
							title: 'Development',
							description:
								'Engineers build your solution in agile sprints with regular demos and feedback loops.',
							duration: '4-12 weeks',
						},
						{
							icon: Rocket,
							step: 4,
							title: 'Testing & Launch',
							description:
								'Rigorous QA testing followed by a carefully orchestrated production deployment.',
							duration: '1-2 weeks',
						},
						{
							icon: Headphones,
							step: 5,
							title: 'Support',
							description:
								'Post-launch support to address issues, gather feedback, and ensure stability.',
							duration: 'Ongoing',
						},
						{
							icon: TrendingUp,
							step: 6,
							title: 'Growth',
							description:
								'Continuous optimization and feature development based on user data and business needs.',
							duration: 'Ongoing',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface TimelineItem {
	icon: ComponentType<{ className?: string }>;
	step: number;
	title: string;
	description: string;
	duration: string;
}

const TimelineVertical = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative max-w-3xl mx-auto">
		{/* Timeline line */}
		<div className="absolute left-6 @md:left-8 top-0 bottom-0 w-0.5 bg-border" />

		<div className="space-y-8">
			{items.map(({ icon: Icon, step, title, description, duration }, i) => (
				<div key={i} className="relative pl-16 @md:pl-20">
					{/* Timeline node */}
					<div className="absolute left-0 top-0">
						<div className="size-12 @md:size-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
							<Icon className="size-5 @md:size-6" />
						</div>
						<span className="absolute -top-2 -right-2 size-6 rounded-full bg-background border-2 border-primary text-xs font-bold flex items-center justify-center">
							{step}
						</span>
					</div>

					<Card className="py-0">
						<CardContent className="p-5 @md:p-6">
							<div className="flex items-start justify-between gap-4 mb-2">
								<h3 className="text-lg @md:text-xl font-bold">{title}</h3>
								<Badge variant="secondary" className="shrink-0">
									{duration}
								</Badge>
							</div>
							<p className="text-sm @md:text-base text-muted-foreground">
								{description}
							</p>
						</CardContent>
					</Card>
				</div>
			))}
		</div>
	</div>
);
