'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="relative aspect-square @xl:aspect-4/5 rounded-2xl overflow-hidden">
						<Image
							src="https://picsum.photos/seed/services-acc/800/900"
							alt="Our services"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
					</div>

					<div>
						<Eyebrow text="Services" />
						<Title text="Comprehensive Solutions" />
						<Description text="Everything you need to build and scale digital products." />

						<div className="mt-8">
							<ServiceAccordion
								items={[
									{
										title: 'Product Strategy',
										description:
											'Define your product vision and create a roadmap for success with our strategic consulting services.',
										features: [
											'Market research',
											'Competitive analysis',
											'Product roadmap',
											'Go-to-market strategy',
										],
									},
									{
										title: 'Design & UX',
										description:
											'Create beautiful, intuitive interfaces that users love with our comprehensive design services.',
										features: [
											'User research',
											'Wireframing',
											'Visual design',
											'Prototyping',
										],
									},
									{
										title: 'Development',
										description:
											'Build robust, scalable applications with our expert engineering team using modern technologies.',
										features: [
											'Web development',
											'Mobile apps',
											'API development',
											'Cloud infrastructure',
										],
									},
									{
										title: 'Growth & Optimization',
										description:
											'Accelerate growth and optimize performance with data-driven strategies and continuous improvement.',
										features: [
											'Analytics setup',
											'A/B testing',
											'Performance tuning',
											'SEO optimization',
										],
									},
								]}
							/>
						</div>
					</div>
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
	title: string;
	description: string;
	features: string[];
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
	<Accordion type="single" collapsible defaultValue="item-0" className="w-full">
		{items.map(({ title, description, features }, i) => (
			<AccordionItem key={i} value={`item-${i}`}>
				<AccordionTrigger className="text-left text-base @md:text-lg font-semibold hover:no-underline py-4">
					{title}
				</AccordionTrigger>
				<AccordionContent>
					<p className="text-sm @md:text-base text-muted-foreground mb-4 leading-relaxed">
						{description}
					</p>
					<ul className="grid @sm:grid-cols-2 gap-2">
						{features.map((feature, j) => (
							<li key={j} className="flex items-center gap-2 text-sm">
								<Check className="size-4 text-primary shrink-0" />
								{feature}
							</li>
						))}
					</ul>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
