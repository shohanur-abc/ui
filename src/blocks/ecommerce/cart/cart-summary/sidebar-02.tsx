import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Truck, Package, ShieldCheck, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type FeatureRowProps = {
	icon: LucideIcon;
	text: string;
};

const ShippingProgress = ({
	current,
	target,
	message,
}: { current: number; target: number; message: string }) => {
	const progress = (current / target) * 100;
	return (
		<div className="mb-6 rounded-lg bg-green-500/10 p-4">
			<div className="mb-2 flex items-center justify-between text-sm">
				<span className="font-medium">{message}</span>
				<Badge className="bg-green-500 text-xs">Free!</Badge>
			</div>
			<Progress value={progress} className="h-2" />
			<p className="mt-1 text-xs text-muted-foreground">
				${target - current} more for free shipping
			</p>
		</div>
	);
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-2 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const FeatureRow = ({ icon: Icon, text }: FeatureRowProps) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<Icon className="size-4 text-green-500" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$425.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$34.00' },
	];

	const features: FeatureRowProps[] = [
		{ icon: Truck, text: 'Free express delivery' },
		{ icon: Package, text: '30-day returns' },
		{ icon: ShieldCheck, text: 'Secure payment' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[520px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Cart Summary</h3>
				<ShippingProgress current={425} target={500} message="Almost there!" />
				<div className="mb-4 divide-y">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$459.00</span>
				</div>
				<Button className="mb-4 w-full" size="lg" asChild>
					<Link href="/checkout">Proceed to Checkout</Link>
				</Button>
				<div className="space-y-2">
					{features.map((feature, i) => (
						<FeatureRow key={i} {...feature} />
					))}
				</div>
			</aside>
		</section>
	);
}
