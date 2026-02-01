'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Page = {
	path: string;
	title: string;
	views: number;
	uniqueViews: number;
	avgTime: string;
	exitRate: number;
};

const PageRow = ({ page, rank }: { page: Page; rank: number }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell>
			<Badge
				variant="outline"
				className="w-6 h-6 p-0 flex items-center justify-center text-xs"
			>
				{rank}
			</Badge>
		</TableCell>
		<TableCell>
			<div>
				<p className="font-medium text-sm">{page.title}</p>
				<p className="text-xs text-muted-foreground font-mono">{page.path}</p>
			</div>
		</TableCell>
		<TableCell className="font-medium">{page.views.toLocaleString()}</TableCell>
		<TableCell>{page.uniqueViews.toLocaleString()}</TableCell>
		<TableCell>{page.avgTime}</TableCell>
		<TableCell>
			<span
				className={
					page.exitRate > 50
						? 'text-rose-500'
						: page.exitRate > 30
							? 'text-amber-500'
							: 'text-emerald-500'
				}
			>
				{page.exitRate}%
			</span>
		</TableCell>
	</TableRow>
);

const pages: Page[] = [
	{
		path: '/',
		title: 'Homepage',
		views: 124532,
		uniqueViews: 89450,
		avgTime: '2m 15s',
		exitRate: 28,
	},
	{
		path: '/products',
		title: 'Products Listing',
		views: 85420,
		uniqueViews: 62340,
		avgTime: '4m 32s',
		exitRate: 22,
	},
	{
		path: '/products/wireless-headphones',
		title: 'Wireless Headphones',
		views: 45280,
		uniqueViews: 38920,
		avgTime: '3m 45s',
		exitRate: 35,
	},
	{
		path: '/cart',
		title: 'Shopping Cart',
		views: 32150,
		uniqueViews: 28450,
		avgTime: '2m 10s',
		exitRate: 45,
	},
	{
		path: '/checkout',
		title: 'Checkout',
		views: 18920,
		uniqueViews: 16540,
		avgTime: '5m 20s',
		exitRate: 62,
	},
	{
		path: '/about',
		title: 'About Us',
		views: 12450,
		uniqueViews: 10280,
		avgTime: '1m 45s',
		exitRate: 55,
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Top Pages</CardTitle>
						<p className="text-xs text-muted-foreground">
							Most visited pages on the site
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-12">#</TableHead>
										<TableHead>Page</TableHead>
										<TableHead>Views</TableHead>
										<TableHead>Unique</TableHead>
										<TableHead>Avg. Time</TableHead>
										<TableHead>Exit Rate</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{pages.map((page, i) => (
										<PageRow key={i} page={page} rank={i + 1} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
