import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bookmark, PenTool, Users } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<AuthorStack
						authors={[
							{
								name: 'Alex Rivera',
								image: 'https://i.pravatar.cc/100?img=1',
								initials: 'AR',
							},
							{
								name: 'Jordan Lee',
								image: 'https://i.pravatar.cc/100?img=2',
								initials: 'JL',
							},
							{
								name: 'Sam Chen',
								image: 'https://i.pravatar.cc/100?img=3',
								initials: 'SC',
							},
							{
								name: 'Taylor Kim',
								image: 'https://i.pravatar.cc/100?img=4',
								initials: 'TK',
							},
						]}
						label="+12 contributors this week"
					/>
					<Title text="Insights from" highlight="Industry Experts" />
					<Description text="Curated articles from leading voices in tech, design, and entrepreneurship. Get actionable advice from those who've built and scaled successful products." />
					<Stats
						items={[
							{ icon: PenTool, value: '1,200+', label: 'Articles' },
							{ icon: Users, value: '85K+', label: 'Readers' },
							{ icon: Bookmark, value: '340K+', label: 'Bookmarks' },
						]}
					/>
					<CTA
						items={[
							{
								label: 'Explore Articles',
								href: '/articles',
								icon: ArrowRight,
							},
							{
								label: 'Meet the Authors',
								href: '/authors',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
			<GridDecorative />
		</section>
	);
}

interface Author {
	name: string;
	image: string;
	initials: string;
}

const AuthorStack = ({
	authors,
	label,
}: {
	authors: Author[];
	label: string;
}) => (
	<div className="flex items-center justify-center gap-3 mb-6 @md:mb-8">
		<div className="flex -space-x-3">
			{authors.map((author) => (
				<Avatar
					key={author.name}
					className="size-10 @md:size-12 ring-2 ring-background"
				>
					<AvatarImage src={author.image} alt={author.name} />
					<AvatarFallback className="text-xs bg-primary text-primary-foreground">
						{author.initials}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
		<Badge variant="secondary" className="text-xs @md:text-sm">
			{label}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
		{text} <span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

interface StatItem {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const Stats = ({ items }: { items: StatItem[] }) => (
	<div className="flex flex-wrap justify-center gap-8 @md:gap-12 mb-8 @md:mb-10">
		{items.map(({ icon: Icon, value, label }) => (
			<div key={label} className="text-center">
				<Icon className="size-5 @md:size-6 text-primary mx-auto mb-2" />
				<p className="text-2xl @md:text-3xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
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

const GridDecorative = () => (
	<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:80px_100%] opacity-20" />
);
