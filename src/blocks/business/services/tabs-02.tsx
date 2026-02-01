'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Code2, Palette, Rocket } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="How We Help" />
					<Description text="Choose the service that best fits your needs and goals." />
				</div>

				<ServiceTabs
					items={[
						{
							id: 'design',
							icon: Palette,
							label: 'Design',
							title: 'Product Design',
							description:
								'We create beautiful, intuitive interfaces that users love. Our design process is rooted in research and focused on delivering measurable results.',
							metrics: [
								{ value: '200+', label: 'Products Designed' },
								{ value: '95%', label: 'Client Satisfaction' },
								{ value: '3x', label: 'Avg. Conversion Lift' },
							],
							href: '/services/design',
						},
						{
							id: 'development',
							icon: Code2,
							label: 'Development',
							title: 'Software Development',
							description:
								'From web apps to mobile solutions, we build software that performs. Our engineering team uses modern technologies and proven methodologies.',
							metrics: [
								{ value: '500+', label: 'Projects Delivered' },
								{ value: '99.9%', label: 'Uptime SLA' },
								{ value: '40%', label: 'Faster Time-to-Market' },
							],
							href: '/services/development',
						},
						{
							id: 'analytics',
							icon: BarChart3,
							label: 'Analytics',
							title: 'Data Analytics',
							description:
								'Turn your data into competitive advantage. We help you collect, process, and visualize data to make better business decisions.',
							metrics: [
								{ value: '10B+', label: 'Events Processed' },
								{ value: '50+', label: 'Dashboards Built' },
								{ value: '25%', label: 'Avg. Cost Reduction' },
							],
							href: '/services/analytics',
						},
						{
							id: 'growth',
							icon: Rocket,
							label: 'Growth',
							title: 'Growth Strategy',
							description:
								'Accelerate your business growth with data-driven strategies. We help you identify opportunities and execute winning campaigns.',
							metrics: [
								{ value: '150+', label: 'Clients Served' },
								{ value: '10M+', label: 'Revenue Generated' },
								{ value: '5x', label: 'Avg. ROI' },
							],
							href: '/services/growth',
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

interface MetricItem {
	value: string;
	label: string;
}

interface ServiceItem {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	description: string;
	metrics: MetricItem[];
	href: string;
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
					<span>{label}</span>
				</TabsTrigger>
			))}
		</TabsList>

		{items.map(({ id, title, description, metrics, href }) => (
			<TabsContent key={id} value={id}>
				<Card className="py-0">
					<CardContent className="p-6 @md:p-8 @xl:p-10">
						<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
							<div>
								<h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">
									{title}
								</h3>
								<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6">
									{description}
								</p>
								<Button size="lg" asChild>
									<Link href={href}>
										Get Started
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>
							<div className="grid grid-cols-3 gap-4">
								{metrics.map(({ value, label }, i) => (
									<div
										key={i}
										className="text-center p-4 bg-muted/50 rounded-xl"
									>
										<div className="text-2xl @md:text-3xl font-bold text-primary mb-1">
											{value}
										</div>
										<div className="text-xs @md:text-sm text-muted-foreground">
											{label}
										</div>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		))}
	</Tabs>
);
