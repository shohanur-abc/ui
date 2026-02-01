import Link from 'next/link';
import {
	Clock,
	MessageSquare,
	ThumbsUp,
	Bookmark,
	Share2,
	MoreVertical,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	bio: string;
	followers: string;
}

interface EngagementProps {
	likes: number;
	comments: number;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	lead: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	engagement: EngagementProps;
}

const CategoryChip = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="default" className="rounded-md text-xs font-semibold" asChild>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const LeadText = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground font-medium leading-relaxed">
		{text}
	</p>
);

const AuthorHeader = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-start justify-between gap-4">
		<div className="flex items-center gap-3">
			<Avatar className="size-12 ring-2 ring-border">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<div className="flex items-center gap-2">
					<span className="font-semibold">{author.name}</span>
					<Button
						variant="outline"
						size="sm"
						className="h-7 text-xs rounded-full"
					>
						Follow
					</Button>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>{publishDate}</span>
					<span>·</span>
					<div className="flex items-center gap-1">
						<Clock className="size-3" />
						<span>{readTime}</span>
					</div>
				</div>
			</div>
		</div>
		<Button variant="ghost" size="icon-sm">
			<MoreVertical className="size-4" />
		</Button>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
	</div>
);

const EngagementBar = ({ engagement }: { engagement: EngagementProps }) => (
	<div className="flex items-center justify-between py-3 border-y border-border">
		<div className="flex items-center gap-4">
			<Button
				variant="ghost"
				size="sm"
				className="gap-2 text-muted-foreground hover:text-foreground"
			>
				<ThumbsUp className="size-4" />
				<span className="text-sm">{engagement.likes}</span>
			</Button>
			<Button
				variant="ghost"
				size="sm"
				className="gap-2 text-muted-foreground hover:text-foreground"
			>
				<MessageSquare className="size-4" />
				<span className="text-sm">{engagement.comments}</span>
			</Button>
		</div>
		<div className="flex items-center gap-1">
			<Button variant="ghost" size="icon-sm">
				<Bookmark className="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm">
				<Share2 className="size-4" />
			</Button>
		</div>
	</div>
);

const ArticleBody = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.85] text-foreground/90"
			>
				{paragraph}
			</p>
		))}
	</div>
);

const AuthorCard = ({ author }: { author: AuthorProps }) => (
	<Card className="bg-muted/40 border-0">
		<CardHeader className="pb-3">
			<p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
				Written by
			</p>
		</CardHeader>
		<CardContent className="flex items-start gap-4">
			<Avatar className="size-16 ring-4 ring-background shadow-md">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground font-bold">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<p className="font-semibold text-lg">{author.name}</p>
				<p className="text-sm text-muted-foreground mb-2">
					{author.followers} followers
				</p>
				<p className="text-sm text-foreground/80 line-clamp-2">{author.bio}</p>
				<Button variant="default" size="sm" className="mt-3">
					Follow
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Health',
		categoryHref: '/blog/category/health',
		title:
			'The Science of Sleep: Why Rest Is Your Greatest Performance Enhancer',
		lead: "Modern research reveals that quality sleep isn't just about recovery—it's the foundation of cognitive performance, emotional resilience, and physical health.",
		author: {
			name: 'Dr. Michael Torres',
			avatar:
				'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
			initials: 'MT',
			bio: 'Sleep researcher and neuroscientist. Author of "The Rested Mind." Helping people understand the power of quality sleep.',
			followers: '127k',
		},
		publishDate: 'January 26, 2026',
		readTime: '10 min read',
		heroImage:
			'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=1600&h=900&fit=crop',
		heroAlt: 'Person sleeping peacefully',
		content: [
			'In our always-on culture, sleep is often the first sacrifice we make in pursuit of productivity. We wear our sleep deprivation as a badge of honor, as if getting by on less rest somehow demonstrates our commitment or resilience. The science tells a very different story.',
			'Every major system in your body is affected by sleep. Your brain consolidates memories and clears metabolic waste during sleep. Your immune system produces cytokines that fight infection and inflammation. Your cardiovascular system gets a chance to recover from the demands of waking life.',
			'The cognitive effects of sleep deprivation are particularly striking. After just one night of poor sleep, reaction times slow, decision-making becomes impaired, and emotional regulation suffers. Chronic sleep restriction—getting just an hour or two less than you need each night—accumulates into significant cognitive debt.',
			'The good news is that sleep is modifiable. With the right knowledge and habits, most people can dramatically improve their sleep quality. The returns on this investment—in energy, focus, mood, and health—are profound.',
		],
		engagement: {
			likes: 892,
			comments: 67,
		},
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<CategoryChip
						text={articleData.category}
						href={articleData.categoryHref}
					/>
					<Title text={articleData.title} />
					<LeadText text={articleData.lead} />
					<AuthorHeader
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<EngagementBar engagement={articleData.engagement} />
					<ArticleBody paragraphs={articleData.content} />
					<Separator className="my-4" />
					<AuthorCard author={articleData.author} />
				</div>
			</div>
		</section>
	);
}
