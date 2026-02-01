'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Code2, Palette, Rocket, Settings } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Expertise" />
					<Title text="Our Capabilities" />
					<Description text="Led by industry experts, our teams deliver exceptional results in every domain." />
				</div>

				<div className="max-w-4xl mx-auto">
					<ServiceAccordion
						items={[
							{
								icon: Palette,
								title: 'Product Design',
								lead: {
									name: 'Sarah Chen',
									role: 'Head of Design',
									avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
								},
								description:
									'Our design team creates user-centered experiences that drive engagement. We combine research, strategy, and creativity to deliver interfaces that convert.',
								stats: { projects: 150, years: 12 },
							},
							{
								icon: Code2,
								title: 'Software Engineering',
								lead: {
									name: 'Marcus Johnson',
									role: 'VP Engineering',
									avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
								},
								description:
									'Build robust, scalable software with our expert engineering team. We use modern technologies and best practices to deliver high-quality code.',
								stats: { projects: 200, years: 15 },
							},
							{
								icon: Settings,
								title: 'Platform Operations',
								lead: {
									name: 'Alex Rivera',
									role: 'Platform Director',
									avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
								},
								description:
									'Ensure reliability and performance with our platform team. We design and manage infrastructure that scales with your business.',
								stats: { projects: 80, years: 10 },
							},
							{
								icon: Rocket,
								title: 'Growth Strategy',
								lead: {
									name: 'Emma Davis',
									role: 'Growth Lead',
									avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
								},
								description:
									'Accelerate your growth with data-driven strategies. Our team helps you identify opportunities and execute winning initiatives.',
								stats: { projects: 120, years: 8 },
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
	lead: { name: string; role: string; avatar: string };
	description: string;
	stats: { projects: number; years: number };
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
	<Accordion type="single" collapsible className="w-full">
		{items.map(({ icon: Icon, title, lead, description, stats }, i) => (
			<AccordionItem key={i} value={`item-${i}`} className="border-b">
				<AccordionTrigger className="text-left hover:no-underline py-5">
					<div className="flex items-center gap-4 flex-1">
						<div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
							<Icon className="size-5 text-primary" />
						</div>
						<span className="text-base @md:text-lg font-semibold">{title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-6">
					<div className="pl-14 @md:pl-15">
						<p className="text-sm @md:text-base text-muted-foreground mb-6 leading-relaxed">
							{description}
						</p>

						<div className="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
							<div className="flex items-center gap-3">
								<Avatar className="size-10">
									<AvatarImage src={lead.avatar} alt={lead.name} />
									<AvatarFallback>
										{lead.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">{lead.name}</p>
									<p className="text-xs text-muted-foreground">{lead.role}</p>
								</div>
							</div>

							<div className="flex gap-6">
								<div className="text-center">
									<p className="text-lg @md:text-xl font-bold">
										{stats.projects}+
									</p>
									<p className="text-xs text-muted-foreground">Projects</p>
								</div>
								<div className="text-center">
									<p className="text-lg @md:text-xl font-bold">
										{stats.years}+
									</p>
									<p className="text-xs text-muted-foreground">Years Exp</p>
								</div>
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
