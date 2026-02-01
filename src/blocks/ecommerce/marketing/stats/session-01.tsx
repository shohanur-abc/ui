import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	TrendingUp,
	ShoppingCart,
	Users,
	DollarSign,
} from 'lucide-react';

interface SessionStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	description: string;
}

interface PageViewStatProps {
	page: string;
	views: string;
	avgTime: string;
	bounceRate: string;
}

const SessionMetric = ({
	icon: Icon,
	label,
	value,
	description,
}: SessionStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<p className="mt-4 text-2xl font-bold">{value}</p>
		<p className="mt-1 text-xs text-muted-foreground">{description}</p>
	</Card>
);

const PageViewRow = ({
	page,
	views,
	avgTime,
	bounceRate,
}: PageViewStatProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="flex-1 truncate">
			<p className="truncate font-medium">{page}</p>
		</div>
		<div className="w-20 text-right text-sm font-medium">{views}</div>
		<div className="w-16 text-right text-sm text-muted-foreground">
			{avgTime}
		</div>
		<Badge variant="outline" className="w-14 justify-center">
			{bounceRate}
		</Badge>
	</div>
);

export default function Main() {
	const metrics: SessionStatProps[] = [
		{
			icon: Users,
			label: 'Sessions',
			value: '248,294',
			description: '+18% from last week',
		},
		{
			icon: Clock,
			label: 'Avg. Duration',
			value: '4:32',
			description: '+0:28 from last week',
		},
		{
			icon: ShoppingCart,
			label: 'Pages/Session',
			value: '5.4',
			description: '+0.8 from last week',
		},
	];

	const pages: PageViewStatProps[] = [
		{
			page: '/products/new-arrivals',
			views: '48,294',
			avgTime: '2:18',
			bounceRate: '32%',
		},
		{
			page: '/collections/summer',
			views: '42,847',
			avgTime: '1:54',
			bounceRate: '28%',
		},
		{
			page: '/products/bestsellers',
			views: '38,284',
			avgTime: '2:42',
			bounceRate: '24%',
		},
		{ page: '/checkout', views: '24,847', avgTime: '3:12', bounceRate: '18%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="space-y-4">
						{metrics.map((metric, i) => (
							<SessionMetric key={i} {...metric} />
						))}
					</div>
					<Card className="p-5 @lg:col-span-2">
						<h3 className="flex items-center gap-2 font-semibold">
							<TrendingUp className="size-4 text-primary" />
							Top Pages
						</h3>
						<div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
							<div className="flex-1">Page</div>
							<div className="w-20 text-right">Views</div>
							<div className="w-16 text-right">Avg. Time</div>
							<div className="w-14 text-center">Bounce</div>
						</div>
						<Separator className="my-2" />
						<div className="divide-y">
							{pages.map((page, i) => (
								<PageViewRow key={i} {...page} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
