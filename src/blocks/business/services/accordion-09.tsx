'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Case Studies" />
					<Title text="Services in Action" />
					<Description text="See how our services have helped businesses achieve their goals." />
				</div>

				<div className="max-w-5xl mx-auto">
					<CaseStudyAccordion
						items={[
							{
								client: 'TechCorp Solutions',
								industry: 'Technology',
								service: 'Digital Transformation',
								image: 'https://picsum.photos/seed/case1/600/400',
								challenge:
									'Legacy systems were slowing down operations and preventing growth.',
								solution:
									'Complete platform modernization with cloud migration and process automation.',
								results: [
									{ metric: '60%', label: 'Cost Reduction' },
									{ metric: '3x', label: 'Faster Deployment' },
									{ metric: '99.9%', label: 'Uptime' },
								],
							},
							{
								client: 'HealthFirst Medical',
								industry: 'Healthcare',
								service: 'Custom Development',
								image: 'https://picsum.photos/seed/case2/600/400',
								challenge:
									'Needed a patient management system compliant with healthcare regulations.',
								solution:
									'Built a HIPAA-compliant platform with real-time data sync and reporting.',
								results: [
									{ metric: '40%', label: 'Time Saved' },
									{ metric: '100%', label: 'Compliance' },
									{ metric: '5,000+', label: 'Patients Managed' },
								],
							},
							{
								client: 'Global Retail Co',
								industry: 'E-commerce',
								service: 'Platform Optimization',
								image: 'https://picsum.photos/seed/case3/600/400',
								challenge:
									"E-commerce platform couldn't handle peak traffic during sales.",
								solution:
									'Implemented scalable architecture with CDN and caching strategies.',
								results: [
									{ metric: '300%', label: 'Traffic Capacity' },
									{ metric: '2s', label: 'Load Time' },
									{ metric: '$2M', label: 'Revenue Saved' },
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

interface CaseStudyItem {
	client: string;
	industry: string;
	service: string;
	image: string;
	challenge: string;
	solution: string;
	results: { metric: string; label: string }[];
}

const CaseStudyAccordion = ({ items }: { items: CaseStudyItem[] }) => (
	<Accordion type="single" collapsible className="w-full space-y-4">
		{items.map(
			(
				{ client, industry, service, image, challenge, solution, results },
				i,
			) => (
				<AccordionItem
					key={i}
					value={`item-${i}`}
					className="border rounded-2xl overflow-hidden"
				>
					<AccordionTrigger className="text-left hover:no-underline px-5 @md:px-6 py-5">
						<div className="flex items-center gap-4 flex-1">
							<div className="size-12 @md:size-14 rounded-xl bg-muted overflow-hidden shrink-0 relative">
								<Image src={image} alt={client} fill className="object-cover" />
							</div>
							<div className="flex-1">
								<span className="block text-base @md:text-lg font-semibold">
									{client}
								</span>
								<span className="block text-sm text-muted-foreground">
									{industry} • {service}
								</span>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-5 @md:px-6 pb-6">
						<div className="grid @lg:grid-cols-2 gap-6">
							<div className="relative aspect-video rounded-xl overflow-hidden">
								<Image src={image} alt={client} fill className="object-cover" />
							</div>

							<div className="space-y-4">
								<Card className="py-0">
									<CardContent className="p-4">
										<h4 className="text-sm font-semibold mb-1">Challenge</h4>
										<p className="text-sm text-muted-foreground">{challenge}</p>
									</CardContent>
								</Card>

								<Card className="py-0">
									<CardContent className="p-4">
										<h4 className="text-sm font-semibold mb-1">Solution</h4>
										<p className="text-sm text-muted-foreground">{solution}</p>
									</CardContent>
								</Card>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4 mt-6">
							{results.map(({ metric, label }, j) => (
								<div
									key={j}
									className="text-center p-4 bg-primary/5 rounded-xl"
								>
									<p className="text-xl @md:text-2xl font-bold text-primary">
										{metric}
									</p>
									<p className="text-xs @md:text-sm text-muted-foreground">
										{label}
									</p>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
