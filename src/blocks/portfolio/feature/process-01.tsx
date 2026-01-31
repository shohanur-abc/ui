import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Lightbulb,
	Palette,
	Code,
	TestTube2,
	Rocket,
	RefreshCw,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Approach" />
					<Title text="How I Work" />
					<Description text="My development process ensures quality results at every stage." />
				</div>

				<ProcessFlow
					steps={[
						{
							icon: Lightbulb,
							title: 'Discovery',
							description: 'Understanding your goals, users, and requirements.',
						},
						{
							icon: Palette,
							title: 'Design',
							description:
								'Creating wireframes and visual designs for approval.',
						},
						{
							icon: Code,
							title: 'Development',
							description: 'Building with clean, maintainable code.',
						},
						{
							icon: TestTube2,
							title: 'Testing',
							description: 'Rigorous testing across devices and browsers.',
						},
						{
							icon: Rocket,
							title: 'Launch',
							description: 'Deploying to production with zero downtime.',
						},
						{
							icon: RefreshCw,
							title: 'Iterate',
							description: 'Continuous improvement based on feedback.',
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
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const ProcessFlow = ({ steps }: { steps: StepItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
		{steps.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="relative group">
				<div className="flex items-start gap-4">
					<div className="relative">
						<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-6 @md:size-7" />
						</div>
						<div className="absolute -top-2 -left-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
							{i + 1}
						</div>
					</div>
					<div className="pt-1">
						<h3 className="font-bold text-base @md:text-lg mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</div>

				{i < steps.length - 1 && i % 3 !== 2 && (
					<div className="hidden @xl:block absolute top-6 left-[72px] w-[calc(100%-72px)] border-t-2 border-dashed border-primary/20" />
				)}
			</div>
		))}
	</div>
);
