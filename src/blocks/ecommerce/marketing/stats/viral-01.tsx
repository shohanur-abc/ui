import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Eye, MousePointer, Share2, Users } from 'lucide-react';

interface ViralStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface ContentStatProps {
	title: string;
	views: string;
	shares: string;
	engagement: number;
}

const ViralMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: ViralStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center justify-between">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<Badge variant={positive ? 'default' : 'destructive'}>{change}</Badge>
		</div>
		<p className="mt-4 text-2xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
	</Card>
);

const ContentRow = ({ title, views, shares, engagement }: ContentStatProps) => (
	<div className="space-y-2 py-4">
		<div className="flex items-center justify-between">
			<p className="font-medium">{title}</p>
			<Badge variant="outline">{engagement}% eng.</Badge>
		</div>
		<div className="flex items-center gap-4 text-sm text-muted-foreground">
			<span className="flex items-center gap-1">
				<Eye className="size-3" /> {views}
			</span>
			<span className="flex items-center gap-1">
				<Share2 className="size-3" /> {shares}
			</span>
		</div>
		<Progress value={engagement} className="h-1" />
	</div>
);

export default function Main() {
	const metrics: ViralStatProps[] = [
		{
			icon: Eye,
			label: 'Total Impressions',
			value: '12.4M',
			change: '+124%',
			positive: true,
		},
		{
			icon: Share2,
			label: 'Shares',
			value: '248K',
			change: '+86%',
			positive: true,
		},
		{
			icon: Users,
			label: 'Viral Coefficient',
			value: '1.8',
			change: '+0.4',
			positive: true,
		},
	];

	const content: ContentStatProps[] = [
		{
			title: 'Summer Sale Announcement',
			views: '2.4M',
			shares: '48K',
			engagement: 82,
		},
		{
			title: 'New Collection Drop',
			views: '1.8M',
			shares: '32K',
			engagement: 68,
		},
		{
			title: 'Customer Story Feature',
			views: '1.2M',
			shares: '24K',
			engagement: 74,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="space-y-4 @lg:col-span-2">
						<div className="grid gap-4 @md:grid-cols-3">
							{metrics.map((metric, i) => (
								<ViralMetric key={i} {...metric} />
							))}
						</div>
					</div>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<Sparkles className="size-4 text-primary" />
							<h3 className="font-semibold">Top Viral Content</h3>
						</div>
						<div className="divide-y">
							{content.map((item, i) => (
								<ContentRow key={i} {...item} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
