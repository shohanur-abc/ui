'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Folder, Globe, Smartphone, Layout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow icon={Folder} text="Portfolio" />
					<Title text="Work by Category" />
					<Description text="Explore projects organized by type and technology focus." />
				</div>

				<ProjectTabs
					categories={[
						{ id: 'all', label: 'All Work', icon: Layout },
						{ id: 'web', label: 'Web Apps', icon: Globe },
						{ id: 'mobile', label: 'Mobile', icon: Smartphone },
					]}
					projects={{
						all: [
							{
								image: 'https://picsum.photos/seed/tab2a/800/600',
								title: 'Enterprise CRM',
								category: 'Web',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2b/800/600',
								title: 'Fitness Tracker',
								category: 'Mobile',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2c/800/600',
								title: 'Learning Platform',
								category: 'Web',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2d/800/600',
								title: 'Chat Application',
								category: 'Mobile',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2e/800/600',
								title: 'Admin Dashboard',
								category: 'Web',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2f/800/600',
								title: 'Shopping App',
								category: 'Mobile',
								href: '#',
							},
						],
						web: [
							{
								image: 'https://picsum.photos/seed/tab2a/800/600',
								title: 'Enterprise CRM',
								category: 'Web',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2c/800/600',
								title: 'Learning Platform',
								category: 'Web',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2e/800/600',
								title: 'Admin Dashboard',
								category: 'Web',
								href: '#',
							},
						],
						mobile: [
							{
								image: 'https://picsum.photos/seed/tab2b/800/600',
								title: 'Fitness Tracker',
								category: 'Mobile',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2d/800/600',
								title: 'Chat Application',
								category: 'Mobile',
								href: '#',
							},
							{
								image: 'https://picsum.photos/seed/tab2f/800/600',
								title: 'Shopping App',
								category: 'Mobile',
								href: '#',
							},
						],
					}}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-3">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface Category {
	id: string;
	label: string;
	icon: ComponentType<{ className?: string }>;
}

interface ProjectItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

interface ProjectTabsProps {
	categories: Category[];
	projects: Record<string, ProjectItem[]>;
}

const ProjectTabs = ({ categories, projects }: ProjectTabsProps) => (
	<Tabs defaultValue="all" className="w-full">
		<TabsList className="w-full justify-start overflow-x-auto mb-8 @md:mb-10 bg-transparent border-b rounded-none p-0 h-auto">
			{categories.map(({ id, label, icon: Icon }) => (
				<TabsTrigger
					key={id}
					value={id}
					className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
				>
					<Icon className="size-4" />
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{Object.entries(projects).map(([categoryId, items]) => (
			<TabsContent key={categoryId} value={categoryId} className="mt-0">
				<ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
					{items.map(({ image, title, category, href }, i) => (
						<li key={i}>
							<Link
								href={href}
								className="group block relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
							>
								<div className="relative aspect-[4/3] overflow-hidden">
									<Image
										src={image}
										alt={title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
									<Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
										{category}
									</Badge>
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<h3 className="text-white font-semibold text-lg flex items-center gap-2">
											{title}
											<ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
										</h3>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</TabsContent>
		))}
	</Tabs>
);
