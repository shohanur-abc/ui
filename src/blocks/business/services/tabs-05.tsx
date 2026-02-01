'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Cloud,
	Code2,
	Cog,
	Database,
	Globe,
	Palette,
	Server,
	Shield,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Capabilities" />
					<Title text="Service Categories" />
					<Description text="Explore our services organized by category to find exactly what you need." />
				</div>

				<CategoryTabs
					categories={[
						{
							id: 'engineering',
							label: 'Engineering',
							services: [
								{
									icon: Code2,
									title: 'Web Development',
									description: 'Modern web applications with React, Next.js.',
									href: '/services/web',
								},
								{
									icon: Server,
									title: 'Backend Systems',
									description: 'Scalable APIs and microservices.',
									href: '/services/backend',
								},
								{
									icon: Cloud,
									title: 'Cloud Infrastructure',
									description: 'AWS, GCP, Azure solutions.',
									href: '/services/cloud',
								},
							],
						},
						{
							id: 'data',
							label: 'Data & AI',
							services: [
								{
									icon: Database,
									title: 'Data Engineering',
									description: 'Data pipelines and warehousing.',
									href: '/services/data',
								},
								{
									icon: Cog,
									title: 'Machine Learning',
									description: 'ML models and deployment.',
									href: '/services/ml',
								},
								{
									icon: Globe,
									title: 'Analytics',
									description: 'Business intelligence solutions.',
									href: '/services/analytics',
								},
							],
						},
						{
							id: 'design',
							label: 'Design',
							services: [
								{
									icon: Palette,
									title: 'UI/UX Design',
									description: 'User-centered design solutions.',
									href: '/services/design',
								},
								{
									icon: Globe,
									title: 'Brand Identity',
									description: 'Complete brand systems.',
									href: '/services/brand',
								},
								{
									icon: Code2,
									title: 'Design Systems',
									description: 'Scalable component libraries.',
									href: '/services/systems',
								},
							],
						},
						{
							id: 'security',
							label: 'Security',
							services: [
								{
									icon: Shield,
									title: 'Security Audits',
									description: 'Comprehensive assessments.',
									href: '/services/audits',
								},
								{
									icon: Server,
									title: 'Compliance',
									description: 'SOC 2, HIPAA, GDPR.',
									href: '/services/compliance',
								},
								{
									icon: Cloud,
									title: 'Cloud Security',
									description: 'Cloud-native security.',
									href: '/services/cloud-security',
								},
							],
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	href: string;
}

interface CategoryItem {
	id: string;
	label: string;
	services: ServiceItem[];
}

const CategoryTabs = ({ categories }: { categories: CategoryItem[] }) => (
	<Tabs defaultValue={categories[0].id} className="w-full">
		<TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
			{categories.map(({ id, label }) => (
				<TabsTrigger
					key={id}
					value={id}
					className="px-5 py-2.5 data-[state=active]:shadow-md"
				>
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{categories.map(({ id, services }) => (
			<TabsContent key={id} value={id}>
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
					{services.map(({ icon: Icon, title, description, href }, i) => (
						<Link key={i} href={href} className="group block">
							<Card className="h-full py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
								<CardContent className="p-6 @md:p-8">
									<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
										<Icon className="size-6 @md:size-7" />
									</div>
									<h3 className="text-lg @md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-4">
										{description}
									</p>
									<span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
										Learn more
										<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
									</span>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
