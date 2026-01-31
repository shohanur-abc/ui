import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Apple,
	Chrome,
	Download,
	Globe,
	Monitor,
	Smartphone,
	Sparkles,
	Tablet,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface PlatformItem {
	icon: ComponentType<{ className?: string }>;
	platform: string;
	description: string;
	cta: string;
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
					<Eyebrow icon={Download} text="Downloads" />
					<Title text="Available on All Your" highlight="Devices" />
					<Description text="Access your work from anywhere with native apps for every platform." />
				</div>

				<PlatformGrid
					items={[
						{
							icon: Monitor,
							platform: 'Desktop',
							description: 'Native apps for macOS, Windows, and Linux',
							cta: 'Download',
							href: '/download/desktop',
						},
						{
							icon: Smartphone,
							platform: 'Mobile',
							description: 'iOS and Android apps with full features',
							cta: 'Get App',
							href: '/download/mobile',
						},
						{
							icon: Globe,
							platform: 'Web',
							description: 'Access from any browser, no install needed',
							cta: 'Open Web',
							href: '/app',
						},
						{
							icon: Chrome,
							platform: 'Extensions',
							description: 'Chrome, Firefox, and Safari extensions',
							cta: 'Install',
							href: '/download/extensions',
						},
					]}
				/>

				<SyncNote />
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

const PlatformGrid = ({ items }: { items: PlatformItem[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4 max-w-5xl mx-auto mb-10">
		{items.map((item) => (
			<Card
				key={item.platform}
				className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-lg text-center"
			>
				<CardContent className="p-6">
					<div className="mb-4 mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/15">
						<item.icon className="size-7 text-primary" />
					</div>
					<h3 className="font-semibold mb-1">{item.platform}</h3>
					<p className="text-sm text-muted-foreground mb-4">
						{item.description}
					</p>
					<Button variant="outline" className="w-full gap-2" asChild>
						<Link href={item.href}>
							{item.cta}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);

const SyncNote = () => (
	<p className="text-center text-sm text-muted-foreground">
		All platforms sync in real-time. Start on one device, continue on another.
	</p>
);
