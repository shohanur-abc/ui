'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Keyword = {
	keyword: string;
	volume: number;
	position: number;
	previousPosition: number;
	clicks: number;
	impressions: number;
	ctr: number;
};

const KeywordRow = ({ keyword }: { keyword: Keyword }) => {
	const positionChange = keyword.previousPosition - keyword.position;
	const TrendIcon = positionChange > 0 ? TrendingUp : positionChange < 0 ? TrendingDown : Minus;
	const trendColor = positionChange > 0 ? 'text-emerald-500' : positionChange < 0 ? 'text-rose-500' : 'text-muted-foreground';

	return (
		<TableRow className="hover:bg-muted/30">
			<TableCell className="font-medium">{keyword.keyword}</TableCell>
			<TableCell>{keyword.volume.toLocaleString()}</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Badge variant="outline" className="font-mono">{keyword.position}</Badge>
					<div className={`flex items-center gap-0.5 ${trendColor}`}>
						<TrendIcon className="size-3" />
						<span className="text-xs">{Math.abs(positionChange)}</span>
					</div>
				</div>
			</TableCell>
			<TableCell>{keyword.clicks.toLocaleString()}</TableCell>
			<TableCell>{keyword.impressions.toLocaleString()}</TableCell>
			<TableCell>
				<span className={keyword.ctr >= 5 ? 'text-emerald-500' : keyword.ctr >= 2 ? 'text-amber-500' : 'text-rose-500'}>
					{keyword.ctr}%
				</span>
			</TableCell>
		</TableRow>
	);
};

const keywords: Keyword[] = [
	{ keyword: 'wireless headphones', volume: 135000, position: 3, previousPosition: 5, clicks: 4520, impressions: 85000, ctr: 5.32 },
	{ keyword: 'best bluetooth earbuds', volume: 74000, position: 7, previousPosition: 8, clicks: 1840, impressions: 42000, ctr: 4.38 },
	{ keyword: 'smart watch deals', volume: 49000, position: 12, previousPosition: 10, clicks: 620, impressions: 28000, ctr: 2.21 },
	{ keyword: 'gaming mouse rgb', volume: 33000, position: 5, previousPosition: 5, clicks: 2150, impressions: 38000, ctr: 5.66 },
	{ keyword: 'mechanical keyboard', volume: 89000, position: 18, previousPosition: 22, clicks: 340, impressions: 15000, ctr: 2.27 },
	{ keyword: 'portable bluetooth speaker', volume: 62000, position: 9, previousPosition: 6, clicks: 1280, impressions: 35000, ctr: 3.66 },
	{ keyword: 'noise cancelling headphones', volume: 110000, position: 4, previousPosition: 7, clicks: 3850, impressions: 72000, ctr: 5.35 },
	{ keyword: 'usb c hub', volume: 41000, position: 14, previousPosition: 15, clicks: 520, impressions: 18000, ctr: 2.89 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">SEO Keywords</CardTitle>
						<p className="text-xs text-muted-foreground">Search ranking and performance</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Keyword</TableHead>
										<TableHead>Volume</TableHead>
										<TableHead>Position</TableHead>
										<TableHead>Clicks</TableHead>
										<TableHead>Impressions</TableHead>
										<TableHead>CTR</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{keywords.map((keyword, i) => (
										<KeywordRow key={i} keyword={keyword} />
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
