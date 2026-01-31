import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	ChevronRight,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<ContentSection
						eyebrow={{ icon: Users, text: 'Creator Spotlight' }}
						title="Meet the Authors"
						highlight="Behind the Words"
						description="Get to know the brilliant minds creating content on our platform. Follow your favorites and never miss their latest insights."
						cta={[
							{
								label: 'Explore All Authors',
								href: '/authors',
								icon: ArrowRight,
							},
							{ label: 'Become an Author', href: '/write', variant: 'ghost' },
						]}
					/>
					<AuthorsGrid
						authors={[
							{
								name: 'Sarah Williams',
								avatar: 'https://i.pravatar.cc/100?img=30',
								initials: 'SW',
								specialty: 'React & TypeScript',
								followers: '45.2K',
								articles: 127,
								featured: true,
							},
							{
								name: 'James Chen',
								avatar: 'https://i.pravatar.cc/100?img=31',
								initials: 'JC',
								specialty: 'System Design',
								followers: '38.7K',
								articles: 89,
								featured: false,
							},
							{
								name: 'Emma Johnson',
								avatar: 'https://i.pravatar.cc/100?img=32',
								initials: 'EJ',
								specialty: 'DevOps & Cloud',
								followers: '31.5K',
								articles: 156,
								featured: false,
							},
							{
								name: 'Alex Rivera',
								avatar: 'https://i.pravatar.cc/100?img=33',
								initials: 'AR',
								specialty: 'AI & ML',
								followers: '52.1K',
								articles: 94,
								featured: true,
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	highlight: string;
	description: string;
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	highlight,
	description,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} highlight={highlight} />
		<Description text={description} />
		<CTA items={cta} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge className="gap-2 px-4 py-1.5 bg-primary/10 text-primary border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}
		<span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
			{highlight}
		</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">
		{text}
	</p>
);

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap gap-3">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

interface Author {
	name: string;
	avatar: string;
	initials: string;
	specialty: string;
	followers: string;
	articles: number;
	featured: boolean;
}

const AuthorsGrid = ({ authors }: { authors: Author[] }) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
		{authors.map((author) => (
			<AuthorCard key={author.name} author={author} />
		))}
	</div>
);

const AuthorCard = ({ author }: { author: Author }) => (
	<Link
		href={`/authors/${author.name.toLowerCase().replace(' ', '-')}`}
		className="group relative p-5 rounded-xl bg-card border transition-all hover:border-primary hover:shadow-lg"
	>
		{author.featured && (
			<Badge className="absolute -top-2 -right-2 bg-amber-500 text-white border-0 text-[10px] px-1.5 py-0.5">
				<Star className="size-3 mr-0.5" />
				Featured
			</Badge>
		)}
		<div className="flex items-center gap-4 mb-4">
			<Avatar className="size-14 ring-2 ring-primary/10">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold group-hover:text-primary transition-colors">
					{author.name}
				</p>
				<p className="text-sm text-muted-foreground">{author.specialty}</p>
			</div>
		</div>
		<div className="flex items-center justify-between text-sm">
			<div className="flex items-center gap-4">
				<span className="flex items-center gap-1 text-muted-foreground">
					<Users className="size-4" />
					{author.followers}
				</span>
				<span className="text-muted-foreground">
					{author.articles} articles
				</span>
			</div>
			<ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
		</div>
	</Link>
);
