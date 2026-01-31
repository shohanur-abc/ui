import Link from 'next/link';
import { Clock, ChevronRight, Bookmark, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	bio: string;
}

interface ArticleProps {
	breadcrumbs: { label: string; href: string }[];
	category: string;
	title: string;
	lead: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: { type: 'paragraph' | 'quote'; text: string }[];
}

const Breadcrumbs = ({ items }: { items: { label: string; href: string }[] }) => (
	<nav className="flex items-center gap-1 text-sm text-muted-foreground">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-1">
				<Link href={item.href} className="hover:text-foreground transition-colors">
					{item.label}
				</Link>
				{index < items.length - 1 && <ChevronRight className="size-3" />}
			</div>
		))}
	</nav>
);

const CategoryTag = ({ text }: { text: string }) => (
	<Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold tracking-tight leading-[1.1]">
		{text}
	</h1>
);

const LeadParagraph = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl font-medium text-foreground/80 leading-relaxed border-l-4 border-primary pl-4 @md:pl-6">
		{text}
	</p>
);

const AuthorCard = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<Card className="border-0 bg-muted/50">
		<CardContent className="flex items-center gap-4 p-4">
			<Avatar className="size-14 ring-2 ring-background shadow-md">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<p className="font-semibold truncate">{author.name}</p>
				<p className="text-sm text-muted-foreground line-clamp-1">{author.bio}</p>
				<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
					<span>{publishDate}</span>
					<span>·</span>
					<div className="flex items-center gap-1">
						<Clock className="size-3" />
						<span>{readTime}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ArticleActions = () => (
	<div className="flex items-center gap-2">
		<Button variant="outline" size="sm" className="gap-2">
			<Bookmark className="size-4" />
			<span className="hidden @sm:inline">Save</span>
		</Button>
		<Button variant="outline" size="sm" className="gap-2">
			<Share className="size-4" />
			<span className="hidden @sm:inline">Share</span>
		</Button>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl @lg:rounded-2xl shadow-lg ring-1 ring-border/50">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
	</div>
);

const ContentBlock = ({ blocks }: { blocks: { type: 'paragraph' | 'quote'; text: string }[] }) => (
	<div className="space-y-8">
		{blocks.map((block, index) =>
			block.type === 'quote' ? (
				<blockquote
					key={index}
					className="relative pl-6 @md:pl-8 py-4 italic text-lg @md:text-xl text-foreground/80 border-l-4 border-primary/50 bg-muted/30 rounded-r-lg pr-4"
				>
					&ldquo;{block.text}&rdquo;
				</blockquote>
			) : (
				<p
					key={index}
					className="text-base @md:text-lg leading-[1.85] text-foreground/90"
				>
					{block.text}
				</p>
			)
		)}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		breadcrumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Technology', href: '/blog/technology' },
		],
		category: 'Technology',
		title: 'Understanding Quantum Computing: A Practical Introduction',
		lead: 'Quantum computing represents a fundamental shift in how we process information. This guide breaks down the core concepts without requiring a physics degree.',
		author: {
			name: 'Dr. Maya Patel',
			avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
			initials: 'MP',
			bio: 'Quantum Computing Researcher at MIT',
		},
		publishDate: 'January 22, 2026',
		readTime: '15 min read',
		heroImage:
			'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=900&fit=crop',
		heroAlt: 'Quantum computing visualization',
		content: [
			{ type: 'paragraph', text: 'Classical computers have served us remarkably well for decades, but we\'re approaching the limits of what silicon-based transistors can achieve. Quantum computing offers a radically different approach—one that harnesses the strange properties of quantum mechanics to solve problems that would take classical computers millennia.' },
			{ type: 'quote', text: 'Quantum computing isn\'t just faster—it\'s a fundamentally different way of processing information.' },
			{ type: 'paragraph', text: 'At the heart of quantum computing are qubits, the quantum equivalent of classical bits. Unlike bits, which exist as either 0 or 1, qubits can exist in a superposition of both states simultaneously. This property, combined with entanglement, gives quantum computers their extraordinary potential.' },
			{ type: 'paragraph', text: 'The applications are vast: drug discovery, cryptography, optimization problems, and climate modeling are just the beginning. As quantum hardware matures and error correction improves, we\'ll see these theoretical advantages translate into practical solutions.' },
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<div className="flex items-center justify-between flex-wrap gap-4">
						<Breadcrumbs items={articleData.breadcrumbs} />
						<ArticleActions />
					</div>

					<div className="flex flex-col gap-4 @md:gap-6">
						<CategoryTag text={articleData.category} />
						<Title text={articleData.title} />
						<LeadParagraph text={articleData.lead} />
					</div>

					<AuthorCard
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>

					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />

					<div className="mt-4 @md:mt-8">
						<ContentBlock blocks={articleData.content} />
					</div>
				</div>
			</div>
		</section>
	);
}
