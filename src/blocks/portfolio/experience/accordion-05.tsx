'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Layers, CheckCircle } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Layers} text="Expertise" />
					<Title text="Project Experience" />
					<Description text="Major projects I've led and contributed to throughout my career." />
				</div>

				<ProjectAccordion
					items={[
						{
							id: 'p1',
							name: 'Design System Platform',
							company: 'Google',
							year: '2023',
							role: 'Tech Lead',
							impact: 'Unified 500+ components across 12 product teams',
							deliverables: [
								'Component library',
								'Documentation site',
								'Migration tooling',
								'Design tokens',
							],
						},
						{
							id: 'p2',
							name: 'Real-time Analytics Dashboard',
							company: 'Meta',
							year: '2021',
							role: 'Senior Engineer',
							impact: 'Reduced data latency from 5min to 10sec',
							deliverables: [
								'Streaming pipeline',
								'Visualization engine',
								'Alert system',
								'Custom queries',
							],
						},
						{
							id: 'p3',
							name: 'Payment Gateway Redesign',
							company: 'Stripe',
							year: '2019',
							role: 'Engineer',
							impact: 'Increased conversion rate by 23%',
							deliverables: [
								'Checkout flow',
								'Card validation',
								'Error handling',
								'A/B testing',
							],
						},
						{
							id: 'p4',
							name: 'Mobile App Launch',
							company: 'Startup',
							year: '2018',
							role: 'Full-stack Developer',
							impact: 'Acquired 100K users in first month',
							deliverables: [
								'React Native app',
								'API backend',
								'Push notifications',
								'Analytics',
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ProjectItem {
	id: string;
	name: string;
	company: string;
	year: string;
	role: string;
	impact: string;
	deliverables: string[];
}

const ProjectAccordion = ({ items }: { items: ProjectItem[] }) => (
	<div className="max-w-4xl mx-auto">
		<Accordion type="single" collapsible className="space-y-4">
			{items.map(({ id, name, company, year, role, impact, deliverables }) => (
				<AccordionItem key={id} value={id} className="border-0">
					<Card className="overflow-hidden">
						<AccordionTrigger className="hover:no-underline px-6 py-5">
							<div className="flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-6 text-left w-full">
								<div className="flex-1">
									<h3 className="text-lg font-semibold">{name}</h3>
									<p className="text-sm text-muted-foreground">{company}</p>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="text-xs">
										{role}
									</Badge>
									<Badge variant="outline" className="text-xs font-mono">
										{year}
									</Badge>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="px-6 pb-6">
							<div className="p-4 bg-muted/50 rounded-lg mb-4">
								<p className="text-sm font-medium">
									Impact:{' '}
									<span className="text-muted-foreground font-normal">
										{impact}
									</span>
								</p>
							</div>
							<h4 className="text-sm font-medium mb-3">Key Deliverables</h4>
							<div className="grid @sm:grid-cols-2 gap-2">
								{deliverables.map((deliverable, i) => (
									<div
										key={i}
										className="flex items-center gap-2 text-sm text-muted-foreground"
									>
										<CheckCircle className="size-4 text-primary shrink-0" />
										{deliverable}
									</div>
								))}
							</div>
						</AccordionContent>
					</Card>
				</AccordionItem>
			))}
		</Accordion>
	</div>
);
