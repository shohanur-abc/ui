import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Tag,
	TrendingUp,
	Percent,
	ShoppingBag,
	DollarSign,
} from 'lucide-react';

interface CouponStatProps {
	code: string;
	discount: string;
	usageCount: string;
	revenue: string;
	status: 'active' | 'expired' | 'scheduled';
}

const CouponRow = ({
	code,
	discount,
	usageCount,
	revenue,
	status,
}: CouponStatProps) => {
	const statusConfig = {
		active: { color: 'bg-accent text-accent-foreground', label: 'Active' },
		expired: {
			color: 'bg-secondary text-secondary-foreground',
			label: 'Expired',
		},
		scheduled: {
			color: 'bg-primary text-primary-foreground',
			label: 'Scheduled',
		},
	};

	return (
		<div className="flex items-center gap-4 py-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Tag className="size-4 text-primary" />
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-mono font-semibold">{code}</span>
					<Badge className={statusConfig[status].color}>
						{statusConfig[status].label}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{discount} discount</p>
			</div>
			<div className="text-right">
				<p className="font-medium">{usageCount} uses</p>
				<p className="text-sm text-muted-foreground">{revenue} revenue</p>
			</div>
		</div>
	);
};

export default function Main() {
	const summaryStats = [
		{ icon: Tag, label: 'Active Coupons', value: '24' },
		{ icon: ShoppingBag, label: 'Total Uses', value: '12,847' },
		{ icon: DollarSign, label: 'Revenue Generated', value: '$284K' },
		{ icon: Percent, label: 'Avg. Discount', value: '18%' },
	];

	const coupons: CouponStatProps[] = [
		{
			code: 'SUMMER24',
			discount: '20%',
			usageCount: '4,284',
			revenue: '$124K',
			status: 'active',
		},
		{
			code: 'NEWUSER',
			discount: '$15',
			usageCount: '3,847',
			revenue: '$98K',
			status: 'active',
		},
		{
			code: 'FLASH50',
			discount: '50%',
			usageCount: '2,847',
			revenue: '$42K',
			status: 'expired',
		},
		{
			code: 'FALL24',
			discount: '25%',
			usageCount: '0',
			revenue: '$0',
			status: 'scheduled',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="grid grid-cols-2 gap-4">
						{summaryStats.map((stat, i) => (
							<Card key={i} className="p-4 text-center">
								<stat.icon className="mx-auto size-5 text-primary" />
								<p className="mt-2 text-xl font-bold">{stat.value}</p>
								<p className="text-xs text-muted-foreground">{stat.label}</p>
							</Card>
						))}
					</div>
					<Card className="p-5 @lg:col-span-2">
						<h3 className="font-semibold">Coupon Performance</h3>
						<Separator className="my-4" />
						<div className="divide-y">
							{coupons.map((coupon, i) => (
								<CouponRow key={i} {...coupon} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
