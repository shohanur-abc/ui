import Link from 'next/link';
import { Clock, Briefcase, Building, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	title: string;
	company: string;
}

interface CaseStudyMeta {
	client: string;
	industry: string;
	duration: string;
	outcome: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	caseStudy: CaseStudyMeta;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: { heading: string; paragraphs: string[] }[];
	results: { label: string; value: string }[];
}

const CaseBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="outline" className="gap-1.5 border-primary/50 text-primary" asChild>
		<Link href={href}>
			<Briefcase className="size-3" />
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

const MetaGrid = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 p-4 @md:p-6 rounded-xl bg-muted/50 border border-border">
		<div>
			<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
				<Building className="size-3" />
				Client
			</div>
			<p className="font-semibold">{caseStudy.client}</p>
		</div>
		<div>
			<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
				<Briefcase className="size-3" />
				Industry
			</div>
			<p className="font-semibold">{caseStudy.industry}</p>
		</div>
		<div>
			<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
				<Clock className="size-3" />
				Duration
			</div>
			<p className="font-semibold">{caseStudy.duration}</p>
		</div>
		<div>
			<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
				<Award className="size-3" />
				Outcome
			</div>
			<p className="font-semibold text-primary">{caseStudy.outcome}</p>
		</div>
	</div>
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
	<div className="flex items-center gap-4">
		<Avatar className="size-12 ring-2 ring-border">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<p className="font-semibold">{author.name}</p>
			<p className="text-sm text-muted-foreground">
				{author.title}, {author.company}
			</p>
		</div>
		<div className="text-sm text-muted-foreground text-right">
			<p>{publishDate}</p>
			<div className="flex items-center justify-end gap-1">
				<Clock className="size-3" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl shadow-lg ring-1 ring-border/50">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
	</div>
);

const Results = ({ items }: { items: { label: string; value: string }[] }) => (
	<Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
		<CardHeader className="pb-4">
			<CardTitle className="text-lg font-semibold">Key Results</CardTitle>
		</CardHeader>
		<CardContent className="pt-0">
			<div className="grid grid-cols-2 @md:grid-cols-3 gap-6">
				{items.map((item, index) => (
					<div key={index}>
						<p className="text-3xl @md:text-4xl font-bold text-primary">{item.value}</p>
						<p className="text-sm text-muted-foreground mt-1">{item.label}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ContentSections = ({ sections }: { sections: { heading: string; paragraphs: string[] }[] }) => (
	<div className="space-y-10">
		{sections.map((section, sectionIndex) => (
			<div key={sectionIndex}>
				<h2 className="text-xl @md:text-2xl font-bold mb-4">{section.heading}</h2>
				<div className="space-y-4">
					{section.paragraphs.map((paragraph, pIndex) => (
						<p key={pIndex} className="text-base @md:text-lg leading-[1.85] text-foreground/85">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Case Study',
		categoryHref: '/blog/category/case-studies',
		title: 'How We Reduced Page Load Time by 70% for a Fortune 500 E-commerce Platform',
		subtitle:
			'A deep dive into the performance optimization strategies that transformed user experience and boosted conversions.',
		caseStudy: {
			client: 'GlobalRetail Corp',
			industry: 'E-commerce',
			duration: '6 months',
			outcome: '+35% Conversion',
		},
		author: {
			name: 'Michael Chang',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			initials: 'MC',
			title: 'Principal Engineer',
			company: 'Performance Labs',
		},
		publishDate: 'January 22, 2026',
		readTime: '18 min read',
		heroImage:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop',
		heroAlt: 'Performance dashboard showing metrics improvement',
		content: [
			{
				heading: 'The Challenge',
				paragraphs: [
					'GlobalRetail came to us with a problem that was costing them millions: their e-commerce platform was slow. Page load times averaged 8 seconds on desktop and over 12 seconds on mobile. Bounce rates were climbing, and customer complaints about performance had become the top support issue.',
					'The stakes were high. Every 100ms of additional load time was correlated with a 1% drop in conversions. With their scale, even small improvements would translate to significant revenue gains.',
				],
			},
			{
				heading: 'Our Approach',
				paragraphs: [
					'We started with comprehensive auditing. Using a combination of synthetic monitoring, real user metrics, and code analysis, we identified the primary bottlenecks: oversized JavaScript bundles, unoptimized images, and a backend that was making too many database queries per request.',
					'Rather than tackle everything at once, we prioritized based on impact and effort. The goal was to demonstrate measurable progress quickly, building stakeholder confidence for the more challenging work ahead.',
				],
			},
		],
		results: [
			{ label: 'Load Time Reduction', value: '70%' },
			{ label: 'Conversion Increase', value: '35%' },
			{ label: 'Bounce Rate Decrease', value: '42%' },
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<CaseBadge text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />
					<MetaGrid caseStudy={articleData.caseStudy} />
					<AuthorCard
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<Results items={articleData.results} />
					<Separator />
					<ContentSections sections={articleData.content} />
				</div>
			</div>
		</section>
	);
}
