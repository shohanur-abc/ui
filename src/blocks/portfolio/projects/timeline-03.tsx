import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Loader, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={Clock} text="Updates" />
						<Title text="Recent & Upcoming" />
						<Description text="Latest project updates and upcoming releases." />
					</div>
					<Button variant="outline" className="gap-2 w-fit" asChild>
						<Link href="#subscribe">
							Get Notified <ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>

				<div className="grid @lg:grid-cols-2 gap-8">
					{/* Recent */}
					<div>
						<h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
							<div className="size-2 rounded-full bg-green-500 animate-pulse" />
							Recently Shipped
						</h3>
						<RecentList
							items={[
								{
									image: 'https://picsum.photos/seed/rec1/400/300',
									title: 'Analytics Dashboard v2.0',
									date: '2 days ago',
									tags: ['Update', 'Dashboard'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/rec2/400/300',
									title: 'Mobile App iOS Release',
									date: '1 week ago',
									tags: ['New', 'iOS'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/rec3/400/300',
									title: 'API Documentation Site',
									date: '2 weeks ago',
									tags: ['Docs', 'API'],
									href: '#',
								},
							]}
						/>
					</div>

					{/* Upcoming */}
					<div>
						<h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
							<Loader className="size-4 animate-spin text-primary" />
							Coming Soon
						</h3>
						<UpcomingList
							items={[
								{
									title: 'AI Integration Suite',
									description: 'Smart automation features powered by ML.',
									eta: 'March 2026',
									progress: 75,
								},
								{
									title: 'Enterprise SSO',
									description: 'Single sign-on for enterprise customers.',
									eta: 'April 2026',
									progress: 50,
								},
								{
									title: 'Mobile App Android',
									description: 'Native Android application.',
									eta: 'May 2026',
									progress: 25,
								},
							]}
						/>
					</div>
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
	<div className="flex items-center gap-2 mb-3 text-primary">
		<Icon className="size-4" />
		<span className="text-sm font-medium uppercase tracking-wider">{text}</span>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface RecentItem {
	image: string;
	title: string;
	date: string;
	tags: string[];
	href: string;
}

const RecentList = ({ items }: { items: RecentItem[] }) => (
	<div className="space-y-4">
		{items.map(({ image, title, date, tags, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group flex gap-4 p-3 rounded-lg border bg-card transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20"
			>
				<div className="relative size-20 @md:size-24 rounded-lg overflow-hidden bg-muted shrink-0">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex flex-wrap gap-1.5 mb-1.5">
						{tags.map((tag, j) => (
							<Badge key={j} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
					<h4 className="font-semibold truncate group-hover:text-primary transition-colors">
						{title}
					</h4>
					<span className="text-sm text-muted-foreground">{date}</span>
				</div>
				<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
			</Link>
		))}
	</div>
);

interface UpcomingItem {
	title: string;
	description: string;
	eta: string;
	progress: number;
}

const UpcomingList = ({ items }: { items: UpcomingItem[] }) => (
	<div className="space-y-4">
		{items.map(({ title, description, eta, progress }, i) => (
			<div key={i} className="p-4 rounded-lg border border-dashed bg-card/50">
				<div className="flex items-center justify-between mb-2">
					<h4 className="font-semibold">{title}</h4>
					<Badge variant="outline">{eta}</Badge>
				</div>
				<p className="text-sm text-muted-foreground mb-3">{description}</p>
				<div className="flex items-center gap-3">
					<div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
						<div
							className="h-full rounded-full bg-primary transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<span className="text-xs font-medium text-muted-foreground">
						{progress}%
					</span>
				</div>
			</div>
		))}
	</div>
);
