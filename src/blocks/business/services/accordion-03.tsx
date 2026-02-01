'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, Layers, Palette, Rocket, Settings } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="Core Expertise" />
					<Description text="Deep specialization across four key areas that drive business transformation." />
				</div>

				<div className="max-w-4xl mx-auto">
					<ServiceAccordion
						items={[
							{
								icon: Palette,
								title: 'Design & Experience',
								description:
									'Create exceptional user experiences that drive engagement and conversion. Our design team combines research, strategy, and creativity to deliver interfaces that users love.',
								price: 'Starting at $10,000',
								href: '/services/design',
							},
							{
								icon: Settings,
								title: 'Engineering & Development',
								description:
									'Build robust, scalable software with our expert engineering team. From web applications to complex enterprise systems, we deliver code that performs.',
								price: 'Starting at $15,000',
								href: '/services/engineering',
							},
							{
								icon: Layers,
								title: 'Platform & Infrastructure',
								description:
									'Design and implement cloud infrastructure that scales with your business. We optimize for performance, security, and cost-efficiency.',
								price: 'Starting at $8,000',
								href: '/services/platform',
							},
							{
								icon: Rocket,
								title: 'Strategy & Consulting',
								description:
									'Navigate digital transformation with expert guidance. We help you define strategy, identify opportunities, and execute winning initiatives.',
								price: 'Starting at $5,000',
								href: '/services/strategy',
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	price: string;
	href: string;
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
	<Accordion type="single" collapsible className="w-full space-y-3">
		{items.map(({ icon: Icon, title, description, price, href }, i) => (
			<AccordionItem
				key={i}
				value={`item-${i}`}
				className="border rounded-xl px-5 @md:px-6 data-[state=open]:bg-muted/50 transition-colors"
			>
				<AccordionTrigger className="text-left hover:no-underline py-5">
					<div className="flex items-center gap-4">
						<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
							<Icon className="size-5 @md:size-6 text-primary" />
						</div>
						<div>
							<span className="block text-base @md:text-lg font-semibold">
								{title}
							</span>
							<span className="block text-sm text-muted-foreground mt-0.5">
								{price}
							</span>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-5">
					<p className="text-sm @md:text-base text-muted-foreground mb-4 leading-relaxed pl-15 @md:pl-16">
						{description}
					</p>
					<div className="pl-15 @md:pl-16">
						<Button variant="outline" size="sm" asChild>
							<Link href={href}>
								Learn more
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
