import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	GitCommit,
	Package,
	Plus,
	Sparkles,
	Tag,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface ChangelogItem {
	version: string;
	date: string;
	type: 'major' | 'minor' | 'patch';
	title: string;
	changes: { type: 'added' | 'improved' | 'fixed'; text: string }[];
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={GitCommit} text="Changelog" />
					<Title text="What's New in" highlight="Our Platform" />
					<Description text="Stay up to date with the latest features, improvements, and fixes." />
				</div>

				<ChangelogList
					items={[
						{
							version: 'v2.4.0',
							date: 'Mar 15, 2026',
							type: 'minor',
							title: 'AI Assistant & Performance Boost',
							changes: [
								{ type: 'added', text: 'AI-powered workflow suggestions' },
								{ type: 'added', text: 'Dark mode for mobile apps' },
								{ type: 'improved', text: 'Dashboard load times by 40%' },
								{ type: 'fixed', text: 'Calendar sync issues with Outlook' },
							],
						},
						{
							version: 'v2.3.1',
							date: 'Mar 8, 2026',
							type: 'patch',
							title: 'Bug Fixes & Stability',
							changes: [
								{
									type: 'fixed',
									text: 'Export functionality for large datasets',
								},
								{ type: 'fixed', text: 'Notification delays on mobile' },
								{
									type: 'improved',
									text: 'Error messages for better debugging',
								},
							],
						},
					]}
				/>

				<CTASection label="View Full Changelog" href="/changelog" />
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

const ChangelogList = ({ items }: { items: ChangelogItem[] }) => {
	const changeTypeConfig = {
		added: { icon: Plus, label: 'Added', color: 'text-emerald-500' },
		improved: { icon: Zap, label: 'Improved', color: 'text-blue-500' },
		fixed: { icon: Package, label: 'Fixed', color: 'text-amber-500' },
	};

	const versionColors = {
		major: 'bg-primary text-primary-foreground',
		minor: 'bg-primary/20 text-primary',
		patch: 'bg-muted text-muted-foreground',
	};

	return (
		<div className="space-y-6 max-w-3xl mx-auto">
			{items.map((item) => (
				<Card
					key={item.version}
					className="border-border/50 transition-all hover:border-primary/30"
				>
					<CardContent className="p-5 @md:p-6">
						<div className="flex flex-wrap items-center gap-3 mb-4">
							<Badge className={versionColors[item.type]}>{item.version}</Badge>
							<span className="text-sm text-muted-foreground">{item.date}</span>
						</div>
						<h3 className="text-lg font-semibold mb-4">{item.title}</h3>
						<ul className="space-y-2">
							{item.changes.map((change, index) => {
								const config = changeTypeConfig[change.type];
								const Icon = config.icon;
								return (
									<li key={index} className="flex items-start gap-3 text-sm">
										<Badge
											variant="outline"
											className={`shrink-0 gap-1 ${config.color}`}
										>
											<Icon className="size-3" />
											{config.label}
										</Badge>
										<span className="text-muted-foreground">{change.text}</span>
									</li>
								);
							})}
						</ul>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

const CTASection = ({ label, href }: { label: string; href: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Button size="lg" variant="outline" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
