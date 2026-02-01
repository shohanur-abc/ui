import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, Code, Palette, Cloud, Shield, Zap, BarChart3 } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<MinimalServices
					eyebrow="Services"
					title="What We Do"
					services={[
						{
							icon: Code,
							title: 'Development',
							description: 'Custom web and mobile applications.',
						},
						{
							icon: Palette,
							title: 'Design',
							description: 'User-centered UI/UX design.',
						},
						{
							icon: Cloud,
							title: 'Cloud',
							description: 'Scalable infrastructure solutions.',
						},
						{
							icon: Shield,
							title: 'Security',
							description: 'Enterprise-grade protection.',
						},
						{
							icon: Zap,
							title: 'Performance',
							description: 'Optimization for speed.',
						},
						{
							icon: BarChart3,
							title: 'Analytics',
							description: 'Data-driven insights.',
						},
					]}
					cta={{ label: 'Get in Touch', href: '/contact' }}
				/>
			</div>
		</section>
	);
}

interface Service {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const MinimalServices = ({
	eyebrow,
	title,
	services,
	cta,
}: {
	eyebrow: string;
	title: string;
	services: Service[];
	cta: { label: string; href: string };
}) => (
	<div className="max-w-4xl mx-auto">
		<div className="text-center mb-12 @md:mb-16">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
				{title}
			</h2>
		</div>

		{/* Minimal service list */}
		<div className="divide-y">
			{services.map(({ icon: Icon, title, description }, i) => (
				<Link
					key={i}
					href={`/services/${title.toLowerCase()}`}
					className="flex items-center gap-6 py-6 @md:py-8 group hover:px-4 transition-all"
				>
					<div className="size-12 rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
						<Icon className="size-5" />
					</div>
					<div className="flex-1">
						<h3 className="text-lg font-bold group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-muted-foreground text-sm">{description}</p>
					</div>
					<ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
				</Link>
			))}
		</div>

		{/* CTA */}
		<div className="text-center mt-12 @md:mt-16">
			<Button size="lg" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
