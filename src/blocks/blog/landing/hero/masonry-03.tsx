import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Flame, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header title="Trending Now" icon={TrendingUp} />
				<MasonryGrid
					articles={[
						{
							title: 'AI Revolution in Code Generation',
							category: 'AI',
							image:
								'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
							readTime: '15 min',
							hot: true,
							rank: 1,
							height: 'h-80',
						},
						{
							title: 'React 20 Features',
							category: 'React',
							image:
								'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
							readTime: '8 min',
							hot: true,
							rank: 2,
							height: 'h-48',
						},
						{
							title: 'CSS Animations',
							category: 'CSS',
							image:
								'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
							readTime: '6 min',
							hot: false,
							rank: 3,
							height: 'h-64',
						},
						{
							title: 'TypeScript 5.5',
							category: 'TypeScript',
							image:
								'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
							readTime: '10 min',
							hot: false,
							rank: 4,
							height: 'h-56',
						},
						{
							title: 'Node.js Best Practices',
							category: 'Node.js',
							image:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
							readTime: '12 min',
							hot: false,
							rank: 5,
							height: 'h-72',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
}

const Header = ({ title, icon: Icon }: HeaderProps) => (
	<div className="flex items-center gap-3 mb-8">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<Icon className="size-5 text-primary" />
		</div>
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
	</div>
);

interface Article {
	title: string;
	category: string;
	image: string;
	readTime: string;
	hot: boolean;
	rank: number;
	height: string;
}

interface MasonryGridProps {
	articles: Article[];
}

const MasonryGrid = ({ articles }: MasonryGridProps) => (
	<div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
		{articles.map((article) => (
			<Link key={article.title} href="#" className="block break-inside-avoid">
				<Card className="group overflow-hidden py-0">
					<div className={`relative ${article.height}`}>
						<Image
							src={article.image}
							alt={article.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
						<div className="absolute top-3 left-3 right-3 flex justify-between items-start">
							<Badge
								variant="secondary"
								className="bg-white/90 text-foreground font-bold"
							>
								#{article.rank}
							</Badge>
							{article.hot && (
								<Badge className="bg-destructive text-destructive-foreground border-0">
									<Flame className="size-3 mr-1" />
									Hot
								</Badge>
							)}
						</div>
						<CardContent className="absolute bottom-0 left-0 right-0 p-4">
							<Badge className="mb-2 bg-black/50 text-white backdrop-blur-sm border-0 text-xs">
								{article.category}
							</Badge>
							<h3 className="font-semibold text-white mb-2 line-clamp-2">
								{article.title}
							</h3>
							<span className="text-sm text-white/70 flex items-center gap-1">
								<Clock className="size-3" />
								{article.readTime}
							</span>
						</CardContent>
					</div>
				</Card>
			</Link>
		))}
	</div>
);
