import Link from 'next/link';
import { Clock, Printer, TextSelect, Minus, Plus } from 'lucide-react';
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
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	wordCount: number;
}

const ReadabilityTools = ({ wordCount }: { wordCount: number }) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
		<div className="flex items-center gap-4 text-muted-foreground">
			<span>{wordCount.toLocaleString()} words</span>
		</div>
		<div className="flex items-center gap-1">
			<span className="text-xs text-muted-foreground mr-2">Text size</span>
			<Button variant="ghost" size="icon-sm" className="size-7">
				<Minus className="size-3" />
			</Button>
			<Button variant="ghost" size="icon-sm" className="size-7">
				<Plus className="size-3" />
			</Button>
			<Separator orientation="vertical" className="h-4 mx-2" />
			<Button variant="ghost" size="icon-sm" className="size-7">
				<TextSelect className="size-3.5" />
			</Button>
			<Button variant="ghost" size="icon-sm" className="size-7">
				<Printer className="size-3.5" />
			</Button>
		</div>
	</div>
);

const Category = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="outline" className="font-medium" asChild>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight font-serif">
		{text}
	</h1>
);

const AuthorLine = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-center gap-3 text-sm">
		<Avatar className="size-8">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="text-xs bg-muted font-medium">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<span className="font-medium">{author.name}</span>
		<span className="text-muted-foreground">·</span>
		<span className="text-muted-foreground">{publishDate}</span>
		<span className="text-muted-foreground">·</span>
		<div className="flex items-center gap-1 text-muted-foreground">
			<Clock className="size-3" />
			<span>{readTime}</span>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<figure>
		<div className="relative aspect-video overflow-hidden rounded-xl">
			<img
				src={src}
				alt={alt}
				className="absolute inset-0 size-full object-cover"
			/>
		</div>
		<figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
			{alt}
		</figcaption>
	</figure>
);

const LongformContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-8">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-lg @md:text-xl leading-[2] text-foreground/85 font-serif"
			>
				{paragraph}
			</p>
		))}
	</div>
);

const ChapterMarker = ({ number, title }: { number: number; title: string }) => (
	<div className="flex items-center gap-4 py-8">
		<div className="flex items-center justify-center size-12 rounded-full border-2 border-primary text-primary font-bold text-lg">
			{number}
		</div>
		<h2 className="text-2xl @md:text-3xl font-bold font-serif">{title}</h2>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Essays',
		categoryHref: '/blog/category/essays',
		title: 'The Paradox of Choice in the Digital Age',
		author: {
			name: 'Oliver Grant',
			avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
			initials: 'OG',
		},
		publishDate: 'January 18, 2026',
		readTime: '25 min read',
		heroImage:
			'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop',
		heroAlt: 'Abstract representation of infinite choices',
		content: [
			'We live in an era of unprecedented abundance. Never before in human history have so many choices been available to so many people. Yet paradoxically, this abundance often leaves us feeling more anxious, more dissatisfied, and more paralyzed than ever before.',
			'The psychologist Barry Schwartz first identified this phenomenon in his seminal work "The Paradox of Choice." His research demonstrated that while some choice is essential for autonomy and well-being, too much choice can be debilitating. The mental effort required to evaluate options, the opportunity cost of paths not taken, and the tendency to blame ourselves for imperfect outcomes all conspire to undermine our satisfaction.',
			'The digital revolution has amplified this paradox exponentially. Where once we chose from a handful of options at a local store, we now face millions of products, services, and experiences accessible with a few keystrokes. Algorithms designed to expand our horizons often succeed only in expanding our anxiety.',
			'The solution is not to retreat from choice but to become more intentional about how we engage with it. This requires developing what we might call choice hygiene—practices and principles that help us navigate abundance without being overwhelmed by it.',
		],
		wordCount: 4850,
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<Category text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<AuthorLine
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<ReadabilityTools wordCount={articleData.wordCount} />
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<Separator />
					<ChapterMarker number={1} title="The Abundance Problem" />
					<LongformContent paragraphs={articleData.content} />
				</div>
			</div>
		</section>
	);
}
