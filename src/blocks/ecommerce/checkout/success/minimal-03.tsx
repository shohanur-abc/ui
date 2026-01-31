import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OrderInfoProps {
	orderNumber: string;
	total: number;
	currency: string;
	estimatedDelivery: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessMessage = () => (
	<div className="text-center">
		<Badge className="mb-4">Order Placed</Badge>
		<h1 className="text-2xl @lg:text-3xl font-bold">All Set!</h1>
	</div>
);

const OrderInfo = ({
	orderNumber,
	total,
	currency,
	estimatedDelivery,
}: OrderInfoProps) => (
	<div className="flex items-center justify-between py-4 text-sm">
		<div>
			<p className="text-muted-foreground">Order</p>
			<p className="font-mono font-semibold">{orderNumber}</p>
		</div>
		<Separator orientation="vertical" className="h-8" />
		<div className="text-center">
			<p className="text-muted-foreground">Total</p>
			<p className="font-semibold">
				{currency}
				{total.toFixed(2)}
			</p>
		</div>
		<Separator orientation="vertical" className="h-8" />
		<div className="text-right">
			<p className="text-muted-foreground">Delivery</p>
			<p className="font-semibold">{estimatedDelivery}</p>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
		{items.map(({ label, href, variant }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1"
				asChild
			>
				<Link href={href}>{label}</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-sm px-4 @sm:px-6 space-y-6">
				<SuccessMessage />

				<div className="p-4 rounded-xl bg-muted/30">
					<OrderInfo
						orderNumber="ORD-78432"
						total={249.99}
						currency="$"
						estimatedDelivery="Jan 18-20"
					/>
				</div>

				<CTA
					items={[
						{ label: 'Track', href: '/track' },
						{ label: 'Shop', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
