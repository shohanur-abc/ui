import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Featured Articles"
					cta={{ label: 'View All', href: '/articles' }}
				/>
				<ArticleGrid
					articles={[
						{
							title: 'React Server Components Deep Dive',
							category: 'React',
							image:
								'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
							readTime: '12 min',
						},
						{
							title: 'TypeScript 5.5 New Features',
							category: 'TypeScript',
							image:
								'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
							readTime: '8 min',
						},
						{
							title: 'Modern CSS Techniques',
							category: 'CSS',
							image:
								'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
							readTime: '6 min',
						},
						{
							title: 'Next.js 15 Guide',
							category: 'Next.js',
							image:
								'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
							readTime: '15 min',
						},
						{
							title: 'Node.js Best Practices',
							category: 'Node.js',
							image:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
							readTime: '10 min',
						},
						{
							title: 'GraphQL vs REST',
							category: 'API',
							image:
								'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600',
							readTime: '7 min',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	title: string;
	cta: { label: string; href: string };
}

const Header = ({ title, cta }: HeaderProps) => (
	<div className="flex items-center justify-between mb-8">
		<div className="flex items-center gap-3">
			<Sparkles className="size-5 text-primary" />
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		</div>
		<Button variant="ghost" asChild className="gap-1">
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

interface Article {
	title: string;
	category: string;
	image: string;
	readTime: string;
}

interface ArticleGridProps {
	articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
		{articles.map((article) => (
			<Card key={article.title} className="group overflow-hidden py-0">
				<div className="relative aspect-video">
					<Image
						src={article.image}
						alt={article.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
					<div className="absolute top-3 left-3">
						<Badge className="bg-black/50 text-white backdrop-blur-sm border-0 text-xs">
							{article.category}
						</Badge>
					</div>
				</div>
				<CardContent className="p-4">
					<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
						{article.title}
					</h3>
					<span className="text-sm text-muted-foreground flex items-center gap-1">
						<Clock className="size-3" />
						{article.readTime} read
					</span>
				</CardContent>
			</Card>
		))}
	</div>
);
