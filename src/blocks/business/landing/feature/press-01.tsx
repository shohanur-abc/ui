import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Newspaper, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface PressItem {
	logo: string;
	title: string;
	excerpt: string;
	date: string;
	href: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Newspaper} text="Press & Media" />
					<Title text="In the" highlight="News" />
					<Description text="Read what top publications are saying about us and our impact on the industry." />
				</div>

				<PressGrid
					items={[
						{
							logo: 'TechCrunch',
							title: 'Revolutionizing Team Productivity',
							excerpt:
								'How this startup is changing the way teams collaborate remotely...',
							date: 'Mar 15, 2026',
							href: '#',
						},
						{
							logo: 'Forbes',
							title: 'Top 50 Startups to Watch',
							excerpt:
								'Named one of the most innovative companies in the SaaS space...',
							date: 'Feb 28, 2026',
							href: '#',
						},
						{
							logo: 'Wired',
							title: 'The Future of Work is Here',
							excerpt:
								'An in-depth look at how AI is transforming business workflows...',
							date: 'Feb 10, 2026',
							href: '#',
						},
						{
							logo: 'Fast Company',
							title: 'Most Innovative Companies',
							excerpt:
								'Recognized for our groundbreaking approach to enterprise software...',
							date: 'Jan 22, 2026',
							href: '#',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const PressGrid = ({ items }: { items: PressItem[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4">
		{items.map((item) => (
			<Link key={item.title} href={item.href} target="_blank">
				<Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
					<CardContent className="p-5 @md:p-6 flex flex-col h-full">
						<div className="flex items-center justify-between mb-4">
							<span className="text-lg font-bold text-primary">
								{item.logo}
							</span>
							<ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
						<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
							{item.title}
						</h3>
						<p className="text-sm text-muted-foreground flex-1 mb-3">
							{item.excerpt}
						</p>
						<p className="text-xs text-muted-foreground">{item.date}</p>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
