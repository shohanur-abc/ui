import Link from 'next/link';
import { Clock, Star, ExternalLink, Check, X, Minus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface RatingProps {
	overall: number;
	categories: { name: string; score: number }[];
}

interface ProConProps {
	pros: string[];
	cons: string[];
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	productName: string;
	verdict: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	rating: RatingProps;
	prosCons: ProConProps;
	content: string[];
	ctaLink: string;
	ctaLabel: string;
}

const ReviewBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="outline" className="gap-1.5" asChild>
		<Link href={href}>
			<Star className="size-3 fill-current" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Verdict = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-primary font-medium leading-relaxed">
		{text}
	</p>
);

const AuthorMeta = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-center gap-4">
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

const OverallRating = ({ score }: { score: number }) => (
	<div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
		<div className="flex items-center justify-center size-20 rounded-full bg-primary text-primary-foreground">
			<span className="text-3xl font-bold">{score}</span>
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Overall Score</p>
			<div className="flex gap-1 mt-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-5 ${i < Math.round(score / 2) ? 'fill-primary text-primary' : 'text-muted'}`}
					/>
				))}
			</div>
		</div>
	</div>
);

const RatingBreakdown = ({ categories }: { categories: { name: string; score: number }[] }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base font-semibold">Rating Breakdown</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{categories.map((category, index) => (
				<div key={index} className="space-y-1.5">
					<div className="flex items-center justify-between text-sm">
						<span>{category.name}</span>
						<span className="font-semibold">{category.score}/10</span>
					</div>
					<Progress value={category.score * 10} className="h-2" />
				</div>
			))}
		</CardContent>
	</Card>
);

const ProsCons = ({ pros, cons }: ProConProps) => (
	<div className="grid @md:grid-cols-2 gap-4">
		<Card className="bg-emerald-500/5 border-emerald-500/20">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-base font-semibold text-emerald-600 dark:text-emerald-400">
					<Check className="size-4" />
					Pros
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<ul className="space-y-2">
					{pros.map((pro, index) => (
						<li key={index} className="flex items-start gap-2 text-sm">
							<Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
							<span>{pro}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>

		<Card className="bg-red-500/5 border-red-500/20">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-base font-semibold text-red-600 dark:text-red-400">
					<X className="size-4" />
					Cons
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<ul className="space-y-2">
					{cons.map((con, index) => (
						<li key={index} className="flex items-start gap-2 text-sm">
							<Minus className="size-4 text-red-500 shrink-0 mt-0.5" />
							<span>{con}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
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
				className="text-base @md:text-lg leading-relaxed text-foreground/85"
			>
				{paragraph}
			</p>
		))}
	</div>
);

const CTAButton = ({ href, label }: { href: string; label: string }) => (
	<div className="flex justify-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ExternalLink className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Review',
		categoryHref: '/blog/category/reviews',
		title: 'Framework Laptop 16 Review: The Modular Dream Realized',
		productName: 'Framework Laptop 16',
		verdict: 'The Framework Laptop 16 proves that modularity and performance can coexist. It\'s not just a laptop—it\'s a statement about the future of consumer electronics.',
		author: {
			name: 'Taylor Morrison',
			avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
			initials: 'TM',
		},
		publishDate: 'January 26, 2026',
		readTime: '15 min read',
		heroImage:
			'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&h=900&fit=crop',
		heroAlt: 'Framework Laptop 16 on a desk',
		rating: {
			overall: 8.5,
			categories: [
				{ name: 'Design', score: 9 },
				{ name: 'Performance', score: 8 },
				{ name: 'Display', score: 8 },
				{ name: 'Keyboard', score: 9 },
				{ name: 'Upgradeability', score: 10 },
				{ name: 'Value', score: 8 },
			],
		},
		prosCons: {
			pros: [
				'Unmatched upgradeability and repairability',
				'Excellent keyboard with customizable spacing',
				'Strong performance for the price',
				'Swappable graphics module',
			],
			cons: [
				'Thicker and heavier than competitors',
				'Battery life could be better',
				'Limited software optimization at launch',
			],
		},
		content: [
			'Framework has done something remarkable with the Laptop 16. They\'ve taken the modular philosophy that made their 13-inch model a cult favorite and scaled it up to a full-size gaming and workstation-class machine—without compromising on the core promise of repairability and upgrades.',
			'The modular bay system is the star of the show. Swap between a discrete GPU, additional storage, or even a secondary battery depending on your needs that day. It\'s a level of flexibility we\'ve never seen in a laptop, and it actually works well in practice.',
			'Performance is strong, though not class-leading. The AMD Ryzen 9 processor handles everything we threw at it with ease, and the optional RTX 4060 module delivers solid 1080p gaming. The trade-off is a chassis that\'s noticeably thicker than the competition—but that\'s the price of modularity.',
		],
		ctaLink: 'https://frame.work',
		ctaLabel: 'Visit Framework',
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<ReviewBadge text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<Verdict text={articleData.verdict} />
					<AuthorMeta
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<OverallRating score={articleData.rating.overall} />
					<div className="grid @lg:grid-cols-[1fr_280px] gap-6">
						<ProsCons pros={articleData.prosCons.pros} cons={articleData.prosCons.cons} />
						<RatingBreakdown categories={articleData.rating.categories} />
					</div>
					<Separator />
					<ArticleContent paragraphs={articleData.content} />
					<CTAButton href={articleData.ctaLink} label={articleData.ctaLabel} />
				</div>
			</div>
		</section>
	);
}
