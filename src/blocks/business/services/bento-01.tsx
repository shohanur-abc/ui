import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	BarChart3,
	Cloud,
	Code2,
	Database,
	Layers,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Featured Services" />
					<Title text="What Sets Us Apart" />
					<Description text="Our signature services combine innovation with proven methodologies to deliver exceptional results." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Custom Software Development',
							description:
								'Tailored solutions built from the ground up to meet your unique business requirements. We leverage modern architecture patterns and cutting-edge technologies.',
							size: 'large',
							href: '/services/development',
						},
						{
							icon: Cloud,
							title: 'Cloud Architecture',
							description: 'Scalable, secure infrastructure design.',
							size: 'small',
							href: '/services/cloud',
						},
						{
							icon: Database,
							title: 'Data Engineering',
							description: 'Transform raw data into insights.',
							size: 'small',
							href: '/services/data',
						},
						{
							icon: Zap,
							title: 'Performance Optimization',
							description: 'Speed and efficiency at scale.',
							size: 'small',
							href: '/services/performance',
						},
						{
							icon: Layers,
							title: 'System Integration',
							description: 'Seamless connectivity solutions.',
							size: 'small',
							href: '/services/integration',
						},
						{
							icon: BarChart3,
							title: 'Business Intelligence & Analytics',
							description:
								'Turn your data into competitive advantage with advanced analytics dashboards, predictive modeling, and AI-powered insights.',
							size: 'large',
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
	size: 'small' | 'large';
	href: string;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, size, href }, i) => (
			<Card
				key={i}
				className={`group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 ${
					size === 'large' ? '@xl:col-span-2' : ''
				}`}
			>
				<CardContent className="p-5 @md:p-6 @xl:p-8 h-full flex flex-col">
					<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-5 @md:size-6" />
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1">
						{description}
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="self-start px-0 mt-4 text-primary hover:text-primary hover:bg-transparent"
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
