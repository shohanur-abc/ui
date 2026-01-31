'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ArrowRight,
	BarChart3,
	GitMerge,
	Layers,
	Settings,
	Users,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface TabItem {
	value: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	description: string;
	features: string[];
	imageSrc: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Layers} text="Product Features" />
					<Title text="Explore Our Powerful" highlight="Feature Set" />
					<Description text="Discover the tools and capabilities that make our platform the choice of industry leaders." />
				</div>

				<FeatureTabs
					items={[
						{
							value: 'analytics',
							icon: BarChart3,
							label: 'Analytics',
							title: 'Advanced Analytics Dashboard',
							description:
								'Get deep insights into your business performance with real-time data visualization and AI-powered recommendations.',
							features: [
								'Custom report builder',
								'Predictive analytics',
								'Export to multiple formats',
								'Scheduled reports',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
						},
						{
							value: 'automation',
							icon: Zap,
							label: 'Automation',
							title: 'Workflow Automation Engine',
							description:
								'Automate repetitive tasks and complex workflows with our visual builder and pre-built templates.',
							features: [
								'Drag-and-drop builder',
								'100+ pre-built templates',
								'Custom triggers',
								'Error handling',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
						},
						{
							value: 'collaboration',
							icon: Users,
							label: 'Collaboration',
							title: 'Team Collaboration Hub',
							description:
								'Work together seamlessly with shared workspaces, real-time editing, and integrated communication.',
							features: [
								'Real-time co-editing',
								'Threaded comments',
								'Version history',
								'Role-based access',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
						},
						{
							value: 'integrations',
							icon: GitMerge,
							label: 'Integrations',
							title: 'Seamless Integrations',
							description:
								'Connect with 500+ apps and services to create a unified workflow across your entire tech stack.',
							features: [
								'500+ integrations',
								'Custom API access',
								'Webhooks',
								'Zapier compatible',
							],
							imageSrc:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
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
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4 @md:mb-5">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const FeatureTabs = ({ items }: { items: TabItem[] }) => (
	<Tabs defaultValue={items[0].value} className="w-full">
		<TabsList className="w-full justify-start gap-1 bg-transparent h-auto p-0 mb-8 flex-wrap">
			{items.map((item) => (
				<TabsTrigger
					key={item.value}
					value={item.value}
					className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2.5 rounded-lg"
				>
					<item.icon className="size-4" />
					{item.label}
				</TabsTrigger>
			))}
		</TabsList>
		{items.map((item) => (
			<TabsContent key={item.value} value={item.value}>
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					<CardContent className="p-0">
						<div className="grid @xl:grid-cols-2">
							<div className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
								<h3 className="mb-3 text-xl @md:text-2xl font-bold">
									{item.title}
								</h3>
								<p className="mb-6 text-muted-foreground">{item.description}</p>
								<ul className="mb-6 space-y-2">
									{item.features.map((feature, index) => (
										<li key={index} className="flex items-center gap-2 text-sm">
											<div className="size-1.5 rounded-full bg-primary" />
											{feature}
										</li>
									))}
								</ul>
								<Button className="w-fit gap-2" asChild>
									<Link href={`/features/${item.value}`}>
										Learn More
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>
							<div className="relative aspect-video @xl:aspect-auto">
								<img
									src={item.imageSrc}
									alt={item.title}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		))}
	</Tabs>
);
