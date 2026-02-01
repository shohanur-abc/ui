import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Roadmap" />
					<Title text="Project Timeline" />
					<Description text="Clear milestones and deliverables at every stage of your project." />
				</div>

				<TimelineHorizontal
					items={[
						{
							phase: 'Phase 1',
							title: 'Discovery',
							weeks: 'Week 1-2',
							deliverables: [
								'Requirements doc',
								'User personas',
								'Project plan',
							],
							completed: true,
						},
						{
							phase: 'Phase 2',
							title: 'Design',
							weeks: 'Week 3-6',
							deliverables: ['Wireframes', 'UI designs', 'Prototype'],
							completed: true,
						},
						{
							phase: 'Phase 3',
							title: 'Development',
							weeks: 'Week 7-14',
							deliverables: ['Frontend', 'Backend', 'Integrations'],
							completed: false,
						},
						{
							phase: 'Phase 4',
							title: 'Launch',
							weeks: 'Week 15-16',
							deliverables: ['Testing', 'Deployment', 'Training'],
							completed: false,
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
	phase: string;
	title: string;
	weeks: string;
	deliverables: string[];
	completed: boolean;
}

const TimelineHorizontal = ({ items }: { items: TimelineItem[] }) => (
	<div className="overflow-x-auto">
		<div className="min-w-[800px]">
			{/* Timeline bar */}
			<div className="relative flex items-center mb-8">
				<div className="absolute left-0 right-0 h-1 bg-border" />
				<div
					className="absolute left-0 h-1 bg-primary transition-all"
					style={{
						width: `${(items.filter((i) => i.completed).length / items.length) * 100}%`,
					}}
				/>
				{items.map(({ completed }, i) => (
					<div key={i} className="relative flex-1 flex justify-center">
						<div
							className={`size-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${
								completed
									? 'bg-primary border-primary text-primary-foreground'
									: 'bg-background border-border'
							}`}
						>
							{completed ? (
								<Check className="size-4" />
							) : (
								<span className="text-xs font-bold">{i + 1}</span>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Timeline content */}
			<div className="grid grid-cols-4 gap-4">
				{items.map(({ phase, title, weeks, deliverables, completed }, i) => (
					<div
						key={i}
						className={`text-center p-4 rounded-xl transition-colors ${
							completed ? 'bg-primary/5' : 'bg-muted/50'
						}`}
					>
						<Badge
							variant={completed ? 'default' : 'secondary'}
							className="mb-2"
						>
							{phase}
						</Badge>
						<h3 className="font-bold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground mb-3">{weeks}</p>
						<ul className="space-y-1">
							{deliverables.map((item, j) => (
								<li
									key={j}
									className="text-xs text-muted-foreground flex items-center justify-center gap-1"
								>
									<div
										className={`size-1 rounded-full ${
											completed ? 'bg-primary' : 'bg-muted-foreground'
										}`}
									/>
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	</div>
);
