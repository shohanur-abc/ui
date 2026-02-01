import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	Cloud,
	Code2,
	Database,
	LineChart,
	Lock,
	Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Solutions" />
					<Title text="Accelerate Your Growth" />
					<Description text="Strategic services designed to fast-track your digital transformation journey." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Application Development',
							description:
								'Build modern, scalable applications with our expert engineering team using industry best practices.',
							highlight: true,
							href: '/services/development',
						},
						{
							icon: Cloud,
							title: 'Cloud Services',
							description: 'Migrate and optimize your cloud infrastructure.',
							highlight: false,
							href: '/services/cloud',
						},
						{
							icon: Database,
							title: 'Data Platform',
							description: 'Unified data management and analytics.',
							highlight: false,
							href: '/services/data',
						},
						{
							icon: Lock,
							title: 'Security',
							description: 'Zero-trust security architecture.',
							highlight: false,
							href: '/services/security',
						},
						{
							icon: Workflow,
							title: 'Automation',
							description: 'Intelligent workflow automation.',
							highlight: false,
							href: '/services/automation',
						},
						{
							icon: LineChart,
							title: 'Analytics & BI',
							description:
								'Transform data into actionable insights with advanced analytics and real-time dashboards.',
							highlight: true,
							href: '/services/analytics',
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

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	highlight: boolean;
	href: string;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, highlight, href }, i) => (
			<Card
				key={i}
				className={`group py-0 transition-all duration-300 hover:-translate-y-1 ${
					highlight
						? 'bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20'
						: 'hover:shadow-lg hover:shadow-primary/5'
				}`}
			>
				<CardContent className="p-6 @md:p-8 h-full flex flex-col">
					<div
						className={`size-12 @md:size-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
							highlight
								? 'bg-primary-foreground/20'
								: 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'
						}`}
					>
						<Icon className="size-6 @md:size-7" />
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p
						className={`text-sm @md:text-base leading-relaxed flex-1 ${
							highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'
						}`}
					>
						{description}
					</p>
					<Button
						variant={highlight ? 'secondary' : 'ghost'}
						size="sm"
						className={`self-start mt-4 ${
							highlight
								? ''
								: 'px-0 text-primary hover:text-primary hover:bg-transparent'
						}`}
						asChild
					>
						<Link href={href}>
							Learn more
							<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);
