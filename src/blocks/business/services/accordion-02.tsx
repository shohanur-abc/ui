'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, Cpu, Palette, Rocket, Settings } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Process" />
					<Title text="How We Work" />
					<Description text="A proven methodology that ensures successful project delivery every time." />
				</div>

				<div className="max-w-4xl mx-auto">
					<ProcessAccordion
						items={[
							{
								icon: Palette,
								step: 1,
								title: 'Discovery & Strategy',
								description:
									'We start by understanding your business, goals, and challenges through collaborative workshops and research.',
								deliverables: [
									'Stakeholder interviews',
									'Competitive analysis',
									'User research',
									'Project roadmap',
								],
							},
							{
								icon: Cpu,
								step: 2,
								title: 'Design & Prototyping',
								description:
									'Our design team creates intuitive interfaces and interactive prototypes that bring your vision to life.',
								deliverables: [
									'Wireframes',
									'Visual designs',
									'Interactive prototypes',
									'Design system',
								],
							},
							{
								icon: Settings,
								step: 3,
								title: 'Development & Testing',
								description:
									'We build your solution using modern technologies with rigorous testing at every stage.',
								deliverables: [
									'Sprint deliveries',
									'Code reviews',
									'Automated testing',
									'Performance optimization',
								],
							},
							{
								icon: Rocket,
								step: 4,
								title: 'Launch & Support',
								description:
									'We ensure a smooth launch and provide ongoing support to help your solution evolve.',
								deliverables: [
									'Deployment',
									'Training',
									'Documentation',
									'Ongoing maintenance',
								],
							},
						]}
					/>
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

interface ProcessItem {
	icon: ComponentType<{ className?: string }>;
	step: number;
	title: string;
	description: string;
	deliverables: string[];
}

const ProcessAccordion = ({ items }: { items: ProcessItem[] }) => (
	<Accordion type="single" collapsible className="w-full">
		{items.map(({ icon: Icon, step, title, description, deliverables }, i) => (
			<AccordionItem key={i} value={`item-${i}`}>
				<AccordionTrigger className="text-left hover:no-underline py-5">
					<div className="flex items-center gap-4">
						<div className="relative">
							<div className="size-12 @md:size-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
								<Icon className="size-5 @md:size-6" />
							</div>
							<span className="absolute -top-1 -right-1 size-6 rounded-full bg-secondary text-xs font-bold flex items-center justify-center border">
								{step}
							</span>
						</div>
						<span className="text-base @md:text-lg font-semibold">{title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pl-16 @md:pl-18">
					<Card className="py-0">
						<CardContent className="p-5 @md:p-6">
							<p className="text-sm @md:text-base text-muted-foreground mb-4 leading-relaxed">
								{description}
							</p>
							<div className="border-t pt-4">
								<h4 className="text-sm font-semibold mb-3">Deliverables</h4>
								<ul className="grid @sm:grid-cols-2 gap-2">
									{deliverables.map((item, j) => (
										<li key={j} className="flex items-center gap-2 text-sm">
											<Check className="size-4 text-primary shrink-0" />
											{item}
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
