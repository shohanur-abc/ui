import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-lg mx-auto">
					<DeveloperCard
						src="https://picsum.photos/seed/card11/800/400"
						name="Mark Stevens"
						role="Open Source Developer"
						bio="Maintaining popular open source projects used by thousands of developers. Passionate about building tools that make developers' lives easier."
						stats={[
							{ label: 'Repositories', value: '50+' },
							{ label: 'Stars', value: '25K' },
							{ label: 'Contributors', value: '500+' },
						]}
						projects={[
							{ name: 'react-kit', stars: 12000, href: 'https://github.com' },
							{ name: 'node-tools', stars: 8000, href: 'https://github.com' },
							{ name: 'cli-utils', stars: 5000, href: 'https://github.com' },
						]}
						cta={{
							label: 'View GitHub',
							href: 'https://github.com',
							icon: Github,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface StatItem {
	label: string;
	value: string;
}

interface ProjectItem {
	name: string;
	stars: number;
	href: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface DeveloperCardProps {
	src: string;
	name: string;
	role: string;
	bio: string;
	stats: StatItem[];
	projects: ProjectItem[];
	cta: CTAData;
}

const DeveloperCard = ({
	src,
	name,
	role,
	bio,
	stats,
	projects,
	cta,
}: DeveloperCardProps) => (
	<Card className="overflow-hidden py-0">
		<div className="relative h-32">
			<Image src={src} alt="Banner" fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
		</div>
		<CardContent className="p-6 pt-0 -mt-8 relative">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-16 rounded-full bg-muted flex items-center justify-center ring-4 ring-card">
					<Github className="size-8" />
				</div>
				<div>
					<h1 className="text-xl font-bold">{name}</h1>
					<p className="text-primary text-sm">{role}</p>
				</div>
			</div>
			<p className="text-muted-foreground text-sm mb-6">{bio}</p>
			<div className="grid grid-cols-3 gap-4 mb-6">
				{stats.map(({ label, value }) => (
					<div key={label} className="text-center p-3 bg-muted/50 rounded-lg">
						<div className="text-lg font-bold">{value}</div>
						<div className="text-xs text-muted-foreground">{label}</div>
					</div>
				))}
			</div>
			<div className="mb-6">
				<p className="text-sm font-medium mb-3">Popular Projects</p>
				<div className="space-y-2">
					{projects.map(({ name, stars, href }) => (
						<Link
							key={name}
							href={href}
							className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
						>
							<div className="flex items-center gap-2">
								<Github className="size-4" />
								<span className="text-sm font-medium">{name}</span>
							</div>
							<div className="flex items-center gap-3">
								<Badge variant="secondary" className="gap-1">
									<Star className="size-3 fill-current" />
									{stars.toLocaleString()}
								</Badge>
								<ExternalLink className="size-4 text-muted-foreground" />
							</div>
						</Link>
					))}
				</div>
			</div>
			<Button className="gap-2 w-full" asChild>
				<Link href={cta.href}>
					<cta.icon className="size-4" />
					{cta.label}
				</Link>
			</Button>
		</CardContent>
	</Card>
);
