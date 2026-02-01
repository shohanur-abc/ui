'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Cloud, Code2, Database, Shield } from 'lucide-react';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Services" />
					<Title text="Specialized Solutions" />
					<Description text="Explore our comprehensive suite of services designed to meet your specific needs." />
				</div>

				<ServiceTabs
					items={[
						{
							id: 'development',
							icon: Code2,
							label: 'Development',
							title: 'Software Development',
							description:
								'Custom software solutions built with modern technologies and best practices. We deliver scalable, maintainable applications that drive business value.',
							features: [
								'Full-stack web applications',
								'Mobile app development',
								'API design and development',
								'Microservices architecture',
							],
							image: 'https://picsum.photos/seed/dev1/800/500',
						},
						{
							id: 'cloud',
							icon: Cloud,
							label: 'Cloud',
							title: 'Cloud Services',
							description:
								'Comprehensive cloud solutions from migration to optimization. We help you leverage the full potential of cloud computing.',
							features: [
								'Cloud migration strategy',
								'Infrastructure as Code',
								'Multi-cloud management',
								'Cost optimization',
							],
							image: 'https://picsum.photos/seed/cloud1/800/500',
						},
						{
							id: 'data',
							icon: Database,
							label: 'Data',
							title: 'Data Engineering',
							description:
								'Transform raw data into actionable insights with our data engineering and analytics services.',
							features: [
								'Data pipeline development',
								'Real-time analytics',
								'Data warehousing',
								'Machine learning integration',
							],
							image: 'https://picsum.photos/seed/data1/800/500',
						},
						{
							id: 'security',
							icon: Shield,
							label: 'Security',
							title: 'Cybersecurity',
							description:
								'Protect your digital assets with our comprehensive security services and solutions.',
							features: [
								'Security assessments',
								'Penetration testing',
								'Compliance consulting',
								'Incident response',
							],
							image: 'https://picsum.photos/seed/sec1/800/500',
						},
					]}
				/>
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
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	description: string;
	features: string[];
	image: string;
}

const ServiceTabs = ({ items }: { items: ServiceItem[] }) => (
	<Tabs defaultValue={items[0].id} className="w-full">
		<TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
			{items.map(({ id, icon: Icon, label }) => (
				<TabsTrigger
					key={id}
					value={id}
					className="gap-2 px-4 py-2.5 data-[state=active]:shadow-md"
				>
					<Icon className="size-4" />
					<span className="hidden @sm:inline">{label}</span>
				</TabsTrigger>
			))}
		</TabsList>

		{items.map(({ id, title, description, features, image }) => (
			<TabsContent key={id} value={id}>
				<Card className="overflow-hidden py-0">
					<div className="grid @xl:grid-cols-2">
						<CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
							<h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">
								{title}
							</h3>
							<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-5 @md:mb-6">
								{description}
							</p>
							<ul className="space-y-2.5 @md:space-y-3">
								{features.map((feature, i) => (
									<li
										key={i}
										className="flex items-center gap-2.5 text-sm @md:text-base"
									>
										<Check className="size-4 @md:size-5 text-primary shrink-0" />
										{feature}
									</li>
								))}
							</ul>
						</CardContent>
						<div className="relative aspect-video @xl:aspect-auto @xl:min-h-[400px]">
							<Image src={image} alt={title} fill className="object-cover" />
						</div>
					</div>
				</Card>
			</TabsContent>
		))}
	</Tabs>
);
