'use client';

import {
	ArrowDownRight,
	ArrowUpRight,
	Globe,
	type LucideIcon,
	Monitor,
	Smartphone,
	Tablet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type DeviceStatProps = {
	icon: LucideIcon;
	device: string;
	sessions: string;
	percentage: number;
	change: number;
};

const DeviceCard = ({
	icon: Icon,
	device,
	sessions,
	percentage,
	change,
}: DeviceStatProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-5">
			<div className="flex items-center gap-4">
				<div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-6 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">{device}</p>
					<p className="text-2xl font-bold">{sessions}</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-semibold">{percentage}%</p>
					<span
						className={`flex items-center justify-end gap-0.5 text-xs font-medium ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
					>
						{change >= 0 ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{Math.abs(change)}%
					</span>
				</div>
			</div>
			<Progress value={percentage} className="h-1.5 mt-4" />
		</CardContent>
	</Card>
);

type CountryRowProps = {
	flag: string;
	country: string;
	visitors: string;
	percentage: number;
};

const GeoCard = ({ countries }: { countries: CountryRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 row-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<Globe className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Top Countries</CardTitle>
			</div>
			<Badge variant="secondary">Traffic</Badge>
		</CardHeader>
		<CardContent className="space-y-3">
			{countries.map((country, i) => (
				<div key={i} className="space-y-2">
					<div className="flex items-center gap-3">
						<span className="text-lg">{country.flag}</span>
						<span className="flex-1 text-sm">{country.country}</span>
						<span className="text-sm font-semibold">{country.visitors}</span>
						<span className="text-xs text-muted-foreground w-10 text-right">
							{country.percentage}%
						</span>
					</div>
					<Progress value={country.percentage} className="h-1" />
				</div>
			))}
		</CardContent>
	</Card>
);

type BrowserRowProps = {
	name: string;
	sessions: string;
	bounceRate: string;
	avgDuration: string;
};

const BrowserCard = ({ browsers }: { browsers: BrowserRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Browser Statistics</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span>Browser</span>
				<span className="text-right">Sessions</span>
				<span className="text-right">Bounce</span>
				<span className="text-right">Avg. Time</span>
			</div>
			<div className="space-y-3 mt-3">
				{browsers.map((browser, i) => (
					<div key={i} className="grid grid-cols-4 gap-4 text-sm">
						<span className="font-medium">{browser.name}</span>
						<span className="text-right">{browser.sessions}</span>
						<span className="text-right text-muted-foreground">
							{browser.bounceRate}
						</span>
						<span className="text-right text-muted-foreground">
							{browser.avgDuration}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type PageViewProps = {
	page: string;
	views: string;
	unique: string;
	time: string;
};

const PagesCard = ({ pages }: { pages: PageViewProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Top Pages</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span className="col-span-1">Page</span>
				<span className="text-right">Views</span>
				<span className="text-right">Unique</span>
				<span className="text-right">Avg. Time</span>
			</div>
			<div className="space-y-3 mt-3">
				{pages.map((page, i) => (
					<div key={i} className="grid grid-cols-4 gap-4 text-sm">
						<span className="font-medium truncate">{page.page}</span>
						<span className="text-right">{page.views}</span>
						<span className="text-right text-muted-foreground">
							{page.unique}
						</span>
						<span className="text-right text-muted-foreground">
							{page.time}
						</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const devices: DeviceStatProps[] = [
	{
		icon: Monitor,
		device: 'Desktop',
		sessions: '12,456',
		percentage: 58,
		change: 5.2,
	},
	{
		icon: Smartphone,
		device: 'Mobile',
		sessions: '7,234',
		percentage: 34,
		change: 12.8,
	},
	{
		icon: Tablet,
		device: 'Tablet',
		sessions: '1,890',
		percentage: 8,
		change: -2.3,
	},
];

const countries: CountryRowProps[] = [
	{ flag: '🇺🇸', country: 'United States', visitors: '8,432', percentage: 42 },
	{ flag: '🇬🇧', country: 'United Kingdom', visitors: '3,210', percentage: 16 },
	{ flag: '🇩🇪', country: 'Germany', visitors: '2,156', percentage: 11 },
	{ flag: '🇫🇷', country: 'France', visitors: '1,890', percentage: 9 },
	{ flag: '🇨🇦', country: 'Canada', visitors: '1,654', percentage: 8 },
];

const browsers: BrowserRowProps[] = [
	{ name: 'Chrome', sessions: '9,234', bounceRate: '32%', avgDuration: '4:23' },
	{ name: 'Safari', sessions: '4,567', bounceRate: '28%', avgDuration: '5:12' },
	{
		name: 'Firefox',
		sessions: '2,345',
		bounceRate: '35%',
		avgDuration: '3:45',
	},
	{ name: 'Edge', sessions: '1,234', bounceRate: '38%', avgDuration: '3:21' },
];

const pages: PageViewProps[] = [
	{ page: '/products', views: '12,456', unique: '8,234', time: '2:34' },
	{ page: '/checkout', views: '4,567', unique: '3,890', time: '5:12' },
	{ page: '/cart', views: '3,456', unique: '2,890', time: '1:45' },
	{ page: '/account', views: '2,345', unique: '1,890', time: '3:21' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4 @lg:gap-6">
					{devices.map((device, i) => (
						<DeviceCard key={i} {...device} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-5 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<GeoCard countries={countries} />
					<div className="@lg:col-span-4 grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6">
						<BrowserCard browsers={browsers} />
						<PagesCard pages={pages} />
					</div>
				</div>
			</div>
		</section>
	);
}
