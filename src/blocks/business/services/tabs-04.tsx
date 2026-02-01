'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Rocket, Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-3 gap-8 @xl:gap-12">
					<div className="@xl:col-span-1">
						<Eyebrow text="Packages" />
						<Title text="Service Tiers" />
						<Description text="Choose the engagement model that fits your needs and budget." />
					</div>

					<div className="@xl:col-span-2">
						<PackageTabs
							items={[
								{
									id: 'starter',
									icon: Zap,
									label: 'Starter',
									title: 'Starter Package',
									price: '$5,000',
									period: 'per project',
									description:
										'Perfect for small projects and startups looking to validate ideas quickly.',
									includes: [
										'Up to 4 weeks of development',
										'Single platform (web or mobile)',
										'Basic design and UX',
										'Email support',
										'30-day warranty',
									],
									href: '/contact?package=starter',
								},
								{
									id: 'professional',
									icon: Settings,
									label: 'Professional',
									title: 'Professional Package',
									price: '$15,000',
									period: 'per project',
									description:
										'Ideal for growing businesses needing comprehensive solutions.',
									includes: [
										'Up to 12 weeks of development',
										'Multi-platform support',
										'Advanced design and UX',
										'Priority support',
										'90-day warranty',
										'Performance optimization',
									],
									href: '/contact?package=professional',
								},
								{
									id: 'enterprise',
									icon: Layers,
									label: 'Enterprise',
									title: 'Enterprise Package',
									price: 'Custom',
									period: 'tailored pricing',
									description:
										'Full-service engagement for complex enterprise requirements.',
									includes: [
										'Unlimited project scope',
										'Dedicated team',
										'Custom design systems',
										'24/7 dedicated support',
										'Extended warranty',
										'SLA guarantees',
										'On-site workshops',
									],
									href: '/contact?package=enterprise',
								},
								{
									id: 'retainer',
									icon: Rocket,
									label: 'Retainer',
									title: 'Monthly Retainer',
									price: '$10,000',
									period: 'per month',
									description:
										'Ongoing partnership for continuous development and support.',
									includes: [
										'80+ hours per month',
										'Dedicated resources',
										'Flexible priorities',
										'Weekly check-ins',
										'Continuous delivery',
										'Priority scheduling',
									],
									href: '/contact?package=retainer',
								},
							]}
						/>
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

interface PackageItem {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	price: string;
	period: string;
	description: string;
	includes: string[];
	href: string;
}

const PackageTabs = ({ items }: { items: PackageItem[] }) => (
	<Tabs defaultValue={items[0].id} className="w-full">
		<TabsList className="w-full h-auto grid grid-cols-2 @md:grid-cols-4 gap-1 p-1.5 mb-6">
			{items.map(({ id, icon: Icon, label }) => (
				<TabsTrigger
					key={id}
					value={id}
					className="gap-2 py-2.5 data-[state=active]:shadow-md"
				>
					<Icon className="size-4" />
					<span>{label}</span>
				</TabsTrigger>
			))}
		</TabsList>

		{items.map(({ id, title, price, period, description, includes, href }) => (
			<TabsContent key={id} value={id}>
				<Card className="py-0">
					<CardContent className="p-6 @md:p-8">
						<div className="mb-6">
							<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
							<div className="flex items-baseline gap-2 mb-3">
								<span className="text-3xl @md:text-4xl font-bold text-primary">
									{price}
								</span>
								<span className="text-sm text-muted-foreground">{period}</span>
							</div>
							<p className="text-sm @md:text-base text-muted-foreground">
								{description}
							</p>
						</div>
						<ul className="space-y-2.5 mb-6">
							{includes.map((item, i) => (
								<li
									key={i}
									className="flex items-center gap-2 text-sm @md:text-base"
								>
									<div className="size-1.5 rounded-full bg-primary shrink-0" />
									{item}
								</li>
							))}
						</ul>
						<Button className="w-full" size="lg" asChild>
							<Link href={href}>
								Get Started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			</TabsContent>
		))}
	</Tabs>
);
