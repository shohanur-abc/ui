import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Shield, Globe, BarChart3, Code, Palette, Cloud, Database, Smartphone, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Capabilities" />
					<Title text="Our Service Catalog" />
					<Description text="A comprehensive view of our expertise across technology and design." />
				</div>

				<ServiceMasonry
					categories={[
						{
							title: 'Development',
							color: 'bg-blue-500',
							services: [
								{ icon: Code, name: 'Web Development', description: 'Full-stack web applications' },
								{ icon: Smartphone, name: 'Mobile Apps', description: 'iOS & Android native apps' },
								{ icon: Database, name: 'Backend Systems', description: 'APIs and microservices' },
							],
						},
						{
							title: 'Design',
							color: 'bg-purple-500',
							services: [
								{ icon: Palette, name: 'UI/UX Design', description: 'User-centered interfaces' },
							],
						},
						{
							title: 'Cloud & DevOps',
							color: 'bg-cyan-500',
							services: [
								{ icon: Cloud, name: 'Cloud Architecture', description: 'AWS, GCP, Azure solutions' },
								{ icon: Zap, name: 'CI/CD Pipelines', description: 'Automated deployments' },
							],
						},
						{
							title: 'Security',
							color: 'bg-red-500',
							services: [
								{ icon: Shield, name: 'Security Audits', description: 'Vulnerability assessment' },
							],
						},
						{
							title: 'Data & Analytics',
							color: 'bg-green-500',
							services: [
								{ icon: BarChart3, name: 'Business Intelligence', description: 'Dashboards & reporting' },
								{ icon: Database, name: 'Data Engineering', description: 'ETL & data pipelines' },
							],
						},
						{
							title: 'Consulting',
							color: 'bg-amber-500',
							services: [
								{ icon: Users, name: 'Tech Strategy', description: 'Digital transformation' },
								{ icon: Globe, name: 'Product Discovery', description: 'From idea to roadmap' },
							],
						},
					]}
				/>

				<div className="mt-10 @md:mt-14 p-6 bg-muted/50 rounded-2xl flex flex-col @md:flex-row items-center justify-between gap-4">
					<div>
						<h3 className="font-bold text-lg">Can't find what you need?</h3>
						<p className="text-muted-foreground">
							We offer custom solutions tailored to your unique requirements.
						</p>
					</div>
					<Button asChild>
						<Link href="/contact">
							Discuss Your Project
							<ArrowRight className="size-4" />
						</Link>
					</Button>
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

interface Service {
	icon: ComponentType<{ className?: string }>;
	name: string;
	description: string;
}

interface Category {
	title: string;
	color: string;
	services: Service[];
}

const ServiceMasonry = ({ categories }: { categories: Category[] }) => (
	<div className="columns-1 @md:columns-2 @xl:columns-3 gap-6 space-y-6">
		{categories.map((category, i) => (
			<Card key={i} className="py-0 break-inside-avoid">
				<CardContent className="p-0">
					{/* Category header */}
					<div className={`${category.color} text-white p-4 flex items-center gap-3`}>
						<div className="size-10 rounded-lg bg-white/20 flex items-center justify-center">
							{category.services[0] && (() => {
								const Icon = category.services[0].icon;
								return <Icon className="size-5" />;
							})()}
						</div>
						<div>
							<h3 className="font-bold">{category.title}</h3>
							<p className="text-sm opacity-80">{category.services.length} services</p>
						</div>
					</div>

					{/* Services list */}
					<div className="p-4 space-y-3">
						{category.services.map(({ icon: Icon, name, description }, j) => (
							<Link
								key={j}
								href={`/services/${name.toLowerCase().replace(/\s+/g, '-')}`}
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
							>
								<div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10">
									<Icon className="size-4 text-muted-foreground group-hover:text-primary" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm group-hover:text-primary transition-colors">
										{name}
									</p>
									<p className="text-xs text-muted-foreground">{description}</p>
								</div>
								<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
							</Link>
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
