'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ProjectTabs
					categories={[
						{
							id: 'web',
							label: 'Web Apps',
							projects: [
								{
									title: 'E-Commerce Platform',
									description:
										'A full-featured online store with payment integration.',
									image: 'https://picsum.photos/seed/proj1/800/500',
									tags: ['Next.js', 'Stripe', 'PostgreSQL'],
									href: '#project-1',
								},
								{
									title: 'SaaS Dashboard',
									description: 'Analytics dashboard for enterprise clients.',
									image: 'https://picsum.photos/seed/proj2/800/500',
									tags: ['React', 'D3.js', 'Node.js'],
									href: '#project-2',
								},
							],
						},
						{
							id: 'mobile',
							label: 'Mobile Apps',
							projects: [
								{
									title: 'Fitness Tracker',
									description: 'Cross-platform health and workout application.',
									image: 'https://picsum.photos/seed/proj3/800/500',
									tags: ['React Native', 'Firebase', 'HealthKit'],
									href: '#project-3',
								},
								{
									title: 'Food Delivery',
									description: 'Real-time ordering and delivery tracking.',
									image: 'https://picsum.photos/seed/proj4/800/500',
									tags: ['Flutter', 'Maps API', 'Stripe'],
									href: '#project-4',
								},
							],
						},
						{
							id: 'design',
							label: 'Design Systems',
							projects: [
								{
									title: 'Enterprise UI Kit',
									description:
										'Comprehensive component library for B2B products.',
									image: 'https://picsum.photos/seed/proj5/800/500',
									tags: ['Figma', 'Storybook', 'Tokens'],
									href: '#project-5',
								},
								{
									title: 'Brand Guidelines',
									description: 'Complete visual identity system.',
									image: 'https://picsum.photos/seed/proj6/800/500',
									tags: ['Typography', 'Colors', 'Icons'],
									href: '#project-6',
								},
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface ProjectItem {
	title: string;
	description: string;
	image: string;
	tags: string[];
	href: string;
}

interface CategoryItem {
	id: string;
	label: string;
	projects: ProjectItem[];
}

const ProjectTabs = ({ categories }: { categories: CategoryItem[] }) => (
	<Tabs defaultValue={categories[0].id}>
		<div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-8 @md:mb-10">
			<div>
				<Badge variant="outline" className="mb-3 @md:mb-4">
					Portfolio
				</Badge>
				<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
					Featured Projects
				</h2>
			</div>
			<TabsList className="h-auto p-1.5">
				{categories.map(({ id, label }) => (
					<TabsTrigger key={id} value={id} className="px-4 py-2">
						{label}
					</TabsTrigger>
				))}
			</TabsList>
		</div>

		{categories.map(({ id, projects }) => (
			<TabsContent key={id} value={id}>
				<div className="grid @lg:grid-cols-2 gap-6 @md:gap-8">
					{projects.map(({ title, description, image, tags, href }, i) => (
						<div key={i} className="group">
							<div className="relative aspect-video rounded-xl overflow-hidden mb-4 @md:mb-5">
								<Image
									src={image}
									alt={title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
							<div className="flex flex-wrap gap-2 mb-3">
								{tags.map((tag, j) => (
									<Badge key={j} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>
							<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
							<p className="text-sm @md:text-base text-muted-foreground mb-4">
								{description}
							</p>
							<Button variant="ghost" size="sm" asChild>
								<Link href={href}>
									View Project
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
