import Link from 'next/link';
import { Clock, Tag, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	role: string;
	twitter?: string;
	linkedin?: string;
}

interface ArticleProps {
	tags: string[];
	title: string;
	publishDate: string;
	readTime: string;
	author: AuthorProps;
	heroImage: string;
	heroAlt: string;
	content: string[];
	tableOfContents: { id: string; title: string }[];
}

const TagList = ({ tags }: { tags: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{tags.map((tag, index) => (
			<Badge key={index} variant="outline" className="text-xs font-normal">
				<Tag className="size-3 mr-1" />
				{tag}
			</Badge>
		))}
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const PublishInfo = ({ date, readTime }: { date: string; readTime: string }) => (
	<div className="flex items-center gap-3 text-sm text-muted-foreground">
		<span>{date}</span>
		<span>·</span>
		<div className="flex items-center gap-1">
			<Clock className="size-3.5" />
			<span>{readTime}</span>
		</div>
	</div>
);

const AuthorSidebar = ({ author }: { author: AuthorProps }) => (
	<Card className="sticky top-8 border-0 shadow-lg bg-card/80 backdrop-blur-sm">
		<CardHeader className="items-center text-center pb-4">
			<Avatar className="size-20 ring-4 ring-primary/10 shadow-xl">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground font-bold">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div className="pt-3">
				<p className="font-semibold text-lg">{author.name}</p>
				<p className="text-sm text-muted-foreground">{author.role}</p>
			</div>
		</CardHeader>
		<CardContent className="flex justify-center gap-2">
			{author.twitter && (
				<Button variant="ghost" size="icon" className="rounded-full" asChild>
					<Link href={author.twitter}>
						<Twitter className="size-4" />
					</Link>
				</Button>
			)}
			{author.linkedin && (
				<Button variant="ghost" size="icon" className="rounded-full" asChild>
					<Link href={author.linkedin}>
						<Linkedin className="size-4" />
					</Link>
				</Button>
			)}
			<Button variant="ghost" size="icon" className="rounded-full">
				<Link2 className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

const TableOfContents = ({ items }: { items: { id: string; title: string }[] }) => (
	<Card className="sticky top-36 border-0 bg-muted/40">
		<CardHeader className="pb-3">
			<p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
				Contents
			</p>
		</CardHeader>
		<CardContent className="pt-0">
			<nav className="flex flex-col gap-2">
				{items.map((item, index) => (
					<Link
						key={item.id}
						href={`#${item.id}`}
						className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3 -ml-px"
					>
						<span className="text-xs text-muted-foreground/60 mr-2">{String(index + 1).padStart(2, '0')}</span>
						{item.title}
					</Link>
				))}
			</nav>
		</CardContent>
	</Card>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
	</div>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @lg:text-lg leading-relaxed text-foreground/85"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		tags: ['Machine Learning', 'Neural Networks', 'Research'],
		title: 'Transformer Architectures: The Building Blocks of Modern AI',
		publishDate: 'January 28, 2026',
		readTime: '18 min read',
		author: {
			name: 'Dr. Emily Watson',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'EW',
			role: 'AI Research Scientist',
			twitter: 'https://twitter.com',
			linkedin: 'https://linkedin.com',
		},
		heroImage:
			'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=900&fit=crop',
		heroAlt: 'Neural network visualization',
		content: [
			'The transformer architecture, introduced in the seminal "Attention Is All You Need" paper, has fundamentally reshaped the landscape of artificial intelligence. Its elegant design replaced recurrent mechanisms with self-attention, enabling unprecedented parallelization and scale.',
			'At the core of transformers lies the attention mechanism—a method for computing dynamic, content-based relationships between elements in a sequence. This allows models to capture long-range dependencies that were previously difficult for recurrent networks to learn.',
			'The encoder-decoder structure provides flexibility for various tasks. Encoder-only models excel at understanding (BERT), decoder-only models dominate generation (GPT), and full encoder-decoder architectures handle sequence-to-sequence tasks like translation.',
			'Scaling laws have revealed a remarkable property: transformer performance improves predictably with increased compute, data, and parameters. This observation has driven the development of increasingly large models, each pushing the boundaries of what AI can achieve.',
		],
		tableOfContents: [
			{ id: 'introduction', title: 'Introduction to Transformers' },
			{ id: 'attention', title: 'The Attention Mechanism' },
			{ id: 'architecture', title: 'Encoder-Decoder Architecture' },
			{ id: 'scaling', title: 'Scaling Laws and Implications' },
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="grid @lg:grid-cols-[1fr_280px] @xl:grid-cols-[280px_1fr_220px] gap-8 @xl:gap-12">
					<div className="hidden @xl:block">
						<AuthorSidebar author={articleData.author} />
					</div>

					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<TagList tags={articleData.tags} />
							<Title text={articleData.title} />
							<PublishInfo date={articleData.publishDate} readTime={articleData.readTime} />
						</div>

						<div className="@xl:hidden">
							<div className="flex items-center gap-3">
								<Avatar className="size-10">
									<AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
									<AvatarFallback className="bg-primary/10 text-primary text-sm">
										{articleData.author.initials}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium text-sm">{articleData.author.name}</p>
									<p className="text-xs text-muted-foreground">{articleData.author.role}</p>
								</div>
							</div>
						</div>

						<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />

						<Separator />

						<ArticleContent paragraphs={articleData.content} />
					</div>

					<div className="hidden @lg:block">
						<TableOfContents items={articleData.tableOfContents} />
					</div>
				</div>
			</div>
		</section>
	);
}
