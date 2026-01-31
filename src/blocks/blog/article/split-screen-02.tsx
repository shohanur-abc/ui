import Link from 'next/link';
import { Clock, Calendar, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface ArticleProps {
	categories: { label: string; href: string }[];
	title: string;
	excerpt: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	stats: { likes: number; comments: number };
}

const Categories = ({ items }: { items: { label: string; href: string }[] }) => (
	<div className="flex flex-wrap gap-2">
		{items.map((item, index) => (
			<Badge
				key={index}
				variant="outline"
				className="hover:bg-accent transition-colors"
				asChild
			>
				<Link href={item.href}>{item.label}</Link>
			</Badge>
		))}
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text}
	</h1>
);

const Excerpt = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
		{text}
	</p>
);

const MetaInfo = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center gap-4 @sm:gap-6">
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<span className="font-medium">{author.name}</span>
		</div>
		<div className="flex items-center gap-4 text-sm text-muted-foreground">
			<div className="flex items-center gap-1.5">
				<Calendar className="size-4" />
				<span>{publishDate}</span>
			</div>
			<div className="flex items-center gap-1.5">
				<Clock className="size-4" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const HeroImageSection = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] @lg:aspect-video overflow-hidden rounded-2xl shadow-2xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
	</div>
);

const ArticleBody = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @lg:text-lg leading-[1.8] text-foreground/85 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-primary first:first-letter:block [&:not(:first-child)]:first-letter:hidden [&:not(:first-child)]:first-letter:text-base [&:not(:first-child)]:first-letter:font-normal [&:not(:first-child)]:first-letter:float-none [&:not(:first-child)]:first-letter:mr-0"
			>
				{paragraph}
			</p>
		))}
	</div>
);

const EngagementBar = ({ likes, comments }: { likes: number; comments: number }) => (
	<div className="flex items-center gap-4 pt-6 border-t border-border">
		<Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
			<Heart className="size-4" />
			<span>{likes}</span>
		</Button>
		<Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
			<MessageCircle className="size-4" />
			<span>{comments}</span>
		</Button>
		<Button variant="ghost" size="sm" className="ml-auto gap-2">
			<span>Share</span>
			<ArrowUpRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		categories: [
			{ label: 'Design', href: '/blog/category/design' },
			{ label: 'Development', href: '/blog/category/development' },
		],
		title: 'Building Design Systems That Scale Across Organizations',
		excerpt:
			'A comprehensive guide to creating, maintaining, and evolving design systems that work for teams of all sizes.',
		author: {
			name: 'Alex Chen',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'AC',
		},
		publishDate: 'Jan 20, 2026',
		readTime: '12 min',
		heroImage:
			'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&h=900&fit=crop',
		heroAlt: 'Design system components and patterns',
		content: [
			'Design systems have become the backbone of modern product development. They provide a shared language between designers and developers, ensuring consistency across products and reducing the time spent on repetitive decisions.',
			'Building a successful design system requires more than just a component library. It demands thoughtful governance, clear documentation, and a commitment to continuous improvement. The most effective systems evolve alongside the products they support.',
			'Token-based architecture forms the foundation of scalable design systems. By abstracting design decisions into semantic tokens, teams can make sweeping changes with minimal effort. Colors, spacing, typography—all can be adjusted at the token level and propagate throughout the entire system.',
			'Adoption is perhaps the greatest challenge. A design system is only valuable if people use it. This requires investment in education, tooling, and developer experience. The goal is to make the right choice the easy choice.',
		],
		stats: { likes: 247, comments: 34 },
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 @xl:gap-16 items-start">
					<div className="flex flex-col gap-6 @lg:sticky @lg:top-8">
						<Categories items={articleData.categories} />
						<Title text={articleData.title} />
						<Excerpt text={articleData.excerpt} />
						<MetaInfo
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
						/>
						<HeroImageSection src={articleData.heroImage} alt={articleData.heroAlt} />
					</div>

					<div className="flex flex-col gap-8 @lg:pt-4">
						<ArticleBody paragraphs={articleData.content} />
						<EngagementBar likes={articleData.stats.likes} comments={articleData.stats.comments} />
					</div>
				</div>
			</div>
		</section>
	);
}
