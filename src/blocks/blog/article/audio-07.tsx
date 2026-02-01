import Link from 'next/link';
import { Clock, Play, Volume2, Headphones } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface AudioProps {
	duration: string;
	progress: number;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	excerpt: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	audio: AudioProps;
	heroImage: string;
	heroAlt: string;
	content: { heading: string; paragraphs: string[] }[];
}

const CategoryLabel = ({ text, href }: { text: string; href: string }) => (
	<Badge
		variant="outline"
		className="gap-1.5 text-xs uppercase tracking-wider"
		asChild
	>
		<Link href={href}>
			<span className="size-1.5 rounded-full bg-primary animate-pulse" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-[1.1]">
		{text}
	</h1>
);

const Excerpt = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
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
	<div className="flex items-center gap-4 flex-wrap">
		<div className="flex items-center gap-2">
			<Avatar className="size-9">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<span className="text-sm font-medium">{author.name}</span>
		</div>
		<Separator orientation="vertical" className="h-4" />
		<span className="text-sm text-muted-foreground">{publishDate}</span>
		<div className="flex items-center gap-1 text-sm text-muted-foreground">
			<Clock className="size-3.5" />
			<span>{readTime}</span>
		</div>
	</div>
);

const AudioPlayer = ({ duration, progress }: AudioProps) => (
	<Card className="border-primary/20 bg-primary/5">
		<CardContent className="flex items-center gap-4 p-4">
			<Button size="icon" className="shrink-0 rounded-full size-12 shadow-lg">
				<Play className="size-5 ml-0.5" />
			</Button>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-2">
					<Headphones className="size-4 text-primary" />
					<span className="text-sm font-medium">Listen to this article</span>
				</div>
				<div className="flex items-center gap-3">
					<Progress value={progress} className="flex-1 h-1.5" />
					<span className="text-xs text-muted-foreground shrink-0">
						{duration}
					</span>
				</div>
			</div>
			<Button variant="ghost" size="icon-sm" className="shrink-0">
				<Volume2 className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
	</div>
);

const ContentSection = ({
	sections,
}: {
	sections: { heading: string; paragraphs: string[] }[];
}) => (
	<div className="space-y-10 @md:space-y-14">
		{sections.map((section, sectionIndex) => (
			<div key={sectionIndex} className="space-y-4">
				<h2 className="text-xl @md:text-2xl font-bold tracking-tight">
					{section.heading}
				</h2>
				{section.paragraphs.map((paragraph, paragraphIndex) => (
					<p
						key={paragraphIndex}
						className="text-base @md:text-lg leading-[1.85] text-foreground/85"
					>
						{paragraph}
					</p>
				))}
			</div>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Science',
		categoryHref: '/blog/category/science',
		title: 'Breakthrough in Fusion Energy: What It Means for Our Future',
		excerpt:
			"Recent achievements in fusion research have brought us closer than ever to clean, virtually limitless energy. Here's what you need to know.",
		author: {
			name: 'Dr. Rachel Kim',
			avatar:
				'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
			initials: 'RK',
		},
		publishDate: 'February 1, 2026',
		readTime: '14 min read',
		audio: {
			duration: '12:34',
			progress: 0,
		},
		heroImage:
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop',
		heroAlt: 'Fusion reactor plasma visualization',
		content: [
			{
				heading: 'The Promise of Fusion',
				paragraphs: [
					'For decades, fusion energy has been the holy grail of power generation—always twenty years away, as the joke goes. But recent breakthroughs have shattered that timeline, bringing commercial fusion within reach.',
					'Unlike fission, which splits atoms, fusion combines them, mimicking the process that powers the sun. The fuel is abundant (hydrogen isotopes from seawater), the process produces no carbon emissions, and the waste is minimal compared to traditional nuclear power.',
				],
			},
			{
				heading: 'Recent Milestones',
				paragraphs: [
					'Last year\'s achievement at the National Ignition Facility marked a turning point: for the first time, a fusion reaction produced more energy than was used to initiate it. This "ignition" milestone had eluded scientists for decades.',
					'Private companies are racing to capitalize on these advances. Dozens of fusion startups, backed by billions in investment, are pursuing various approaches—from magnetic confinement to laser-driven reactions.',
				],
			},
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<CategoryLabel
						text={articleData.category}
						href={articleData.categoryHref}
					/>
					<Title text={articleData.title} />
					<Excerpt text={articleData.excerpt} />
					<MetaInfo
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<AudioPlayer
						duration={articleData.audio.duration}
						progress={articleData.audio.progress}
					/>
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<Separator className="my-4" />
					<ContentSection sections={articleData.content} />
				</div>
			</div>
		</section>
	);
}
