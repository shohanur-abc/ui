import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ExternalLink, Globe, Smartphone, Monitor } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<DeviceMasonry
					projects={[
						{
							type: 'desktop',
							image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop',
							title: 'Enterprise Dashboard',
							description: 'Real-time analytics and reporting platform',
							tech: ['React', 'D3.js', 'Node.js'],
							link: '#',
						},
						{
							type: 'mobile',
							image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop',
							title: 'Banking App',
							description: 'Secure mobile banking solution',
							tech: ['React Native', 'TypeScript'],
							link: '#',
						},
						{
							type: 'mobile',
							image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=800&fit=crop',
							title: 'Fitness Tracker',
							description: 'Health and workout companion',
							tech: ['Swift', 'HealthKit'],
							link: '#',
						},
						{
							type: 'tablet',
							image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
							title: 'POS System',
							description: 'Point of sale for retail',
							tech: ['Flutter', 'Firebase'],
							link: '#',
						},
						{
							type: 'desktop',
							image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=750&fit=crop',
							title: 'Trading Platform',
							description: 'Real-time stock trading interface',
							tech: ['Vue.js', 'WebSocket'],
							link: '#',
						},
						{
							type: 'mobile',
							image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&h=800&fit=crop',
							title: 'E-commerce App',
							description: 'Mobile shopping experience',
							tech: ['Kotlin', 'Jetpack'],
							link: '#',
						},
					]}
				/>

				<div className="text-center mt-10 @md:mt-14">
					<Badge variant="outline" className="mb-4">
						Multi-Platform Expertise
					</Badge>
					<h2 className="text-2xl @md:text-3xl font-bold mb-4">
						We Build for Every Screen
					</h2>
					<Button size="lg" asChild>
						<Link href="/portfolio">
							See All Projects
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

interface Project {
	type: 'desktop' | 'tablet' | 'mobile';
	image: string;
	title: string;
	description: string;
	tech: string[];
	link: string;
}

const DeviceMasonry = ({ projects }: { projects: Project[] }) => {
	const getDeviceFrame = (type: Project['type']) => {
		switch (type) {
			case 'desktop':
				return {
					wrapper: 'p-2 bg-zinc-800 rounded-lg',
					screen: 'rounded',
					aspect: 'aspect-[16/10]',
					icon: Monitor,
				};
			case 'tablet':
				return {
					wrapper: 'p-3 bg-zinc-800 rounded-2xl',
					screen: 'rounded-lg',
					aspect: 'aspect-[4/3]',
					icon: Globe,
				};
			case 'mobile':
				return {
					wrapper: 'p-2 bg-zinc-800 rounded-3xl max-w-[200px] mx-auto',
					screen: 'rounded-2xl',
					aspect: 'aspect-[9/19]',
					icon: Smartphone,
				};
		}
	};

	const getGridClasses = (type: Project['type']) => {
		switch (type) {
			case 'desktop':
				return '@md:col-span-2';
			case 'tablet':
				return '@md:col-span-1';
			case 'mobile':
				return '';
		}
	};

	return (
		<div className="grid grid-cols-2 @md:grid-cols-4 gap-6 @xl:gap-8">
			{projects.map((project, i) => {
				const frame = getDeviceFrame(project.type);
				const Icon = frame.icon;

				return (
					<div key={i} className={`group ${getGridClasses(project.type)}`}>
						{/* Device frame */}
						<div className={frame.wrapper}>
							<div className={`relative overflow-hidden ${frame.screen} ${frame.aspect}`}>
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover"
								/>
								{/* Hover overlay */}
								<Link
									href={project.link}
									className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
								>
									<ExternalLink className="size-8 text-primary-foreground" />
								</Link>
							</div>
						</div>

						{/* Project info */}
						<div className="mt-4 text-center">
							<div className="flex items-center justify-center gap-2 mb-1">
								<Icon className="size-4 text-muted-foreground" />
								<h3 className="font-semibold">{project.title}</h3>
							</div>
							<p className="text-sm text-muted-foreground mb-2">
								{project.description}
							</p>
							<div className="flex flex-wrap justify-center gap-1">
								{project.tech.map((t, j) => (
									<Badge key={j} variant="secondary" className="text-xs">
										{t}
									</Badge>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
