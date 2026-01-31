import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MoveRight, Crosshair } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Crosshair} text="Featured" />
					<Title text="Work Highlights" />
					<Description text="Alternating layout for engaging project presentation." />
				</div>

				<ZigzagLayout
					items={[
						{
							image: 'https://picsum.photos/seed/zz2a/900/700',
							title: 'Smart Home Dashboard',
							description:
								'Centralized control panel for IoT devices with voice commands, automated routines, and energy monitoring.',
							tags: ['React', 'MQTT', 'Node.js', 'InfluxDB'],
							metrics: [
								{ value: '50+', label: 'Device Types' },
								{ value: '99.9%', label: 'Uptime' },
							],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/zz2b/900/700',
							title: 'Investment Portfolio Tracker',
							description:
								'Multi-asset tracking platform with real-time market data, performance analytics, and tax reporting.',
							tags: ['Next.js', 'Python', 'PostgreSQL', 'Redis'],
							metrics: [
								{ value: '$10M+', label: 'Tracked Value' },
								{ value: '15K', label: 'Users' },
							],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/zz2c/900/700',
							title: 'Collaborative Whiteboard',
							description:
								'Real-time canvas for remote teams with infinite space, templates, and video integration.',
							tags: ['React', 'WebSocket', 'Canvas API', 'Y.js'],
							metrics: [
								{ value: '100+', label: 'Concurrent Users' },
								{ value: '<50ms', label: 'Sync Latency' },
							],
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
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface ZigzagItem {
	image: string;
	title: string;
	description: string;
	tags: string[];
	metrics: { value: string; label: string }[];
	href: string;
}

const ZigzagLayout = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(({ image, title, description, tags, metrics, href }, i) => (
			<div
				key={i}
				className={`grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-center ${i % 2 === 1 ? '@lg:flex-row-reverse' : ''}`}
			>
				{/* Image */}
				<div className={`${i % 2 === 1 ? '@lg:order-2' : ''}`}>
					<Link
						href={href}
						className="group block relative rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-2xl hover:shadow-primary/15"
					>
						<div className="relative aspect-[4/3] overflow-hidden">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							{/* Gradient overlay */}
							<div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
						</div>
						<div className="absolute bottom-4 right-4">
							<Button
								variant="secondary"
								size="icon"
								className="opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<ArrowUpRight className="size-4" />
							</Button>
						</div>
					</Link>
				</div>

				{/* Content */}
				<div className={`${i % 2 === 1 ? '@lg:order-1' : ''}`}>
					<div className="flex flex-wrap gap-2 mb-4">
						{tags.map((tag, j) => (
							<Badge key={j} variant="outline">
								{tag}
							</Badge>
						))}
					</div>

					<h3 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-4">
						{title}
					</h3>

					<p className="text-muted-foreground mb-6 leading-relaxed">
						{description}
					</p>

					{/* Metrics */}
					<div className="flex gap-8 mb-8">
						{metrics.map(({ value, label }, j) => (
							<div key={j}>
								<div className="text-2xl @md:text-3xl font-bold text-primary">
									{value}
								</div>
								<div className="text-sm text-muted-foreground">{label}</div>
							</div>
						))}
					</div>

					<Button className="gap-2" asChild>
						<Link href={href}>
							View Project <MoveRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		))}
	</div>
);
