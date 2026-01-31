import Link from 'next/link';
import { Clock, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	role: string;
}

interface DataPoint {
	label: string;
	value: string;
	change?: number;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	keyMetrics: DataPoint[];
	heroImage: string;
	heroAlt: string;
	content: string[];
}

const DataBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="secondary" className="gap-1.5 bg-primary/10 text-primary border-0" asChild>
		<Link href={href}>
			<BarChart3 className="size-3.5" />
			{text}
		</Link>
	</Badge>
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
		<Avatar className="size-11 ring-2 ring-border">
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

const KeyMetrics = ({ metrics }: { metrics: DataPoint[] }) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
		{metrics.map((metric, index) => (
			<Card key={index} className="bg-muted/30">
				<CardContent className="p-4">
					<p className="text-2xl @md:text-3xl font-bold">{metric.value}</p>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-muted-foreground">{metric.label}</span>
						{metric.change !== undefined && (
							<span
								className={`flex items-center gap-0.5 text-xs font-medium ${
									metric.change >= 0 ? 'text-emerald-500' : 'text-red-500'
								}`}
							>
								{metric.change >= 0 ? (
									<TrendingUp className="size-3" />
								) : (
									<TrendingDown className="size-3" />
								)}
								{Math.abs(metric.change)}%
							</span>
						)}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const ChartPlaceholder = ({ src, alt }: { src: string; alt: string }) => (
	<Card className="overflow-hidden">
		<CardHeader className="pb-2">
			<CardTitle className="text-base font-semibold">Market Overview</CardTitle>
		</CardHeader>
		<CardContent className="p-0">
			<div className="relative aspect-[16/9]">
				<img
					src={src}
					alt={alt}
					className="absolute inset-0 size-full object-cover"
				/>
			</div>
		</CardContent>
	</Card>
);

const InsightBox = ({ title, content }: { title: string; content: string }) => (
	<Card className="bg-primary/5 border-primary/20">
		<CardContent className="p-4 @md:p-6">
			<p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{title}</p>
			<p className="text-base leading-relaxed">{content}</p>
		</CardContent>
	</Card>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.85] text-foreground/85"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Data Analysis',
		categoryHref: '/blog/category/data',
		title: 'State of the Developer Ecosystem 2026',
		subtitle:
			'An in-depth analysis of trends, tools, and technologies shaping how developers work today and what\'s on the horizon.',
		author: {
			name: 'Dr. Aisha Patel',
			avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
			initials: 'AP',
			role: 'Research Director',
		},
		publishDate: 'January 28, 2026',
		readTime: '22 min read',
		keyMetrics: [
			{ label: 'Developers Surveyed', value: '87,500', change: 15 },
			{ label: 'Countries', value: '145' },
			{ label: 'AI Tool Adoption', value: '73%', change: 28 },
			{ label: 'Remote Work', value: '68%', change: -3 },
		],
		heroImage:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop',
		heroAlt: 'Data visualization dashboard',
		content: [
			'Our annual developer survey represents the largest and most comprehensive look at the global developer community. This year, we heard from over 87,500 developers across 145 countries, painting a detailed picture of how the profession continues to evolve.',
			'The most striking trend is the rapid adoption of AI-assisted development tools. Nearly three-quarters of respondents now use some form of AI tooling in their daily work—a dramatic increase from just 45% two years ago. These tools are no longer experimental; they\'ve become essential infrastructure.',
			'Remote work has settled into a new equilibrium. While the initial surge has moderated slightly, the majority of developers still work remotely at least part of the time. Interestingly, hybrid arrangements have become the most common setup, suggesting that many teams have found a balance between flexibility and collaboration.',
			'Language preferences continue to shift. TypeScript has overtaken JavaScript as the most beloved language, while Rust maintains its position as the technology developers most want to learn. Python remains dominant in data science and machine learning, cementing its role as the language of AI.',
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<DataBadge text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />
					<AuthorSection
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<KeyMetrics metrics={articleData.keyMetrics} />
					<ChartPlaceholder src={articleData.heroImage} alt={articleData.heroAlt} />
					<InsightBox
						title="Key Finding"
						content="AI tool adoption has increased by 28% year-over-year, making it the fastest-growing category in developer tooling history."
					/>
					<Separator />
					<ArticleContent paragraphs={articleData.content} />
				</div>
			</div>
		</section>
	);
}
