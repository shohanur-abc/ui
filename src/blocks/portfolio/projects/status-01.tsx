import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ArrowUpRight,
	Workflow,
	CheckCircle2,
	Clock,
	AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-2xl">
						<Eyebrow icon={Workflow} text="Progress" />
						<Title text="Active Projects" />
						<Description text="Track ongoing work and project status updates." />
					</div>
					<StatusLegend />
				</div>

				<StatusGrid
					items={[
						{
							image: 'https://picsum.photos/seed/stat1/600/400',
							title: 'AI Content Platform',
							description: 'Machine learning content generation tool.',
							progress: 85,
							status: 'in-progress',
							dueDate: 'Mar 2026',
							tags: ['Python', 'React'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stat2/600/400',
							title: 'IoT Dashboard',
							description: 'Smart device management interface.',
							progress: 100,
							status: 'completed',
							dueDate: 'Jan 2026',
							tags: ['Next.js', 'MQTT'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stat3/600/400',
							title: 'Blockchain Explorer',
							description: 'Multi-chain transaction viewer.',
							progress: 45,
							status: 'in-progress',
							dueDate: 'Apr 2026',
							tags: ['Vue.js', 'Web3'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/stat4/600/400',
							title: 'Video Editing Suite',
							description: 'Browser-based video editor.',
							progress: 20,
							status: 'planning',
							dueDate: 'Jun 2026',
							tags: ['React', 'FFmpeg'],
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

const StatusLegend = () => (
	<div className="flex gap-4 text-sm">
		<div className="flex items-center gap-1.5">
			<div className="size-2.5 rounded-full bg-green-500" />
			<span className="text-muted-foreground">Completed</span>
		</div>
		<div className="flex items-center gap-1.5">
			<div className="size-2.5 rounded-full bg-blue-500" />
			<span className="text-muted-foreground">In Progress</span>
		</div>
		<div className="flex items-center gap-1.5">
			<div className="size-2.5 rounded-full bg-yellow-500" />
			<span className="text-muted-foreground">Planning</span>
		</div>
	</div>
);

interface StatusItem {
	image: string;
	title: string;
	description: string;
	progress: number;
	status: 'completed' | 'in-progress' | 'planning';
	dueDate: string;
	tags: string[];
	href: string;
}

const StatusGrid = ({ items }: { items: StatusItem[] }) => {
	const statusConfig = {
		completed: {
			color: 'bg-green-500',
			icon: CheckCircle2,
			label: 'Completed',
		},
		'in-progress': { color: 'bg-blue-500', icon: Clock, label: 'In Progress' },
		planning: { color: 'bg-yellow-500', icon: AlertCircle, label: 'Planning' },
	};

	return (
		<div className="grid @md:grid-cols-2 gap-6">
			{items.map(
				(
					{ image, title, description, progress, status, dueDate, tags, href },
					i,
				) => {
					const config = statusConfig[status];
					const StatusIcon = config.icon;

					return (
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

									{/* Status badge */}
									<Badge
										className={`absolute top-3 left-3 gap-1.5 ${config.color}`}
									>
										<StatusIcon className="size-3" />
										{config.label}
									</Badge>
								</div>

								<CardContent className="p-5">
									<div className="flex items-start justify-between gap-4 mb-3">
										<div>
											<h3 className="font-bold text-lg group-hover:text-primary transition-colors">
												{title}
											</h3>
											<p className="text-sm text-muted-foreground">
												{description}
											</p>
										</div>
										<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
									</div>

									{/* Progress bar */}
									<div className="mb-4">
										<div className="flex items-center justify-between text-sm mb-1.5">
											<span className="text-muted-foreground">Progress</span>
											<span className="font-medium">{progress}%</span>
										</div>
										<Progress value={progress} className="h-2" />
									</div>

									<div className="flex items-center justify-between">
										<div className="flex flex-wrap gap-1.5">
											{tags.map((tag, j) => (
												<Badge key={j} variant="outline" className="text-xs">
													{tag}
												</Badge>
											))}
										</div>
										<span className="text-xs text-muted-foreground">
											Due: {dueDate}
										</span>
									</div>
								</CardContent>
							</Link>
						</Card>
					);
				},
			)}
		</div>
	);
};
