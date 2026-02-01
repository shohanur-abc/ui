import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Link2,
	MousePointer,
	DollarSign,
	Users,
	TrendingUp,
} from 'lucide-react';

interface AffiliateStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

interface TopAffiliateProps {
	name: string;
	clicks: string;
	sales: string;
	commission: string;
}

const AffiliateMetric = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: AffiliateStatProps) => (
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

const AffiliateRow = ({
	name,
	clicks,
	sales,
	commission,
}: TopAffiliateProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1">
			<p className="font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{clicks} clicks</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{sales}</p>
			<p className="text-xs text-muted-foreground">{commission} earned</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: AffiliateStatProps[] = [
		{
			icon: Users,
			label: 'Active Affiliates',
			value: '847',
			change: '+24',
			positive: true,
		},
		{
			icon: MousePointer,
			label: 'Referral Clicks',
			value: '248K',
			change: '+18%',
			positive: true,
		},
		{
			icon: DollarSign,
			label: 'Affiliate Revenue',
			value: '$524K',
			change: '+32%',
			positive: true,
		},
		{
			icon: Link2,
			label: 'Avg. Commission',
			value: '12%',
			change: '+1%',
			positive: true,
		},
	];

	const topAffiliates: TopAffiliateProps[] = [
		{
			name: 'TechReviewer Pro',
			clicks: '42K',
			sales: '$84K',
			commission: '$10.1K',
		},
		{
			name: 'StyleInfluencer',
			clicks: '38K',
			sales: '$68K',
			commission: '$8.2K',
		},
		{
			name: 'DealHunters Blog',
			clicks: '28K',
			sales: '$48K',
			commission: '$5.8K',
		},
		{
			name: 'ProductGuru YT',
			clicks: '24K',
			sales: '$42K',
			commission: '$5.0K',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{metrics.map((metric, i) => (
							<AffiliateMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5">
						<div className="flex items-center gap-2">
							<TrendingUp className="size-4 text-primary" />
							<h3 className="font-semibold">Top Affiliates</h3>
						</div>
						<Separator className="my-4" />
						<div className="divide-y">
							{topAffiliates.map((affiliate, i) => (
								<AffiliateRow key={i} {...affiliate} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
