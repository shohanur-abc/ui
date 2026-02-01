'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Cloud, Code2, Database, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
					<div className="@xl:sticky @xl:top-8">
						<Eyebrow text="Services" />
						<Title text="What We Offer" />
						<Description text="Explore our comprehensive range of services designed to help your business thrive in the digital landscape." />
					</div>

					<ServiceAccordion
						items={[
							{
								icon: Code2,
								title: 'Software Development',
								description:
									'Custom software solutions built with modern technologies and best practices. We specialize in web applications, mobile apps, and enterprise systems.',
								features: [
									'Full-stack web development',
									'Mobile app development',
									'API design and development',
									'Legacy system modernization',
								],
							},
							{
								icon: Cloud,
								title: 'Cloud Services',
								description:
									'Comprehensive cloud solutions from migration to optimization. We help you leverage the full potential of cloud computing platforms.',
								features: [
									'Cloud migration strategy',
									'Infrastructure as Code',
									'Multi-cloud management',
									'Cost optimization',
								],
							},
							{
								icon: Database,
								title: 'Data Solutions',
								description:
									'Transform your data into actionable insights with our comprehensive data engineering and analytics services.',
								features: [
									'Data pipeline development',
									'Real-time analytics',
									'Data warehousing',
									'Machine learning integration',
								],
							},
							{
								icon: Shield,
								title: 'Cybersecurity',
								description:
									'Protect your digital assets with enterprise-grade security solutions and comprehensive protection strategies.',
								features: [
									'Security assessments',
									'Penetration testing',
									'Compliance consulting',
									'Incident response',
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	features: string[];
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
	<Accordion type="single" collapsible className="w-full">
		{items.map(({ icon: Icon, title, description, features }, i) => (
			<AccordionItem key={i} value={`item-${i}`}>
				<AccordionTrigger className="text-left hover:no-underline group py-5">
					<div className="flex items-center gap-4">
						<div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-5" />
						</div>
						<span className="text-base @md:text-lg font-semibold">{title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pl-14 @md:pl-15">
					<p className="text-sm @md:text-base text-muted-foreground mb-4 leading-relaxed">
						{description}
					</p>
					<ul className="space-y-2">
						{features.map((feature, j) => (
							<li
								key={j}
								className="flex items-center gap-2 text-sm @md:text-base"
							>
								<div className="size-1.5 rounded-full bg-primary shrink-0" />
								{feature}
							</li>
						))}
					</ul>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
