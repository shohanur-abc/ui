import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-8 items-start">
					<ArticleList
						title="Latest Articles"
						articles={[
							{
								title: 'Understanding React Server Components',
								author: {
									name: 'Sarah Chen',
									avatar: 'https://i.pravatar.cc/100?img=40',
								},
								date: 'Jan 28, 2026',
								readTime: '8 min',
							},
							{
								title: 'TypeScript 5.5 New Features',
								author: {
									name: 'Alex Kim',
									avatar: 'https://i.pravatar.cc/100?img=50',
								},
								date: 'Jan 27, 2026',
								readTime: '6 min',
							},
							{
								title: 'Mastering CSS Grid Layouts',
								author: {
									name: 'Maria J.',
									avatar: 'https://i.pravatar.cc/100?img=60',
								},
								date: 'Jan 26, 2026',
								readTime: '10 min',
							},
						]}
						className="@xl:col-span-7"
					/>
					<FeaturedPanel
						featured={{
							title: 'The Complete Next.js 15 Guide',
							image:
								'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
							description:
								'Master Next.js 15 with this comprehensive guide covering all new features.',
						}}
						className="@xl:col-span-5"
					/>
				</div>
			</div>
		</section>
	);
}

interface Author {
	name: string;
	avatar: string;
}

interface Article {
	title: string;
	author: Author;
	date: string;
	readTime: string;
}

interface ArticleListProps {
	title: string;
	articles: Article[];
	className?: string;
}

const ArticleList = ({ title, articles, className }: ArticleListProps) => (
	<div className={className}>
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl @md:text-3xl font-bold">{title}</h2>
			<Button variant="ghost" asChild className="gap-1">
				<Link href="/articles">
					View All
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
		<div className="space-y-4">
			{articles.map((article, i) => (
				<Card
					key={article.title}
					className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg"
				>
					<CardContent className="p-4 @md:p-5 flex items-start gap-4">
						<span className="text-3xl font-bold text-muted-foreground/50 w-8 shrink-0">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
								{article.title}
							</h3>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<Avatar className="size-6">
										<AvatarImage
											src={article.author.avatar}
											alt={article.author.name}
										/>
										<AvatarFallback className="text-[10px]">
											{article.author.name[0]}
										</AvatarFallback>
									</Avatar>
									<span>{article.author.name}</span>
								</div>
								<span className="flex items-center gap-1">
									<Calendar className="size-3" />
									{article.date}
								</span>
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									{article.readTime}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

interface Featured {
	title: string;
	image: string;
	description: string;
}

interface FeaturedPanelProps {
	featured: Featured;
	className?: string;
}

const FeaturedPanel = ({ featured, className }: FeaturedPanelProps) => (
	<Card className={`overflow-hidden py-0 sticky top-6 ${className}`}>
		<div className="relative aspect-[4/3]">
			<Image
				src={featured.image}
				alt={featured.title}
				fill
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
			<CardContent className="absolute bottom-0 left-0 right-0 p-5 @md:p-6">
				<Badge className="mb-3 bg-primary text-primary-foreground">
					<Sparkles className="size-3 mr-1" />
					Featured
				</Badge>
				<h3 className="text-xl @md:text-2xl font-bold text-white mb-2">
					{featured.title}
				</h3>
				<p className="text-sm text-white/70 mb-4 line-clamp-2">
					{featured.description}
				</p>
				<Button size="sm" asChild className="gap-2">
					<Link href="/featured">
						Read More
						<ArrowRight className="size-3.5" />
					</Link>
				</Button>
			</CardContent>
		</div>
	</Card>
);
