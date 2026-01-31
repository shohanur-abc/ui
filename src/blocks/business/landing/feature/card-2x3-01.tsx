import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Layers } from 'lucide-react';
import Link from 'next/link';

interface FeatureItem {
	title: string;
	description: string;
	features: string[];
	href: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6">
					<div className="max-w-2xl">
						<Eyebrow icon={Layers} text="Product Modules" />
						<Title text="Modular Solutions for" highlight="Every Need" />
						<Description text="Pick and choose the modules that fit your requirements. Scale up as you grow." />
					</div>
				</div>

				<Card2x3Grid
					items={[
						{
							title: 'Sales Hub',
							description:
								'Complete CRM with pipeline management and forecasting.',
							features: [
								'Lead tracking',
								'Deal management',
								'Revenue analytics',
							],
							href: '/products/sales',
						},
						{
							title: 'Marketing Hub',
							description: 'Campaign automation and multi-channel marketing.',
							features: ['Email campaigns', 'Landing pages', 'A/B testing'],
							href: '/products/marketing',
						},
						{
							title: 'Service Hub',
							description:
								'Customer support with ticketing and knowledge base.',
							features: ['Help desk', 'Live chat', 'Customer portal'],
							href: '/products/service',
						},
						{
							title: 'Operations Hub',
							description: 'Data sync and process automation tools.',
							features: [
								'Data quality',
								'Programmable automation',
								'Reporting',
							],
							href: '/products/operations',
						},
						{
							title: 'Commerce Hub',
							description: 'Payment processing and subscription management.',
							features: ['Invoicing', 'Quotes', 'Payment links'],
							href: '/products/commerce',
						},
						{
							title: 'Content Hub',
							description: 'CMS and content management for your team.',
							features: ['Website builder', 'SEO tools', 'Content analytics'],
							href: '/products/content',
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
	icon: typeof Layers;
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

const Card2x3Grid = ({ items }: { items: FeatureItem[] }) => (
	<div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
		{items.map((item) => (
			<Card
				key={item.title}
				className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md flex flex-col"
			>
				<CardContent className="p-5 @md:p-6 flex flex-col flex-1">
					<h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
					<p className="mb-4 text-sm text-muted-foreground">
						{item.description}
					</p>
					<ul className="mb-4 space-y-2 flex-1">
						{item.features.map((feature) => (
							<li key={feature} className="flex items-center gap-2 text-sm">
								<CheckCircle className="size-4 text-primary shrink-0" />
								{feature}
							</li>
						))}
					</ul>
					<Button
						variant="ghost"
						className="w-full gap-2 mt-auto group-hover:bg-primary/5"
						asChild
					>
						<Link href={item.href}>
							Learn More
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);
