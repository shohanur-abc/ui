'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	ArrowRight,
	Briefcase,
	GraduationCap,
	Heart,
	ShoppingBag,
	Stethoscope,
	Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Industries" />
					<Title text="Industry Solutions" />
					<Description text="Specialized services tailored to the unique needs of each industry." />
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<IndustryAccordion
						items={[
							{
								icon: Wallet,
								title: 'Financial Services',
								tagline: 'Secure, compliant solutions',
								services: [
									'Digital Banking',
									'Payment Processing',
									'Risk Management',
									'Regulatory Compliance',
								],
								href: '/industries/finance',
							},
							{
								icon: Stethoscope,
								title: 'Healthcare',
								tagline: 'Patient-centered technology',
								services: [
									'EHR Integration',
									'Telemedicine',
									'Patient Portals',
									'HIPAA Compliance',
								],
								href: '/industries/healthcare',
							},
							{
								icon: ShoppingBag,
								title: 'Retail & E-commerce',
								tagline: 'Omnichannel experiences',
								services: [
									'E-commerce Platforms',
									'Inventory Management',
									'Customer Analytics',
									'POS Systems',
								],
								href: '/industries/retail',
							},
						]}
					/>

					<IndustryAccordion
						items={[
							{
								icon: GraduationCap,
								title: 'Education',
								tagline: 'Learning innovation',
								services: [
									'LMS Development',
									'Virtual Classrooms',
									'Student Portals',
									'EdTech Integration',
								],
								href: '/industries/education',
							},
							{
								icon: Briefcase,
								title: 'Professional Services',
								tagline: 'Operational excellence',
								services: [
									'CRM Systems',
									'Project Management',
									'Document Automation',
									'Client Portals',
								],
								href: '/industries/professional',
							},
							{
								icon: Heart,
								title: 'Non-Profit',
								tagline: 'Mission-driven solutions',
								services: [
									'Donor Management',
									'Volunteer Coordination',
									'Impact Reporting',
									'Grant Tracking',
								],
								href: '/industries/nonprofit',
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

interface IndustryItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	tagline: string;
	services: string[];
	href: string;
}

const IndustryAccordion = ({ items }: { items: IndustryItem[] }) => (
	<div className="bg-card border rounded-2xl p-5 @md:p-6">
		<Accordion type="single" collapsible className="w-full">
			{items.map(({ icon: Icon, title, tagline, services, href }, i) => (
				<AccordionItem key={i} value={`item-${i}`}>
					<AccordionTrigger className="text-left hover:no-underline py-4">
						<div className="flex items-center gap-4">
							<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
								<Icon className="size-5 @md:size-6 text-primary" />
							</div>
							<div>
								<span className="block text-base @md:text-lg font-semibold">
									{title}
								</span>
								<span className="block text-sm text-muted-foreground">
									{tagline}
								</span>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-4">
						<div className="pl-15 @md:pl-16">
							<ul className="grid grid-cols-2 gap-2 mb-4">
								{services.map((service, j) => (
									<li key={j} className="flex items-center gap-2 text-sm">
										<div className="size-1.5 rounded-full bg-primary shrink-0" />
										{service}
									</li>
								))}
							</ul>
							<Button
								variant="ghost"
								size="sm"
								className="p-0 h-auto text-primary"
								asChild
							>
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
	</div>
);
