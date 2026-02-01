import Link from 'next/link';
import { Clock, Eye, TrendingUp, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	views: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	relatedTopics: { label: string; href: string }[];
}

const CategoryBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge
		variant="default"
		className="rounded-sm uppercase text-[10px] tracking-wider font-semibold"
		asChild
	>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-black tracking-tight leading-none">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground font-light leading-relaxed">
		{text}
	</p>
);

const MetaRow = ({
	author,
	publishDate,
	readTime,
	views,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	views: string;
}) => (
	<div className="flex flex-wrap items-center gap-4 @md:gap-6 text-sm">
		<div className="flex items-center gap-2">
			<Avatar className="size-8">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-xs bg-primary/10 text-primary">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<span className="font-medium">{author.name}</span>
		</div>
		<Separator orientation="vertical" className="h-4 hidden @sm:block" />
		<span className="text-muted-foreground">{publishDate}</span>
		<div className="flex items-center gap-1 text-muted-foreground">
			<Clock className="size-3.5" />
			<span>{readTime}</span>
		</div>
		<div className="flex items-center gap-1 text-muted-foreground">
			<Eye className="size-3.5" />
			<span>{views}</span>
		</div>
	</div>
);

const HeroImageOverlay = ({
	src,
	alt,
	category,
	categoryHref,
}: {
	src: string;
	alt: string;
	category: string;
	categoryHref: string;
}) => (
	<div className="relative aspect-[16/10] @lg:aspect-[21/9] overflow-hidden rounded-2xl @xl:rounded-3xl group">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
		<div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 @xl:p-10">
			<CategoryBadge text={category} href={categoryHref} />
		</div>
	</div>
);

const DropCapParagraph = ({
	text,
	isFirst,
}: {
	text: string;
	isFirst: boolean;
}) => (
	<p
		className={`text-base @md:text-lg leading-[1.9] text-foreground/90 ${
			isFirst
				? 'first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-primary'
				: ''
		}`}
	>
		{text}
	</p>
);

const ContentSection = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6 @md:space-y-8">
		{paragraphs.map((paragraph, index) => (
			<DropCapParagraph key={index} text={paragraph} isFirst={index === 0} />
		))}
	</div>
);

const RelatedTopics = ({
	topics,
}: {
	topics: { label: string; href: string }[];
}) => (
	<div className="flex flex-col gap-4 pt-8 border-t border-border">
		<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
			<TrendingUp className="size-4" />
			<span>Related Topics</span>
		</div>
		<div className="flex flex-wrap gap-2">
			{topics.map((topic, index) => (
				<Button
					key={index}
					variant="secondary"
					size="sm"
					className="rounded-full gap-1.5 group"
					asChild
				>
					<Link href={topic.href}>
						{topic.label}
						<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
					</Link>
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Business',
		categoryHref: '/blog/category/business',
		title:
			'The Remote Work Revolution: Strategies for Building Distributed Teams',
		subtitle:
			'How leading companies are reimagining collaboration, culture, and productivity in a post-office world.',
		author: {
			name: 'James Rodriguez',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'JR',
		},
		publishDate: 'Jan 25, 2026',
		readTime: '10 min',
		views: '12.4k views',
		heroImage:
			'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=900&fit=crop',
		heroAlt: 'Modern remote work setup with laptop and coffee',
		content: [
			'The shift to remote work, accelerated by global events, has fundamentally altered how organizations operate. What began as a necessity has evolved into a strategic advantage for companies willing to embrace distributed work models.',
			"Successful remote teams don't happen by accident. They require intentional design across multiple dimensions: communication protocols, async-first workflows, and deliberate culture building. The most effective distributed organizations treat remote work as their primary mode, not an accommodation.",
			'Technology enables remote work, but culture sustains it. Companies thriving in this new paradigm invest heavily in documentation, reduce meeting overload, and create space for serendipitous connection. They understand that proximity is no longer a prerequisite for collaboration.',
			'The talent implications are profound. Geographic constraints no longer limit hiring, opening access to global talent pools. For employees, remote work offers unprecedented flexibility and autonomy. The future belongs to organizations that master this new way of working.',
		],
		relatedTopics: [
			{ label: 'Leadership', href: '/blog/topic/leadership' },
			{ label: 'Productivity', href: '/blog/topic/productivity' },
			{ label: 'Team Building', href: '/blog/topic/team-building' },
			{ label: 'Future of Work', href: '/blog/topic/future-of-work' },
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-8 @md:gap-12">
					<HeroImageOverlay
						src={articleData.heroImage}
						alt={articleData.heroAlt}
						category={articleData.category}
						categoryHref={articleData.categoryHref}
					/>

					<div className="flex flex-col gap-4 @md:gap-6 max-w-4xl">
						<Title text={articleData.title} />
						<Subtitle text={articleData.subtitle} />
						<MetaRow
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
							views={articleData.views}
						/>
					</div>

					<Separator />

					<div className="max-w-3xl">
						<ContentSection paragraphs={articleData.content} />
						<RelatedTopics topics={articleData.relatedTopics} />
					</div>
				</div>
			</div>
		</section>
	);
}
