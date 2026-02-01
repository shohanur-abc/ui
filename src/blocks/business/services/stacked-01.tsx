import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check, Code, Palette, Cloud, Shield, BarChart3, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<StackedServices
					eyebrow="What We Do"
					title="Full-Stack Digital Services"
					description="From strategy to execution, we provide end-to-end solutions that drive business growth."
					services={[
						{
							icon: Code,
							title: 'Software Development',
							description:
								'Custom web and mobile applications built with modern technologies and best practices.',
							features: [
								'Full-stack web development',
								'Native & cross-platform mobile apps',
								'API design & integration',
								'Legacy system modernization',
							],
							cta: { label: 'Learn More', href: '/services/development' },
						},
						{
							icon: Palette,
							title: 'Product Design',
							description:
								'User-centered design that creates intuitive, beautiful experiences that drive engagement.',
							features: [
								'UX research & strategy',
								'UI design & prototyping',
								'Design systems',
								'Usability testing',
							],
							cta: { label: 'Learn More', href: '/services/design' },
						},
						{
							icon: Cloud,
							title: 'Cloud & Infrastructure',
							description:
								'Scalable, secure cloud solutions that optimize performance and reduce operational costs.',
							features: [
								'Cloud architecture & migration',
								'DevOps & CI/CD',
								'Kubernetes & containerization',
								'Performance optimization',
							],
							cta: { label: 'Learn More', href: '/services/cloud' },
						},
						{
							icon: Shield,
							title: 'Cybersecurity',
							description:
								'Comprehensive security services to protect your digital assets and maintain compliance.',
							features: [
								'Security audits & assessments',
								'Penetration testing',
								'Compliance consulting',
								'24/7 security monitoring',
							],
							cta: { label: 'Learn More', href: '/services/security' },
						},
						{
							icon: BarChart3,
							title: 'Data & Analytics',
							description:
								'Transform raw data into actionable insights with advanced analytics and visualization.',
							features: [
								'Business intelligence dashboards',
								'Data engineering & ETL',
								'Predictive analytics',
								'Machine learning solutions',
							],
							cta: { label: 'Learn More', href: '/services/data' },
						},
						{
							icon: Users,
							title: 'Team Augmentation',
							description:
								'Scale your development capacity with skilled professionals who integrate seamlessly.',
							features: [
								'Vetted senior developers',
								'Flexible engagement models',
								'Domain expertise',
								'Quick onboarding',
							],
							cta: { label: 'Learn More', href: '/services/team' },
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

interface Service {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	features: string[];
	cta: { label: string; href: string };
}

const StackedServices = ({
	eyebrow,
	title,
	description,
	services,
}: {
	eyebrow: string;
	title: string;
	description: string;
	services: Service[];
}) => (
	<div>
		<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{title}
			</h2>
			<p className="text-lg text-muted-foreground">{description}</p>
		</div>

		<div className="space-y-6">
			{services.map(({ icon: Icon, title, description, features, cta }, i) => (
				<Card key={i} className="py-0 overflow-hidden">
					<CardContent className="p-0">
						<div className="grid @lg:grid-cols-12 gap-6 p-6 @md:p-8 items-center">
							{/* Icon */}
							<div className="@lg:col-span-1">
								<div className="size-12 @lg:size-14 rounded-xl bg-primary/10 flex items-center justify-center">
									<Icon className="size-6 @lg:size-7 text-primary" />
								</div>
							</div>

							{/* Title & Description */}
							<div className="@lg:col-span-4">
								<h3 className="text-xl font-bold mb-2">{title}</h3>
								<p className="text-muted-foreground text-sm">{description}</p>
							</div>

							{/* Features */}
							<div className="@lg:col-span-5">
								<div className="grid @sm:grid-cols-2 gap-2">
									{features.map((feature, j) => (
										<div key={j} className="flex items-center gap-2 text-sm">
											<Check className="size-4 text-primary shrink-0" />
											{feature}
										</div>
									))}
								</div>
							</div>

							{/* CTA */}
							<div className="@lg:col-span-2 text-right">
								<Button variant="outline" asChild>
									<Link href={cta.href}>
										{cta.label}
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>

		<div className="text-center mt-10 @md:mt-14">
			<Button size="lg" asChild>
				<Link href="/contact">
					Discuss Your Project
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
