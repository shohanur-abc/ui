import Link from 'next/link';
import { Clock, ArrowLeft, Share2, Bookmark, type LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	role?: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	backHref: string;
	backLabel: string;
}

const BackLink = ({ href, label }: { href: string; label: string }) => (
	<Link
		href={href}
		className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
	>
		<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
		<span>{label}</span>
	</Link>
);

const CategoryBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge
		variant="secondary"
		className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
		asChild
	>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const AuthorInfo = ({ author, publishDate, readTime }: { author: AuthorProps; publishDate: string; readTime: string }) => (
	<div className="flex items-center gap-4">
		<Avatar className="size-12 ring-2 ring-border">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary text-primary-foreground font-medium">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex flex-col">
			<span className="font-medium">{author.name}</span>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<span>{publishDate}</span>
				<span>·</span>
				<div className="flex items-center gap-1">
					<Clock className="size-3.5" />
					<span>{readTime}</span>
				</div>
			</div>
		</div>
	</div>
);

const ActionButtons = () => (
	<div className="flex items-center gap-2">
		<Button variant="ghost" size="icon" className="rounded-full">
			<Share2 className="size-4" />
		</Button>
		<Button variant="ghost" size="icon" className="rounded-full">
			<Bookmark className="size-4" />
		</Button>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video @lg:aspect-[21/9] overflow-hidden rounded-xl @lg:rounded-2xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
	</div>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="prose prose-lg dark:prose-invert max-w-none">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-relaxed text-foreground/90 mb-6 last:mb-0"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Technology',
		categoryHref: '/blog/category/technology',
		title: 'The Future of Artificial Intelligence in Everyday Life',
		subtitle:
			'Exploring how AI is transforming the way we live, work, and interact with the world around us.',
		author: {
			name: 'Sarah Mitchell',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			initials: 'SM',
			role: 'Senior Tech Writer',
		},
		publishDate: 'January 15, 2026',
		readTime: '8 min read',
		heroImage:
			'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop',
		heroAlt: 'Abstract AI visualization with neural networks',
		content: [
			'Artificial intelligence has moved beyond the realm of science fiction and into our daily routines. From the moment we wake up to personalized alarm recommendations to the curated content we consume throughout the day, AI systems are quietly orchestrating much of our modern experience.',
			'The transformation is particularly evident in how we communicate. Natural language processing has evolved to a point where conversations with AI assistants feel remarkably human. These systems understand context, remember preferences, and adapt their responses to match our communication styles.',
			'In healthcare, AI is revolutionizing diagnostics and treatment planning. Machine learning algorithms can now detect patterns in medical imaging that might escape even the most trained human eye, leading to earlier diagnoses and more effective interventions.',
			'The workplace has also been fundamentally altered. Routine tasks that once consumed hours of human effort are now automated, freeing workers to focus on creative and strategic endeavors. This shift demands new skills and a willingness to adapt, but it also opens doors to unprecedented productivity.',
		],
		backHref: '/blog',
		backLabel: 'Back to Blog',
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="mb-8">
					<BackLink href={articleData.backHref} label={articleData.backLabel} />
				</div>

				<div className="flex flex-col gap-6 @md:gap-8 mb-8 @md:mb-12">
					<CategoryBadge text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />

					<div className="flex items-center justify-between flex-wrap gap-4">
						<AuthorInfo
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
						/>
						<ActionButtons />
					</div>
				</div>

				<div className="mb-10 @md:mb-14">
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
				</div>

				<Separator className="mb-10 @md:mb-14" />

				<ArticleContent paragraphs={articleData.content} />
			</div>
		</section>
	);
}
