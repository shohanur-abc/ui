import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Code2,
	ExternalLink,
	Layers,
	Palette,
	Rocket,
	Server,
	Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<TextContent
						eyebrow="What I Offer"
						title="End-to-End Development Services"
						description="From initial concept to final deployment, I provide comprehensive development solutions tailored to your needs."
						cta={{
							primary: { label: 'Start a Project', href: '#contact' },
							secondary: { label: 'View Portfolio', href: '#work' },
						}}
					/>

					<ServicesList
						services={[
							{
								icon: Code2,
								title: 'Frontend Development',
								description: 'React, Next.js, TypeScript applications',
								features: ['Responsive Design', 'Accessibility', 'Performance'],
							},
							{
								icon: Server,
								title: 'Backend Development',
								description: 'Scalable APIs and services',
								features: [
									'REST & GraphQL',
									'Database Design',
									'Authentication',
								],
							},
							{
								icon: Palette,
								title: 'UI/UX Design',
								description: 'User-centered design solutions',
								features: ['Wireframing', 'Prototyping', 'Design Systems'],
							},
							{
								icon: Layers,
								title: 'Full Stack Solutions',
								description: 'Complete web applications',
								features: ['E-commerce', 'SaaS Platforms', 'Dashboards'],
							},
							{
								icon: Rocket,
								title: 'Performance Optimization',
								description: 'Speed and efficiency improvements',
								features: ['Core Web Vitals', 'Caching', 'CDN Setup'],
							},
							{
								icon: Sparkles,
								title: 'AI Integration',
								description: 'Smart features with AI',
								features: ['Chatbots', 'Recommendations', 'Automation'],
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface TextContentProps {
	eyebrow: string;
	title: string;
	description: string;
	cta: {
		primary: { label: string; href: string };
		secondary: { label: string; href: string };
	};
}

const TextContent = ({
	eyebrow,
	title,
	description,
	cta,
}: TextContentProps) => (
	<div>
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-6">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-8 leading-relaxed max-w-lg">
			{description}
		</p>
		<div className="flex flex-wrap gap-4">
			<Button size="lg" asChild>
				<Link href={cta.primary.href}>{cta.primary.label}</Link>
			</Button>
			<Button size="lg" variant="outline" asChild>
				<Link href={cta.secondary.href}>
					{cta.secondary.label}
					<ExternalLink className="size-4 ml-2" />
				</Link>
			</Button>
		</div>
	</div>
);

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	features: string[];
}

const ServicesList = ({ services }: { services: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{services.map((service, i) => (
			<ServiceCard key={i} {...service} />
		))}
	</div>
);

const ServiceCard = ({
	icon: Icon,
	title,
	description,
	features,
}: ServiceItem) => (
	<div className="group p-5 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
			<Icon className="size-5" />
		</div>
		<h3 className="font-semibold mb-1">{title}</h3>
		<p className="text-xs text-muted-foreground mb-3">{description}</p>
		<div className="flex flex-wrap gap-1">
			{features.map((feature, i) => (
				<Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
					{feature}
				</Badge>
			))}
		</div>
	</div>
);
