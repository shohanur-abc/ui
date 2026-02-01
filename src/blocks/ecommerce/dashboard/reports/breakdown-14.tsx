'use client';

import { Ticket, Tag, Percent, Gift } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type DiscountTypeProps = {
	type: string;
	icon: React.ElementType;
	usage: string;
	revenue: string;
	discount: string;
	percentage: number;
};

const DiscountType = ({
	type,
	icon: Icon,
	usage,
	revenue,
	discount,
	percentage,
}: DiscountTypeProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<div>
					<p className="font-medium">{type}</p>
					<p className="text-xs text-muted-foreground">{usage} uses</p>
				</div>
			</div>
			<div className="mt-3 grid grid-cols-2 gap-2 text-sm">
				<div>
					<p className="text-muted-foreground">Revenue</p>
					<p className="font-bold">{revenue}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Discount</p>
					<p className="font-bold text-amber-500">{discount}</p>
				</div>
			</div>
			<Progress value={percentage} className="mt-3 h-1.5" />
		</CardContent>
	</Card>
);

type CouponProps = {
	code: string;
	type: string;
	uses: string;
	revenue: string;
	discount: string;
	convRate: string;
};

export default function Main() {
	const types: DiscountTypeProps[] = [
		{
			type: 'Percentage Off',
			icon: Percent,
			usage: '8,450',
			revenue: '$425,200',
			discount: '-$85,040',
			percentage: 45,
		},
		{
			type: 'Fixed Amount',
			icon: Tag,
			usage: '4,280',
			revenue: '$285,400',
			discount: '-$42,810',
			percentage: 24,
		},
		{
			type: 'Free Shipping',
			icon: Gift,
			usage: '3,850',
			revenue: '$198,500',
			discount: '-$38,500',
			percentage: 20,
		},
		{
			type: 'Buy X Get Y',
			icon: Ticket,
			usage: '2,180',
			revenue: '$142,800',
			discount: '-$28,560',
			percentage: 11,
		},
	];

	const coupons: CouponProps[] = [
		{
			code: 'SUMMER25',
			type: '25% Off',
			uses: '2,450',
			revenue: '$142,800',
			discount: '-$47,600',
			convRate: '8.2%',
		},
		{
			code: 'FREESHIP',
			type: 'Free Shipping',
			uses: '1,850',
			revenue: '$98,500',
			discount: '-$18,500',
			convRate: '12.5%',
		},
		{
			code: 'WELCOME10',
			type: '$10 Off',
			uses: '1,620',
			revenue: '$85,400',
			discount: '-$16,200',
			convRate: '15.8%',
		},
		{
			code: 'VIP20',
			type: '20% Off',
			uses: '980',
			revenue: '$128,500',
			discount: '-$32,125',
			convRate: '22.4%',
		},
		{
			code: 'BUNDLE15',
			type: '15% Off',
			uses: '720',
			revenue: '$68,400',
			discount: '-$12,060',
			convRate: '9.5%',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Ticket className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Discount & Coupon Breakdown
								</CardTitle>
								<CardDescription>Usage and impact analysis</CardDescription>
							</div>
						</div>
						<Badge
							variant="outline"
							className="border-amber-500/20 bg-amber-500/10 text-amber-500"
						>
							Total Discounts: -$194,910
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{types.map((t, i) => (
								<DiscountType key={i} {...t} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">Top Coupon Codes</p>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Code</TableHead>
												<TableHead>Type</TableHead>
												<TableHead className="text-right">Uses</TableHead>
												<TableHead className="text-right">Revenue</TableHead>
												<TableHead className="text-right">Discount</TableHead>
												<TableHead className="text-right">Conv Rate</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{coupons.map((c, i) => (
												<TableRow key={i}>
													<TableCell>
														<Badge variant="outline" className="font-mono">
															{c.code}
														</Badge>
													</TableCell>
													<TableCell className="text-muted-foreground">
														{c.type}
													</TableCell>
													<TableCell className="text-right">{c.uses}</TableCell>
													<TableCell className="text-right font-medium">
														{c.revenue}
													</TableCell>
													<TableCell className="text-right text-amber-500">
														{c.discount}
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
														>
															{c.convRate}
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
