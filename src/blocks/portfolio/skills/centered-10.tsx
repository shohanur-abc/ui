import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowUpRight,
	Blocks,
	Brain,
	Code2,
	Database,
	Globe,
	Layers,
	Rocket,
	Server,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<IntroBlock
					badge="Services"
					title="What I Can Build"
					subtitle="End-to-end development services tailored to your needs"
				/>

				<ServiceGrid
					services={[
						{
							icon: Globe,
							title: 'Web Applications',
							description: 'Full-featured web apps with modern frameworks',
							link: '#web',
						},
						{
							icon: Server,
							title: 'API Development',
							description: 'Scalable REST & GraphQL APIs',
							link: '#api',
						},
						{
							icon: Database,
							title: 'Database Design',
							description: 'Efficient data architecture',
							link: '#database',
						},
						{
							icon: Layers,
							title: 'Cloud Solutions',
							description: 'AWS, serverless, and edge computing',
							link: '#cloud',
						},
						{
							icon: Blocks,
							title: 'System Architecture',
							description: 'Microservices & distributed systems',
							link: '#architecture',
						},
						{
							icon: Code2,
							title: 'Frontend UI',
							description: 'Beautiful, accessible interfaces',
							link: '#frontend',
						},
						{
							icon: Rocket,
							title: 'Performance',
							description: 'Speed optimization & Core Web Vitals',
							link: '#performance',
						},
						{
							icon: Brain,
							title: 'AI Integration',
							description: 'LLMs, chatbots, and automation',
							link: '#ai',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface IntroBlockProps {
	badge: string;
	title: string;
	subtitle: string;
}

const IntroBlock = ({ badge, title, subtitle }: IntroBlockProps) => (
	<div className="text-center mb-12 @md:mb-16 @xl:mb-20">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	link: string;
}

const ServiceGrid = ({ services }: { services: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
		{services.map((service, i) => (
			<ServiceCard key={i} {...service} />
		))}
	</div>
);

const ServiceCard = ({ icon: Icon, title, description, link }: ServiceItem) => (
	<Link href={link}>
		<Card className="group h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<CardContent className="p-5 @md:p-6 h-full flex flex-col">
				<div className="flex items-start justify-between mb-4">
					<div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
						<Icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" />
					</div>
					<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>
				<h3 className="font-semibold mb-2">{title}</h3>
				<p className="text-sm text-muted-foreground flex-grow">{description}</p>
			</CardContent>
		</Card>
	</Link>
);
