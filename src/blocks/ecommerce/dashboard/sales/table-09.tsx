'use client';

import { Percent, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type PromotionData = {
	id: string;
	name: string;
	code: string;
	type: 'percentage' | 'fixed' | 'bogo' | 'free-shipping';
	discount: string;
	usageCount: number;
	usageLimit: number;
	revenue: number;
	status: 'active' | 'scheduled' | 'expired';
	endDate: string;
};

type PromotionTableCardProps = {
	title: string;
	description: string;
	promotions: PromotionData[];
};

const getTypeLabel = (type: PromotionData['type']) => {
	switch (type) {
		case 'percentage':
			return '% Off';
		case 'fixed':
			return '$ Off';
		case 'bogo':
			return 'BOGO';
		case 'free-shipping':
			return 'Free Ship';
	}
};

const getStatusVariant = (status: PromotionData['status']) => {
	switch (status) {
		case 'active':
			return 'default';
		case 'scheduled':
			return 'secondary';
		case 'expired':
			return 'outline';
	}
};

const PromotionTableCard = ({
	title,
	description,
	promotions,
}: PromotionTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Percent className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Promotion</TableHead>
							<TableHead>Code</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Discount</TableHead>
							<TableHead className="w-[140px]">Usage</TableHead>
							<TableHead className="text-right">Revenue</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Ends</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{promotions.map((promo) => (
							<TableRow key={promo.id} className="hover:bg-muted/50 transition-colors">
								<TableCell className="font-medium">{promo.name}</TableCell>
								<TableCell>
									<code className="px-2 py-1 rounded bg-muted text-sm">
										{promo.code}
									</code>
								</TableCell>
								<TableCell>
									<Badge variant="outline">{getTypeLabel(promo.type)}</Badge>
								</TableCell>
								<TableCell className="font-semibold text-primary">
									{promo.discount}
								</TableCell>
								<TableCell>
									<div className="space-y-1">
										<div className="flex justify-between text-xs">
											<span>{promo.usageCount}</span>
											<span className="text-muted-foreground">/{promo.usageLimit}</span>
										</div>
										<Progress
											value={(promo.usageCount / promo.usageLimit) * 100}
											className="h-1.5"
										/>
									</div>
								</TableCell>
								<TableCell className="text-right font-semibold">
									${promo.revenue.toLocaleString()}
								</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(promo.status)}>
										{promo.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										<Calendar className="size-3" />
										{promo.endDate}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const promotions: PromotionData[] = [
		{ id: 'PRM-001', name: 'Winter Sale', code: 'WINTER25', type: 'percentage', discount: '25%', usageCount: 1250, usageLimit: 2000, revenue: 45000, status: 'active', endDate: 'Jan 31' },
		{ id: 'PRM-002', name: 'New Customer', code: 'WELCOME10', type: 'fixed', discount: '$10', usageCount: 890, usageLimit: 5000, revenue: 28500, status: 'active', endDate: 'Ongoing' },
		{ id: 'PRM-003', name: 'Buy One Get One', code: 'BOGO2024', type: 'bogo', discount: '50%', usageCount: 420, usageLimit: 500, revenue: 18200, status: 'active', endDate: 'Jan 20' },
		{ id: 'PRM-004', name: 'Free Shipping', code: 'SHIPFREE', type: 'free-shipping', discount: 'Free', usageCount: 2100, usageLimit: 3000, revenue: 62000, status: 'active', endDate: 'Feb 15' },
		{ id: 'PRM-005', name: 'Flash Sale', code: 'FLASH30', type: 'percentage', discount: '30%', usageCount: 0, usageLimit: 1000, revenue: 0, status: 'scheduled', endDate: 'Feb 1' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<PromotionTableCard
					title="Active Promotions"
					description="Current discount codes and campaigns"
					promotions={promotions}
				/>
			</div>
		</section>
	);
}
