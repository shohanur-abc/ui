'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Packages" />
					<Title text="Service Tiers" />
					<Description text="Choose the package that best fits your needs and budget." />
				</div>

				<div className="max-w-4xl mx-auto">
					<TierAccordion
						items={[
							{
								tier: 'Starter',
								price: '$5,000',
								period: 'project',
								description:
									'Perfect for small businesses getting started with digital transformation.',
								features: [
									'Basic website design',
									'Mobile responsive',
									'Content management',
									'3 months support',
									'Email integration',
								],
								highlighted: false,
								href: '/contact',
							},
							{
								tier: 'Professional',
								price: '$15,000',
								period: 'project',
								description:
									'Comprehensive solution for growing businesses with custom requirements.',
								features: [
									'Custom web application',
									'API integrations',
									'Database design',
									'6 months support',
									'Analytics dashboard',
									'Performance optimization',
								],
								highlighted: true,
								href: '/contact',
							},
							{
								tier: 'Enterprise',
								price: '$50,000+',
								period: 'project',
								description:
									'Full-scale digital solutions for large organizations with complex needs.',
								features: [
									'Enterprise architecture',
									'Multi-platform development',
									'Cloud infrastructure',
									'12 months support',
									'Dedicated team',
									'SLA guarantee',
									'24/7 monitoring',
								],
								highlighted: false,
								href: '/contact',
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

interface TierItem {
	tier: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	highlighted: boolean;
	href: string;
}

const TierAccordion = ({ items }: { items: TierItem[] }) => (
	<Accordion
		type="single"
		collapsible
		defaultValue="item-1"
		className="w-full space-y-3"
	>
		{items.map(
			(
				{ tier, price, period, description, features, highlighted, href },
				i,
			) => (
				<AccordionItem
					key={i}
					value={`item-${i}`}
					className={`border rounded-2xl px-5 @md:px-6 overflow-hidden ${
						highlighted ? 'border-primary bg-primary/5' : ''
					}`}
				>
					<AccordionTrigger className="text-left hover:no-underline py-5">
						<div className="flex items-center justify-between flex-1 pr-4">
							<div className="flex items-center gap-4">
								<span className="text-base @md:text-lg font-semibold">
									{tier}
								</span>
								{highlighted && <Badge className="text-xs">Popular</Badge>}
							</div>
							<div className="text-right">
								<span className="text-lg @md:text-xl font-bold">{price}</span>
								<span className="text-sm text-muted-foreground">/{period}</span>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-6">
						<p className="text-sm @md:text-base text-muted-foreground mb-5 leading-relaxed">
							{description}
						</p>

						<ul className="grid @sm:grid-cols-2 gap-2 mb-6">
							{features.map((feature, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
									{feature}
								</li>
							))}
						</ul>

						<Button className="w-full @sm:w-auto" asChild>
							<Link href={href}>
								Get started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
