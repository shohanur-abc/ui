import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowUpRight, Infinity, Repeat, RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Infinity} text="Loop" />
					<Title text="Infinite Scroll" />
					<Description text="Continuous scrolling project gallery with lazy loading." />
				</div>

				<InfiniteGrid
					items={[
						{
							image: 'https://picsum.photos/seed/inf1/600/400',
							title: 'Banking Platform',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf2/600/400',
							title: 'E-Commerce Store',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf3/600/400',
							title: 'Healthcare Portal',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf4/600/400',
							title: 'AI Dashboard',
							category: 'AI/ML',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf5/600/400',
							title: 'Mobile App',
							category: 'iOS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf6/600/400',
							title: 'Design System',
							category: 'UI/UX',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf7/600/400',
							title: 'Social Platform',
							category: 'Social',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf8/600/400',
							title: 'Learning App',
							category: 'EdTech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/inf9/600/400',
							title: 'Analytics Tool',
							category: 'SaaS',
							href: '#',
						},
					]}
				/>

				<LoadMore currentCount={9} totalCount={24} onLoad="#load-more" />
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
	<div className="flex justify-center mb-4">
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

interface InfiniteItem {
	image: string;
	title: string;
	category: string;
	href: string;
}

const InfiniteGrid = ({ items }: { items: InfiniteItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
		{items.map(({ image, title, category, href }, i) => (
			<Link key={i} href={href} className="group block">
				<Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
					<div className="relative aspect-[4/3] overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
						<Badge className="absolute top-3 left-3">{category}</Badge>
					</div>

					<CardContent className="p-4 flex items-center justify-between">
						<h3 className="font-bold group-hover:text-primary transition-colors">
							{title}
						</h3>
						<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

interface LoadMoreProps {
	currentCount: number;
	totalCount: number;
	onLoad: string;
}

const LoadMore = ({ currentCount, totalCount, onLoad }: LoadMoreProps) => (
	<div className="mt-10 text-center">
		<p className="text-sm text-muted-foreground mb-4">
			Showing {currentCount} of {totalCount} projects
		</p>

		{/* Progress bar */}
		<div className="w-48 h-1 mx-auto mb-6 rounded-full bg-muted overflow-hidden">
			<div
				className="h-full rounded-full bg-primary transition-all"
				style={{ width: `${(currentCount / totalCount) * 100}%` }}
			/>
		</div>

		<Button variant="outline" className="gap-2" asChild>
			<Link href={onLoad}>
				<RefreshCcw className="size-4" />
				Load More Projects
			</Link>
		</Button>
	</div>
);
