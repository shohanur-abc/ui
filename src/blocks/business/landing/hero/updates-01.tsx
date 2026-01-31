import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Megaphone,
	Bell,
	Sparkles,
	Zap,
	ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={Bell} text="What&apos;s New" />
					<Title text="Latest Updates & Announcements" />
					<Description text="Stay up to date with the latest features, improvements, and news from our team." />
				</div>
				<UpdatesGrid
					items={[
						{
							type: 'Feature',
							icon: Sparkles,
							title: 'AI-Powered Analytics Now Available',
							description:
								'Get intelligent insights and predictions powered by machine learning. Available to all Pro users.',
							date: 'Feb 15, 2024',
							isNew: true,
							href: '#ai-analytics',
						},
						{
							type: 'Improvement',
							icon: Zap,
							title: '3x Faster Load Times',
							description:
								'We&apos;ve optimized our infrastructure for lightning-fast performance across all features.',
							date: 'Feb 10, 2024',
							isNew: true,
							href: '#performance',
						},
						{
							type: 'Announcement',
							icon: Megaphone,
							title: 'Expanding to 10 New Countries',
							description:
								'Our platform is now available in additional markets across Europe and Asia.',
							date: 'Feb 5, 2024',
							isNew: false,
							href: '#expansion',
						},
					]}
				/>
				<div className="text-center mt-10">
					<CTA
						items={[
							{ label: 'View All Updates', href: '#updates', icon: ArrowRight },
							{
								label: 'Subscribe to Changelog',
								href: '#subscribe',
								variant: 'outline',
							},
						]}
					/>
				</div>
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
	<Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const UpdatesGrid = ({
	items,
}: {
	items: {
		type: string;
		icon: ComponentType<{ className?: string }>;
		title: string;
		description: string;
		date: string;
		isNew: boolean;
		href: string;
	}[];
}) => (
	<div className="space-y-4">
		{items.map(
			({ type, icon: Icon, title, description, date, isNew, href }, i) => (
				<Link key={i} href={href}>
					<Card className="group hover:shadow-lg hover:border-primary/50 transition-all overflow-hidden">
						<CardContent className="py-6">
							<div className="flex flex-col @md:flex-row @md:items-center gap-4">
								<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all">
									<Icon className="size-6 text-primary" />
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<Badge variant="outline" className="text-xs">
											{type}
										</Badge>
										{isNew && (
											<Badge className="text-xs bg-primary/20 text-primary border-0">
												New
											</Badge>
										)}
										<span className="text-xs text-muted-foreground ml-auto @md:ml-2">
											{date}
										</span>
									</div>
									<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground">{description}</p>
								</div>
								<ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary shrink-0 hidden @md:block" />
							</div>
						</CardContent>
					</Card>
				</Link>
			),
		)}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);
