import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Search,
	MousePointer,
	ExternalLink,
	TrendingUp,
	ArrowUpRight,
} from 'lucide-react';

interface SEOStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface KeywordStatProps {
	keyword: string;
	position: number;
	previousPosition: number;
	volume: string;
}

const SEOMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: SEOStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<div className="mt-4 flex items-end justify-between">
			<p className="text-2xl font-bold">{value}</p>
			<Badge variant={positive ? 'default' : 'destructive'}>{change}</Badge>
		</div>
	</Card>
);

const KeywordRow = ({
	keyword,
	position,
	previousPosition,
	volume,
}: KeywordStatProps) => {
	const change = previousPosition - position;
	return (
		<div className="flex items-center gap-4 py-3">
			<div className="flex size-8 items-center justify-center rounded bg-primary/10 font-semibold text-primary">
				{position}
			</div>
			<div className="flex-1">
				<p className="font-medium">{keyword}</p>
				<p className="text-xs text-muted-foreground">Volume: {volume}</p>
			</div>
			<Badge
				variant={
					change > 0 ? 'default' : change < 0 ? 'destructive' : 'secondary'
				}
			>
				{change > 0 ? `↑${change}` : change < 0 ? `↓${Math.abs(change)}` : '—'}
			</Badge>
		</div>
	);
};

export default function Main() {
	const metrics: SEOStatProps[] = [
		{
			icon: Search,
			label: 'Organic Traffic',
			value: '84,294',
			change: '+18%',
			positive: true,
		},
		{
			icon: MousePointer,
			label: 'Click-Through Rate',
			value: '4.8%',
			change: '+0.6%',
			positive: true,
		},
		{
			icon: ExternalLink,
			label: 'Backlinks',
			value: '2,847',
			change: '+124',
			positive: true,
		},
	];

	const keywords: KeywordStatProps[] = [
		{
			keyword: 'sustainable fashion',
			position: 3,
			previousPosition: 5,
			volume: '12.4K',
		},
		{
			keyword: 'eco friendly clothing',
			position: 5,
			previousPosition: 8,
			volume: '8.2K',
		},
		{
			keyword: 'organic cotton shirts',
			position: 2,
			previousPosition: 2,
			volume: '6.8K',
		},
		{
			keyword: 'ethical fashion brand',
			position: 7,
			previousPosition: 4,
			volume: '4.2K',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="space-y-4 @lg:col-span-2">
						<div className="grid gap-4 @md:grid-cols-3">
							{metrics.map((metric, i) => (
								<SEOMetric key={i} {...metric} />
							))}
						</div>
					</div>
					<Card className="p-5">
						<h3 className="flex items-center gap-2 font-semibold">
							<TrendingUp className="size-4 text-primary" />
							Top Keywords
						</h3>
						<Separator className="my-4" />
						<div className="divide-y">
							{keywords.map((kw, i) => (
								<KeywordRow key={i} {...kw} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
