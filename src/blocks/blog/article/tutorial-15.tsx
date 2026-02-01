import Link from 'next/link';
import { Clock, ListChecks, ChevronRight, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface Step {
	number: number;
	title: string;
	content: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	description: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	prerequisites: string[];
	steps: Step[];
}

const TutorialBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="secondary" className="gap-1.5 rounded-md" asChild>
		<Link href={href}>
			<ListChecks className="size-3.5" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
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

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl shadow-lg ring-1 ring-border/50">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
	</div>
);

const Prerequisites = ({ items }: { items: string[] }) => (
	<Card className="bg-muted/30 border-dashed">
		<CardHeader className="pb-3">
			<CardTitle className="text-base font-semibold">Prerequisites</CardTitle>
		</CardHeader>
		<CardContent className="pt-0">
			<ul className="space-y-2">
				{items.map((item, index) => (
					<li key={index} className="flex items-start gap-2 text-sm">
						<Check className="size-4 text-primary shrink-0 mt-0.5" />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const StepGuide = ({ steps }: { steps: Step[] }) => (
	<div className="space-y-8">
		{steps.map((step) => (
			<div key={step.number} className="relative pl-8 @md:pl-12">
				<div className="absolute left-0 top-0 flex items-center justify-center size-6 @md:size-8 rounded-full bg-primary text-primary-foreground font-bold text-sm @md:text-base">
					{step.number}
				</div>
				<div className="absolute left-[11px] @md:left-[15px] top-8 @md:top-10 bottom-0 w-px bg-border" />
				<div className="pb-8">
					<h3 className="text-xl @md:text-2xl font-bold mb-3">{step.title}</h3>
					<p className="text-base @md:text-lg leading-relaxed text-foreground/85">
						{step.content}
					</p>
				</div>
			</div>
		))}
	</div>
);

const TableOfContents = ({ steps }: { steps: Step[] }) => (
	<Card className="sticky top-8">
		<CardHeader className="pb-3">
			<CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
				In This Guide
			</CardTitle>
		</CardHeader>
		<CardContent className="pt-0">
			<nav className="space-y-1">
				{steps.map((step) => (
					<Link
						key={step.number}
						href={`#step-${step.number}`}
						className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
					>
						<span className="size-5 rounded bg-muted text-xs font-medium flex items-center justify-center">
							{step.number}
						</span>
						<span className="flex-1">{step.title}</span>
						<ChevronRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
					</Link>
				))}
			</nav>
		</CardContent>
	</Card>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Tutorial',
		categoryHref: '/blog/category/tutorials',
		title: 'Building Your First API with Node.js and Express',
		description:
			'A step-by-step guide to creating a RESTful API from scratch, covering setup, routing, middleware, and best practices.',
		author: {
			name: 'Kevin Zhang',
			avatar:
				'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop',
			initials: 'KZ',
		},
		publishDate: 'January 24, 2026',
		readTime: '20 min read',
		heroImage:
			'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1600&h=900&fit=crop',
		heroAlt: 'Code editor showing Node.js API code',
		prerequisites: [
			'Basic understanding of JavaScript and ES6 syntax',
			'Node.js and npm installed on your machine',
			'Familiarity with command line/terminal',
			'A code editor (VS Code recommended)',
		],
		steps: [
			{
				number: 1,
				title: 'Project Setup and Dependencies',
				content:
					"Start by creating a new directory for your project and initializing it with npm. We'll install Express as our web framework, along with a few utility packages that will make development easier. Setting up proper project structure from the beginning will save you headaches as your API grows.",
			},
			{
				number: 2,
				title: 'Creating Your First Route',
				content:
					"Routes define how your API responds to client requests at specific endpoints. We'll create a basic GET route that returns a JSON response, then expand to include POST, PUT, and DELETE operations. Understanding the request-response cycle is fundamental to API development.",
			},
			{
				number: 3,
				title: 'Adding Middleware',
				content:
					"Middleware functions have access to the request and response objects and can execute code, modify the request/response, or end the request-response cycle. We'll implement common middleware for logging, parsing JSON bodies, and handling errors gracefully.",
			},
			{
				number: 4,
				title: 'Structuring for Scale',
				content:
					"As your API grows, keeping all code in a single file becomes unmanageable. We'll refactor into a modular structure with separate files for routes, controllers, and utilities. This pattern makes your code more maintainable and testable.",
			},
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="grid @lg:grid-cols-[1fr_280px] gap-8 @xl:gap-12">
					<div className="flex flex-col gap-6 @md:gap-8">
						<TutorialBadge
							text={articleData.category}
							href={articleData.categoryHref}
						/>
						<Title text={articleData.title} />
						<Description text={articleData.description} />
						<AuthorMeta
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
						/>
						<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
						<Prerequisites items={articleData.prerequisites} />
						<Separator />
						<StepGuide steps={articleData.steps} />
					</div>

					<div className="hidden @lg:block">
						<TableOfContents steps={articleData.steps} />
					</div>
				</div>
			</div>
		</section>
	);
}
