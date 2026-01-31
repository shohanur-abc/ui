'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Building, Rocket, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface TabItem {
	value: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	content: {
		title: string;
		description: string;
		features: string[];
		imageSrc: string;
	};
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Zap} text="Use Cases" />
					<Title text="Built for Teams of" highlight="All Sizes" />
					<Description text="Whether you're a startup or enterprise, our platform adapts to your needs." />
				</div>

				<UseCaseTabs
					items={[
						{
							value: 'startups',
							icon: Rocket,
							label: 'Startups',
							content: {
								title: 'Move Fast, Stay Lean',
								description:
									'Built for speed and agility. Ship features faster with less overhead.',
								features: [
									'Quick setup in minutes',
									'Affordable pricing',
									'Scale as you grow',
									'No vendor lock-in',
								],
								imageSrc:
									'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
							},
						},
						{
							value: 'teams',
							icon: Users,
							label: 'Teams',
							content: {
								title: 'Collaborate Seamlessly',
								description:
									'Tools designed for team productivity and transparent communication.',
								features: [
									'Real-time collaboration',
									'Shared workspaces',
									'Role-based access',
									'Team analytics',
								],
								imageSrc:
									'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
							},
						},
						{
							value: 'enterprise',
							icon: Building,
							label: 'Enterprise',
							content: {
								title: 'Scale with Confidence',
								description:
									'Enterprise-grade security and compliance for large organizations.',
								features: [
									'SSO & SAML',
									'Custom SLAs',
									'Dedicated support',
									'On-premise option',
								],
								imageSrc:
									'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
							},
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
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const UseCaseTabs = ({ items }: { items: TabItem[] }) => (
	<Tabs defaultValue={items[0].value} className="w-full">
		<TabsList className="w-full justify-center gap-2 bg-transparent h-auto p-0 mb-8">
			{items.map((item) => (
				<TabsTrigger
					key={item.value}
					value={item.value}
					className="gap-2 px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=active]:border-primary"
				>
					<item.icon className="size-4" />
					{item.label}
				</TabsTrigger>
			))}
		</TabsList>
		{items.map((item) => (
			<TabsContent key={item.value} value={item.value}>
				<div className="grid gap-8 @xl:grid-cols-2 items-center">
					<div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-xl">
						<img
							src={item.content.imageSrc}
							alt={item.content.title}
							className="w-full aspect-video object-cover"
						/>
					</div>
					<div>
						<h3 className="mb-3 text-2xl @md:text-3xl font-bold">
							{item.content.title}
						</h3>
						<p className="mb-6 text-muted-foreground">
							{item.content.description}
						</p>
						<ul className="mb-6 grid gap-2 @sm:grid-cols-2">
							{item.content.features.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm">
									<div className="size-1.5 rounded-full bg-primary" />
									{feature}
								</li>
							))}
						</ul>
						<Button className="gap-2" asChild>
							<Link href={`/solutions/${item.value}`}>
								Learn More
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</TabsContent>
		))}
	</Tabs>
);
