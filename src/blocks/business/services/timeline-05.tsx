import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, FileCheck, Rocket, Settings } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Engagement" />
					<Title text="Typical Project Timeline" />
					<Description text="What to expect when working with us on a standard engagement." />
				</div>

				<TimelineCards
					items={[
						{
							icon: Clock,
							week: 'Week 1',
							title: 'Kickoff & Discovery',
							tasks: [
								'Project kickoff meeting',
								'Stakeholder interviews',
								'Requirements gathering',
								'Technical assessment',
							],
						},
						{
							icon: Users,
							week: 'Week 2-3',
							title: 'Research & Strategy',
							tasks: [
								'User research',
								'Competitive analysis',
								'Information architecture',
								'Technical planning',
							],
						},
						{
							icon: FileCheck,
							week: 'Week 4-6',
							title: 'Design & Prototype',
							tasks: [
								'Wireframing',
								'Visual design',
								'Interactive prototype',
								'Design review',
							],
						},
						{
							icon: Settings,
							week: 'Week 7-12',
							title: 'Development',
							tasks: [
								'Sprint planning',
								'Feature development',
								'Code reviews',
								'Progress demos',
							],
						},
						{
							icon: Rocket,
							week: 'Week 13-14',
							title: 'Launch',
							tasks: [
								'Final testing',
								'Deployment',
								'Training',
								'Go-live support',
							],
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
	week: string;
	title: string;
	tasks: string[];
}

const TimelineCards = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative">
		{/* Connecting line */}
		<div className="absolute top-8 left-4 right-4 h-0.5 bg-border hidden @lg:block" />

		<div className="grid @sm:grid-cols-2 @lg:grid-cols-5 gap-4">
			{items.map(({ icon: Icon, week, title, tasks }, i) => (
				<div key={i} className="relative">
					{/* Node */}
					<div className="size-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
						<Icon className="size-7 text-primary-foreground" />
					</div>

					<Card className="py-0 h-full">
						<CardContent className="p-4 text-center">
							<Badge variant="secondary" className="mb-2">
								{week}
							</Badge>
							<h3 className="font-bold mb-3">{title}</h3>
							<ul className="space-y-1 text-left">
								{tasks.map((task, j) => (
									<li
										key={j}
										className="text-xs text-muted-foreground flex items-start gap-2"
									>
										<div className="size-1 rounded-full bg-primary mt-1.5 shrink-0" />
										{task}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			))}
		</div>
	</div>
);
