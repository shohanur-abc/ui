'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Globe, Rocket, Users2 } from 'lucide-react';
import { ComponentType } from 'react';

interface StatItem {
	value: string;
	label: string;
}

interface TabItem {
	value: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	description: string;
	stats: StatItem[];
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-start">
					<div>
						<Eyebrow icon={Building2} text="Solutions by Industry" />
						<Title text="Tailored for Your" highlight="Industry Needs" />
						<Description text="Our platform adapts to the unique requirements of different industries, with specialized features and compliance built-in." />
					</div>

					<IndustryTabs
						items={[
							{
								value: 'technology',
								icon: Rocket,
								label: 'Technology',
								title: 'For Tech Companies',
								description:
									'Accelerate product development with CI/CD integration, API management, and developer-first tools.',
								stats: [
									{ value: '3x', label: 'Faster Releases' },
									{ value: '60%', label: 'Less Downtime' },
								],
							},
							{
								value: 'enterprise',
								icon: Building2,
								label: 'Enterprise',
								title: 'For Enterprises',
								description:
									'Enterprise-grade security, compliance automation, and dedicated support for large organizations.',
								stats: [
									{ value: '99.99%', label: 'Uptime SLA' },
									{ value: 'SOC 2', label: 'Certified' },
								],
							},
							{
								value: 'agency',
								icon: Users2,
								label: 'Agencies',
								title: 'For Agencies',
								description:
									'Manage multiple clients, white-label solutions, and streamlined project handoffs.',
								stats: [
									{ value: '500+', label: 'Agencies Trust Us' },
									{ value: '40%', label: 'Time Saved' },
								],
							},
							{
								value: 'global',
								icon: Globe,
								label: 'Global',
								title: 'For Global Teams',
								description:
									'Multi-region deployment, localization support, and global CDN for worldwide performance.',
								stats: [
									{ value: '200+', label: 'Edge Locations' },
									{ value: '<50ms', label: 'Global Latency' },
								],
							},
						]}
					/>
				</div>
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
		<Badge variant="outline" className="gap-2">
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

const IndustryTabs = ({ items }: { items: TabItem[] }) => (
	<Tabs defaultValue={items[0].value} className="w-full">
		<TabsList className="w-full grid grid-cols-4 h-auto p-1 mb-6">
			{items.map((item) => (
				<TabsTrigger
					key={item.value}
					value={item.value}
					className="flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				>
					<item.icon className="size-5" />
					<span className="text-xs">{item.label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		{items.map((item) => (
			<TabsContent key={item.value} value={item.value}>
				<Card className="border-border/50">
					<CardContent className="p-6">
						<h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
						<p className="mb-6 text-muted-foreground">{item.description}</p>
						<div className="grid grid-cols-2 gap-4">
							{item.stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-lg bg-primary/5 p-4 text-center"
								>
									<p className="text-2xl font-bold text-primary">
										{stat.value}
									</p>
									<p className="text-sm text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		))}
	</Tabs>
);
