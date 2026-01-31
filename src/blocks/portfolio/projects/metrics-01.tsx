import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowUpRight, BarChart3, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={BarChart3} text="Impact" />
					<Title text="Results-Driven Work" />
					<Description text="Projects with measurable outcomes and business impact." />
				</div>

				<MetricsGrid
					items={[
						{
							image: 'https://picsum.photos/seed/met1/800/600',
							title: 'Revenue Dashboard',
							description: 'Analytics platform for financial insights.',
							metrics: [
								{ label: 'Revenue Increase', value: '+45%', trend: 'up' },
								{ label: 'Time Saved', value: '20hrs/week', trend: 'up' },
							],
							tags: ['React', 'D3.js'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/met2/800/600',
							title: 'Lead Generation',
							description: 'Marketing automation platform.',
							metrics: [
								{ label: 'Conversion Rate', value: '+120%', trend: 'up' },
								{ label: 'CAC Reduction', value: '-35%', trend: 'up' },
							],
							tags: ['Next.js', 'HubSpot'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/met3/800/600',
							title: 'Customer Portal',
							description: 'Self-service support platform.',
							metrics: [
								{ label: 'Ticket Volume', value: '-60%', trend: 'up' },
								{ label: 'CSAT Score', value: '4.8/5', trend: 'up' },
							],
							tags: ['Vue.js', 'Node.js'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/met4/800/600',
							title: 'Inventory System',
							description: 'Stock management automation.',
							metrics: [
								{ label: 'Stock Accuracy', value: '99.5%', trend: 'up' },
								{ label: 'Fulfillment Speed', value: '+80%', trend: 'up' },
							],
							tags: ['React', 'PostgreSQL'],
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

interface Metric {
	label: string;
	value: string;
	trend: 'up' | 'down';
}

interface MetricsItem {
	image: string;
	title: string;
	description: string;
	metrics: Metric[];
	tags: string[];
	href: string;
}

const MetricsGrid = ({ items }: { items: MetricsItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-6">
		{items.map(({ image, title, description, metrics, tags, href }, i) => (
			<Card
				key={i}
				className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
			>
				<Link href={href} className="block">
					<div className="relative aspect-video overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
					</div>

					<CardHeader className="pb-3">
						<div className="flex items-start justify-between gap-4">
							<div>
								<h3 className="font-bold text-lg group-hover:text-primary transition-colors">
									{title}
								</h3>
								<p className="text-sm text-muted-foreground">{description}</p>
							</div>
							<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
						</div>
					</CardHeader>

					<CardContent className="pt-0">
						{/* Metrics */}
						<div className="flex gap-6 mb-4 pb-4 border-b border-border">
							{metrics.map(({ label, value, trend }, j) => (
								<div key={j}>
									<div className="flex items-center gap-1.5">
										<span className="text-xl font-bold text-primary">
											{value}
										</span>
										{trend === 'up' && (
											<TrendingUp className="size-4 text-green-500" />
										)}
									</div>
									<p className="text-xs text-muted-foreground">{label}</p>
								</div>
							))}
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-1.5">
							{tags.map((tag, j) => (
								<Badge key={j} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				</Link>
			</Card>
		))}
	</div>
);
