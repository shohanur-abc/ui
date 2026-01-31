'use client';

import { Percent, Tag, Gift, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type DiscountData = {
	code: string;
	type: 'percentage' | 'fixed' | 'freeShipping' | 'bundle';
	discount: string;
	used: number;
	limit: number;
	revenue: string;
	status: 'active' | 'expiring' | 'expired';
};

const typeIcons = {
	percentage: Percent,
	fixed: Tag,
	freeShipping: Gift,
	bundle: Zap,
};

const statusConfig = {
	active: { label: 'Active', variant: 'default' as const },
	expiring: { label: 'Expiring Soon', variant: 'secondary' as const },
	expired: { label: 'Expired', variant: 'destructive' as const },
};

type DiscountCardProps = {
	title: string;
	discounts: DiscountData[];
};

const DiscountCard = ({ title, discounts }: DiscountCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Tag className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{discounts.map((discount, idx) => {
				const Icon = typeIcons[discount.type];
				const usagePercent = (discount.used / discount.limit) * 100;

				return (
					<div
						key={idx}
						className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors space-y-3"
					>
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10 text-primary">
									<Icon className="size-4" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<code className="font-mono font-bold">{discount.code}</code>
										<Badge variant={statusConfig[discount.status].variant}>
											{statusConfig[discount.status].label}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground">
										{discount.discount}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-semibold">{discount.revenue}</p>
								<p className="text-xs text-muted-foreground">revenue</p>
							</div>
						</div>
						<div className="space-y-1">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>
									{discount.used} / {discount.limit} uses
								</span>
								<span>{usagePercent.toFixed(0)}%</span>
							</div>
							<Progress value={usagePercent} className="h-1.5" />
						</div>
					</div>
				);
			})}
		</CardContent>
	</Card>
);

export default function Main() {
	const discounts: DiscountData[] = [
		{
			code: 'SUMMER25',
			type: 'percentage',
			discount: '25% off entire order',
			used: 847,
			limit: 1000,
			revenue: '$42,350',
			status: 'active',
		},
		{
			code: 'FREESHIP',
			type: 'freeShipping',
			discount: 'Free shipping on orders $50+',
			used: 2341,
			limit: 5000,
			revenue: '$28,920',
			status: 'active',
		},
		{
			code: 'BUNDLE20',
			type: 'bundle',
			discount: '20% off when buying 3+ items',
			used: 456,
			limit: 500,
			revenue: '$18,240',
			status: 'expiring',
		},
		{
			code: 'FLASH10',
			type: 'fixed',
			discount: '$10 off orders over $75',
			used: 1000,
			limit: 1000,
			revenue: '$15,000',
			status: 'expired',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<DiscountCard title="Active Promotions" discounts={discounts} />
				</div>
			</div>
		</section>
	);
}
