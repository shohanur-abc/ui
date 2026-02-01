import Link from 'next/link';
import {
	Clock,
	ArrowLeft,
	Heart,
	Bookmark,
	Send,
	MoreHorizontal,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	followers: string;
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
	likes: number;
	backHref: string;
}

const TopBar = ({ href }: { href: string }) => (
	<div className="flex items-center justify-between py-4 border-b border-border">
		<Button variant="ghost" size="sm" className="gap-2" asChild>
			<Link href={href}>
				<ArrowLeft className="size-4" />
				<span>Back</span>
			</Link>
		</Button>
		<Button variant="ghost" size="icon-sm">
			<MoreHorizontal className="size-4" />
		</Button>
	</div>
);

const CategoryPill = ({ text, href }: { text: string; href: string }) => (
	<Badge
		variant="secondary"
		className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
		asChild
	>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-extrabold tracking-tight text-center leading-[1.15]">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const AuthorSection = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-center justify-center gap-4">
		<Avatar className="size-12 ring-2 ring-primary/20">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div className="text-left">
			<div className="flex items-center gap-2">
				<span className="font-semibold">{author.name}</span>
				<Button
					variant="link"
					size="sm"
					className="h-auto p-0 text-primary text-xs"
				>
					Follow
				</Button>
			</div>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span>{author.followers} followers</span>
				<span>·</span>
				<span>{publishDate}</span>
				<span>·</span>
				<div className="flex items-center gap-1">
					<Clock className="size-3" />
					<span>{readTime}</span>
				</div>
			</div>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[3/2] @lg:aspect-video overflow-hidden rounded-2xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
	</div>
);

const ArticleBody = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6 text-foreground/90">
		{paragraphs.map((paragraph, index) => (
			<p key={index} className="text-base @md:text-lg leading-[1.9]">
				{paragraph}
			</p>
		))}
	</div>
);

const FloatingActions = ({ likes }: { likes: number }) => (
	<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
		<div className="flex items-center gap-1 bg-card/95 backdrop-blur-md border border-border rounded-full px-2 py-1.5 shadow-2xl">
			<Button
				variant="ghost"
				size="sm"
				className="gap-1.5 rounded-full hover:bg-destructive/10 hover:text-destructive"
			>
				<Heart className="size-4" />
				<span className="text-xs">{likes}</span>
			</Button>
			<Button variant="ghost" size="icon-sm" className="rounded-full">
				<Bookmark className="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm" className="rounded-full">
				<Send className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Lifestyle',
		categoryHref: '/blog/category/lifestyle',
		title: 'The Art of Intentional Living in a Hyperconnected World',
		subtitle:
			'Reclaiming focus, presence, and meaning in an age of infinite distraction.',
		author: {
			name: 'Marcus Chen',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			initials: 'MC',
			followers: '45.2k',
		},
		publishDate: 'Jan 30, 2026',
		readTime: '7 min',
		heroImage:
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
		heroAlt: 'Peaceful mountain landscape at sunrise',
		content: [
			'We live in an age of unprecedented abundance—of information, entertainment, and connection. Yet paradoxically, many of us feel more distracted, anxious, and disconnected than ever before. The constant ping of notifications, the endless scroll of feeds, and the pressure to be always available have left us perpetually fragmented.',
			"Intentional living offers an alternative. It's not about rejecting technology or retreating from modern life. Rather, it's about consciously choosing how we spend our attention—our most precious and finite resource. It's about designing our environment, habits, and relationships to align with what truly matters.",
			'The journey begins with awareness. Notice how you spend your time. Observe which activities energize you and which leave you depleted. Pay attention to the moments when you reach for your phone out of habit rather than necessity. This awareness, uncomfortable as it may be, is the foundation of change.',
			"From awareness comes action: curating your digital environment, establishing boundaries, creating rituals that anchor your day. The goal isn't perfection—it's progress. Small, consistent steps toward a life that reflects your values rather than defaulting to the paths of least resistance.",
		],
		likes: 1847,
		backHref: '/blog',
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 pb-24">
				<TopBar href={articleData.backHref} />

				<div className="flex flex-col gap-6 @md:gap-8 py-8 @md:py-12">
					<div className="flex flex-col items-center gap-6">
						<CategoryPill
							text={articleData.category}
							href={articleData.categoryHref}
						/>
						<Title text={articleData.title} />
						<Subtitle text={articleData.subtitle} />
						<AuthorSection
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
						/>
					</div>

					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />

					<ArticleBody paragraphs={articleData.content} />
				</div>

				<FloatingActions likes={articleData.likes} />
			</div>
		</section>
	);
}
