import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check, Circle, CircleDot } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<CenteredProcess
					eyebrow="How We Work"
					title="A Simple, Proven Process"
					description="We've refined our methodology over hundreds of projects to deliver consistent, outstanding results."
					steps={[
						{
							number: '01',
							title: 'Discovery',
							description:
								'We start by understanding your business, users, and goals. Deep research ensures we build the right solution.',
							deliverables: ['Stakeholder interviews', 'User research', 'Competitive analysis', 'Requirements document'],
						},
						{
							number: '02',
							title: 'Strategy',
							description:
								'Based on insights, we define the product vision, technical architecture, and project roadmap.',
							deliverables: ['Product roadmap', 'Technical specification', 'Resource planning', 'Risk assessment'],
						},
						{
							number: '03',
							title: 'Design',
							description:
								'Our designers create intuitive interfaces that balance aesthetics with usability.',
							deliverables: ['Wireframes', 'Visual designs', 'Interactive prototype', 'Design system'],
						},
						{
							number: '04',
							title: 'Development',
							description:
								'Engineers build your product using agile sprints with regular demos and feedback cycles.',
							deliverables: ['Sprint deliverables', 'Code reviews', 'Testing reports', 'Documentation'],
						},
						{
							number: '05',
							title: 'Launch',
							description:
								'We deploy to production with monitoring, ensure a smooth launch, and provide ongoing support.',
							deliverables: ['Production deployment', 'Performance monitoring', 'User training', 'Support handoff'],
						},
					]}
					cta={{ label: 'Start Your Project', href: '/contact' }}
				/>
			</div>
		</section>
	);
}

interface Step {
	number: string;
	title: string;
	description: string;
	deliverables: string[];
}

interface CTA {
	label: string;
	href: string;
}

const CenteredProcess = ({
	eyebrow,
	title,
	description,
	steps,
	cta,
}: {
	eyebrow: string;
	title: string;
	description: string;
	steps: Step[];
	cta: CTA;
}) => (
	<div className="text-center">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
			{title}
		</h2>
		<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 @md:mb-16">
			{description}
		</p>

		{/* Steps */}
		<div className="space-y-8 @md:space-y-12 max-w-3xl mx-auto">
			{steps.map((step, i) => (
				<div key={i} className="relative">
					{/* Connector line */}
					{i < steps.length - 1 && (
						<div className="absolute left-1/2 top-full h-8 @md:h-12 w-px bg-border -translate-x-1/2" />
					)}

					<Card className="py-0 overflow-hidden">
						<div className="grid @md:grid-cols-3">
							{/* Number */}
							<div className="bg-primary/5 p-6 flex items-center justify-center @md:justify-start gap-4">
								<span className="text-4xl @md:text-5xl font-bold text-primary/30">
									{step.number}
								</span>
								<div className="text-left @md:hidden">
									<h3 className="text-xl font-bold">{step.title}</h3>
								</div>
							</div>

							{/* Content */}
							<CardContent className="@md:col-span-2 p-6 text-left">
								<h3 className="text-xl font-bold mb-2 hidden @md:block">
									{step.title}
								</h3>
								<p className="text-muted-foreground mb-4">{step.description}</p>
								<div className="flex flex-wrap gap-2">
									{step.deliverables.map((deliverable, j) => (
										<span
											key={j}
											className="text-xs px-2 py-1 bg-muted rounded-full flex items-center gap-1"
										>
											<Check className="size-3 text-primary" />
											{deliverable}
										</span>
									))}
								</div>
							</CardContent>
						</div>
					</Card>
				</div>
			))}
		</div>

		{/* CTA */}
		<div className="mt-12 @md:mt-16">
			<Button size="lg" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
