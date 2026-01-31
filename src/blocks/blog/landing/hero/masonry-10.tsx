import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Code,
	Database,
	Palette,
	Server,
	Smartphone,
	Terminal,
	Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Explore Topics"
					description="Find content that matches your interests"
				/>
				<MasonryGrid
					topics={[
						{
							icon: Code,
							label: 'Frontend',
							description: 'React, Vue, Angular, and more',
							count: 342,
							color: 'bg-blue-500/10 text-blue-500',
							featured: true,
						},
						{
							icon: Server,
							label: 'Backend',
							description: 'Node.js, Python, Go',
							count: 256,
							color: 'bg-green-500/10 text-green-500',
							featured: false,
						},
						{
							icon: Database,
							label: 'Database',
							description: 'SQL, NoSQL, GraphQL',
							count: 128,
							color: 'bg-purple-500/10 text-purple-500',
							featured: false,
						},
						{
							icon: Smartphone,
							label: 'Mobile',
							description: 'React Native, Flutter',
							count: 94,
							color: 'bg-orange-500/10 text-orange-500',
							featured: true,
						},
						{
							icon: Palette,
							label: 'Design',
							description: 'UI/UX, CSS, Animations',
							count: 187,
							color: 'bg-pink-500/10 text-pink-500',
							featured: false,
						},
						{
							icon: Terminal,
							label: 'DevOps',
							description: 'CI/CD, Docker, K8s',
							count: 156,
							color: 'bg-cyan-500/10 text-cyan-500',
							featured: false,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="text-center mb-10">
		<Badge variant="secondary" className="mb-4">
			<Sparkles className="size-3.5 mr-1.5" />
			Categories
		</Badge>
		<h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

interface Topic {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	description: string;
	count: number;
	color: string;
	featured: boolean;
}

interface MasonryGridProps {
	topics: Topic[];
}

const MasonryGrid = ({ topics }: MasonryGridProps) => (
	<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
		{topics.map((topic) => (
			<Link key={topic.label} href="#" className="block break-inside-avoid">
				<Card
					className={`group transition-all hover:shadow-lg hover:-translate-y-1 ${topic.featured ? 'border-primary/30' : ''} ${topic.color}`}
				>
					<CardContent className={`${topic.featured ? 'p-6' : 'p-5'}`}>
						<div
							className={`${topic.featured ? 'size-14' : 'size-12'} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
						>
							<topic.icon
								className={`${topic.featured ? 'size-7' : 'size-6'}`}
							/>
						</div>
						<h3
							className={`font-semibold ${topic.featured ? 'text-xl' : 'text-lg'} mb-2`}
						>
							{topic.label}
						</h3>
						<p className="text-sm text-muted-foreground mb-3">
							{topic.description}
						</p>
						<p className="text-xs text-muted-foreground">
							{topic.count} articles
						</p>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
