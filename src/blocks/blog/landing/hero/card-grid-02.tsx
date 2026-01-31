import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					eyebrow="Latest Posts"
					title="Fresh From the Blog"
					description="Discover the latest insights, tutorials, and news from our writers."
				/>
				<ArticleGrid
					articles={[
						{
							title: 'Building Accessible React Components',
							excerpt: 'Learn how to create components that everyone can use.',
							image:
								'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
							author: {
								name: 'Sarah Chen',
								avatar: 'https://i.pravatar.cc/100?img=40',
							},
							date: 'Jan 28, 2026',
						},
						{
							title: 'The Art of Clean Code',
							excerpt:
								'Principles and practices for writing maintainable code.',
							image:
								'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
							author: {
								name: 'Alex Kim',
								avatar: 'https://i.pravatar.cc/100?img=50',
							},
							date: 'Jan 25, 2026',
						},
						{
							title: 'Performance Optimization Tips',
							excerpt: 'Make your web applications faster and more efficient.',
							image:
								'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
							author: {
								name: 'Maria J.',
								avatar: 'https://i.pravatar.cc/100?img=60',
							},
							date: 'Jan 22, 2026',
						},
					]}
				/>
				<ViewAllCTA href="/articles" />
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
	<div className="text-center mb-10">
		<Badge variant="secondary" className="mb-4">
			<Sparkles className="size-3.5 mr-1.5" />
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
		<p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
	</div>
);

interface Author {
	name: string;
	avatar: string;
}

interface Article {
	title: string;
	excerpt: string;
	image: string;
	author: Author;
	date: string;
}

interface ArticleGridProps {
	articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{articles.map((article) => (
			<Card key={article.title} className="group overflow-hidden py-0">
				<div className="relative aspect-video">
					<Image
						src={article.image}
						alt={article.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<CardContent className="p-5">
					<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
						{article.title}
					</h3>
					<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
						{article.excerpt}
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Avatar className="size-7">
								<AvatarImage
									src={article.author.avatar}
									alt={article.author.name}
								/>
								<AvatarFallback className="text-[10px]">
									{article.author.name[0]}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm">{article.author.name}</span>
						</div>
						<span className="text-xs text-muted-foreground flex items-center gap-1">
							<Calendar className="size-3" />
							{article.date}
						</span>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

interface ViewAllCTAProps {
	href: string;
}

const ViewAllCTA = ({ href }: ViewAllCTAProps) => (
	<div className="text-center mt-10">
		<Button size="lg" variant="outline" asChild className="gap-2">
			<Link href={href}>
				View All Articles
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
