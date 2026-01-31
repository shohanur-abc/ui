import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Workflow" />
					<Title text="Project Lifecycle" />
					<Description text="From initial concept to final delivery, here's how I bring your project to life." />
				</div>

				<ProcessSteps
					steps={[
						{
							phase: 'Phase 1',
							title: 'Discovery & Planning',
							duration: '1-2 weeks',
							tasks: [
								'Requirements gathering sessions',
								'Technical feasibility analysis',
								'Project timeline and milestones',
								'Technology stack selection',
							],
						},
						{
							phase: 'Phase 2',
							title: 'Design & Architecture',
							duration: '2-3 weeks',
							tasks: [
								'UI/UX wireframes and mockups',
								'System architecture design',
								'Database schema planning',
								'API specification',
							],
						},
						{
							phase: 'Phase 3',
							title: 'Development',
							duration: '4-8 weeks',
							tasks: [
								'Agile sprint development',
								'Weekly progress demos',
								'Code reviews and testing',
								'Continuous integration',
							],
						},
						{
							phase: 'Phase 4',
							title: 'Launch & Support',
							duration: '1-2 weeks',
							tasks: [
								'Production deployment',
								'Performance optimization',
								'Documentation handoff',
								'Post-launch monitoring',
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

interface StepItem {
	phase: string;
	title: string;
	duration: string;
	tasks: string[];
}

const ProcessSteps = ({ steps }: { steps: StepItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
		{steps.map(({ phase, title, duration, tasks }, i) => (
			<div key={i} className="relative">
				<Card className="py-0 h-full">
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-center justify-between mb-3">
							<Badge variant="secondary" className="text-xs">
								{phase}
							</Badge>
							<span className="text-xs text-muted-foreground">{duration}</span>
						</div>
						<h3 className="font-bold text-base @md:text-lg mb-4">{title}</h3>
						<ul className="space-y-2">
							{tasks.map((task, j) => (
								<li
									key={j}
									className="flex items-start gap-2 text-sm text-muted-foreground"
								>
									<CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
									{task}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				{i < steps.length - 1 && (
					<div className="hidden @xl:flex absolute top-1/2 -right-3 @xl:-right-4 transform -translate-y-1/2 z-10">
						<ArrowRight className="size-5 @md:size-6 text-primary" />
					</div>
				)}
			</div>
		))}
	</div>
);
