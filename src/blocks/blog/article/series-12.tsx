import Link from 'next/link';
import { Clock, BookOpen, Hash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	role: string;
}

interface ArticleProps {
	seriesName: string;
	seriesHref: string;
	partNumber: number;
	totalParts: number;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	nextPart?: { title: string; href: string };
}

const SeriesIndicator = ({
	name,
	href,
	partNumber,
	totalParts,
}: {
	name: string;
	href: string;
	partNumber: number;
	totalParts: number;
}) => (
	<div className="flex items-center gap-3 p-3 @md:p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-center justify-center size-10 rounded-lg bg-primary text-primary-foreground font-bold">
			<Hash className="size-5" />
		</div>
		<div className="flex-1 min-w-0">
			<Link href={href} className="text-sm font-semibold text-primary hover:underline">
				{name}
			</Link>
			<p className="text-xs text-muted-foreground">
				Part {partNumber} of {totalParts}
			</p>
		</div>
		<div className="flex gap-1">
			{Array.from({ length: totalParts }).map((_, i) => (
				<div
					key={i}
					className={`size-2 rounded-full ${
						i < partNumber ? 'bg-primary' : 'bg-muted'
					}`}
				/>
			))}
		</div>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground leading-relaxed">
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
	<div className="flex items-center gap-4">
		<Avatar className="size-12 ring-2 ring-border">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-semibold">{author.name}</p>
			<p className="text-sm text-muted-foreground">{author.role}</p>
		</div>
		<Separator orientation="vertical" className="h-8 mx-2" />
		<div className="flex flex-col text-sm text-muted-foreground">
			<span>{publishDate}</span>
			<div className="flex items-center gap-1">
				<Clock className="size-3" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-2xl" />
	</div>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.9] text-foreground/90"
			>
				{paragraph}
			</p>
		))}
	</div>
);

const NextPartCTA = ({ title, href }: { title: string; href: string }) => (
	<div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
		<p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
			Continue Reading
		</p>
		<p className="text-xl font-bold mb-4">{title}</p>
		<Button asChild>
			<Link href={href} className="gap-2">
				<BookOpen className="size-4" />
				Read Next Part
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		seriesName: 'Foundations of Product Design',
		seriesHref: '/blog/series/product-design',
		partNumber: 2,
		totalParts: 5,
		title: 'User Research: Uncovering Real Needs',
		subtitle:
			'How to conduct effective user research that reveals genuine problems worth solving, not just surface-level preferences.',
		author: {
			name: 'Christina Park',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
			initials: 'CP',
			role: 'Product Design Lead',
		},
		publishDate: 'January 22, 2026',
		readTime: '12 min read',
		heroImage:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=700&fit=crop',
		heroAlt: 'User research session with sticky notes',
		content: [
			'User research is the foundation upon which successful products are built. Yet it remains one of the most misunderstood aspects of the design process. Too often, research is treated as a checkbox—something to complete before the "real" work of design begins.',
			'Effective research is not about asking users what they want. People are notoriously bad at articulating their own needs and predicting their future behavior. Instead, research should focus on observing what people do, understanding the context of their lives, and identifying the gaps between their goals and current reality.',
			'The best researchers approach their work with genuine curiosity and humility. They recognize that their assumptions—no matter how informed—are just hypotheses waiting to be tested. This mindset shift, from expert to learner, is essential for uncovering insights that actually matter.',
			'Synthesis is where research becomes actionable. Raw data—interview transcripts, observation notes, survey responses—must be transformed into patterns and insights that can guide design decisions. This is both art and science, requiring analytical rigor and creative interpretation.',
		],
		nextPart: {
			title: 'Part 3: Information Architecture & Navigation',
			href: '/blog/product-design/part-3',
		},
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<SeriesIndicator
						name={articleData.seriesName}
						href={articleData.seriesHref}
						partNumber={articleData.partNumber}
						totalParts={articleData.totalParts}
					/>

					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />

					<AuthorSection
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>

					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />

					<Separator />

					<ArticleContent paragraphs={articleData.content} />

					{articleData.nextPart && (
						<>
							<Separator />
							<NextPartCTA title={articleData.nextPart.title} href={articleData.nextPart.href} />
						</>
					)}
				</div>
			</div>
		</section>
	);
}
