import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	ShieldCheck,
	Lock,
	RefreshCw,
	CreditCard,
	Truck,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type TrustBadgeProps = {
	icon: LucideIcon;
	label: string;
};

type PaymentIconProps = {
	name: string;
};

const TrustBadge = ({ icon: Icon, label }: TrustBadgeProps) => (
	<div className="flex flex-col items-center gap-1">
		<div className="flex size-10 items-center justify-center rounded-full bg-green-500/10">
			<Icon className="size-5 text-green-500" />
		</div>
		<span className="text-[10px] text-muted-foreground">{label}</span>
	</div>
);

const PaymentIcon = ({ name }: PaymentIconProps) => (
	<div className="flex size-10 items-center justify-center rounded border bg-muted/50 text-xs font-bold">
		{name}
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const trustBadges: TrustBadgeProps[] = [
		{ icon: ShieldCheck, label: 'Secure' },
		{ icon: Lock, label: 'Encrypted' },
		{ icon: RefreshCw, label: '30-Day' },
		{ icon: Truck, label: 'Fast Ship' },
	];

	const paymentMethods: PaymentIconProps[] = [
		{ name: 'Visa' },
		{ name: 'MC' },
		{ name: 'Amex' },
		{ name: 'PP' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$31.92' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[560px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Secure Checkout</h3>
				<div className="mb-4 flex justify-between rounded-lg bg-muted/50 p-3">
					{trustBadges.map((badge, i) => (
						<TrustBadge key={i} {...badge} />
					))}
				</div>
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$430.92</span>
				</div>
				<Button className="mb-4 w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						<CreditCard className="size-4" />
						Pay Securely
					</Link>
				</Button>
				<div className="space-y-2">
					<p className="text-center text-xs text-muted-foreground">We accept</p>
					<div className="flex justify-center gap-2">
						{paymentMethods.map((method, i) => (
							<PaymentIcon key={i} {...method} />
						))}
					</div>
				</div>
			</aside>
		</section>
	);
}
