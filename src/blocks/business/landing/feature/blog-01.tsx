import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Clock, FileText, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface BlogPost {
	category: string;
	title: string;
	excerpt: string;
	author: string;
	date: string;
	readTime: string;
	thumbnail: string;
	href: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6">
					<div className="max-w-2xl">
						<Eyebrow icon={BookOpen} text="Blog" />
						<Title text="Latest from Our" highlight="Blog" />
						<Description text="Insights, tutorials, and updates from our team to help you succeed." />
					</div>
					<Button variant="outline" className="gap-2 shrink-0 w-fit" asChild>
						<Link href="/blog">
							View All Posts
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				<BlogGrid
					posts={[
						{
							category: 'Product',
							title: 'Introducing AI-Powered Workflows',
							excerpt:
								'Learn how our new AI features can automate 80% of your repetitive tasks...',
							author: 'Sarah Chen',
							date: 'Mar 15, 2026',
							readTime: '5 min',
							thumbnail:
								'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
							href: '/blog/ai-workflows',
						},
						{
							category: 'Engineering',
							title: 'How We Achieved 99.99% Uptime',
							excerpt:
								'A deep dive into our infrastructure and reliability practices...',
							author: 'Marcus Lee',
							date: 'Mar 10, 2026',
							readTime: '8 min',
							thumbnail:
								'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
							href: '/blog/uptime',
						},
						{
							category: 'Tips',
							title: '10 Productivity Hacks You Need',
							excerpt: 'Power user tips to get the most out of our platform...',
							author: 'Emily Wang',
							date: 'Mar 5, 2026',
							readTime: '4 min',
							thumbnail:
								'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80',
							href: '/blog/productivity-tips',
						},
					]}
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
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const BlogGrid = ({ posts }: { posts: BlogPost[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		{posts.map((post) => (
			<Link key={post.title} href={post.href}>
				<Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg">
					<div className="relative aspect-video overflow-hidden">
						<img
							src={post.thumbnail}
							alt={post.title}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<Badge className="absolute top-3 left-3" variant="secondary">
							{post.category}
						</Badge>
					</div>
					<CardContent className="p-5">
						<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
							{post.title}
						</h3>
						<p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<User className="size-3" />
								{post.author}
							</div>
							<div className="flex items-center gap-3">
								<span>{post.date}</span>
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									{post.readTime}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
