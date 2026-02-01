import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	ArrowRight,
	Lightbulb,
	PenTool,
	Code,
	TestTube,
	Rocket,
	HeartHandshake,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="End-to-End" />
					<Title text="Full Project Lifecycle" />
					<Description text="From initial concept to ongoing support, we're with you every step of the way." />
				</div>

				<TimelineAlternating
					items={[
						{
							icon: Lightbulb,
							title: 'Ideation',
							description:
								'Brainstorm, validate, and refine your product concept with market research and user insights.',
							color: 'primary',
						},
						{
							icon: PenTool,
							title: 'Design',
							description:
								'Create user-centered designs with wireframes, prototypes, and polished visual interfaces.',
							color: 'primary',
						},
						{
							icon: Code,
							title: 'Development',
							description:
								'Build your product with clean, maintainable code using modern frameworks and best practices.',
							color: 'primary',
						},
						{
							icon: TestTube,
							title: 'Testing',
							description:
								'Comprehensive QA including unit tests, integration tests, and user acceptance testing.',
							color: 'primary',
						},
						{
							icon: Rocket,
							title: 'Launch',
							description:
								'Deploy to production with careful orchestration, monitoring, and rollback capabilities.',
							color: 'primary',
						},
						{
							icon: HeartHandshake,
							title: 'Support',
							description:
								'Ongoing maintenance, optimization, and feature development to keep your product thriving.',
							color: 'primary',
						},
					]}
				/>

				<div className="text-center mt-12 @md:mt-16">
					<Button size="lg" asChild>
						<Link href="/contact">
							Start Your Project
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
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
	title: string;
	description: string;
	color: string;
}

const TimelineAlternating = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative max-w-4xl mx-auto">
		{/* Center line */}
		<div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden @md:block" />

		<div className="space-y-8 @md:space-y-0">
			{items.map(({ icon: Icon, title, description }, i) => {
				const isLeft = i % 2 === 0;
				return (
					<div
						key={i}
						className={`relative @md:flex @md:items-center ${
							isLeft ? '@md:flex-row' : '@md:flex-row-reverse'
						}`}
					>
						{/* Content */}
						<div
							className={`@md:w-1/2 ${
								isLeft ? '@md:pr-12 @md:text-right' : '@md:pl-12'
							}`}
						>
							<div
								className={`bg-card border rounded-xl p-5 @md:p-6 ${
									isLeft ? '@md:ml-auto' : '@md:mr-auto'
								} max-w-sm`}
							>
								<div
									className={`flex items-center gap-3 mb-3 ${
										isLeft ? '@md:flex-row-reverse' : ''
									}`}
								>
									<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<Icon className="size-5 text-primary" />
									</div>
									<h3 className="font-bold text-lg">{title}</h3>
								</div>
								<p className="text-sm text-muted-foreground">{description}</p>
							</div>
						</div>

						{/* Center node */}
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden @md:block">
							<div className="size-4 rounded-full bg-primary border-4 border-background shadow" />
						</div>

						{/* Spacer for other side */}
						<div className="hidden @md:block @md:w-1/2" />
					</div>
				);
			})}
		</div>
	</div>
);
