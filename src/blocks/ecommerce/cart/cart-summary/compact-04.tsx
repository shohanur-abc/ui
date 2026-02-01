import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Truck, ShoppingBag, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type ProgressDisplayProps = {
	icon: LucideIcon;
	message: string;
	current: number;
	target: number;
};

const ShippingProgress = ({
	icon: Icon,
	message,
	current,
	target,
}: ProgressDisplayProps) => {
	const progress = Math.min((current / target) * 100, 100);
	const remaining = target - current;

	return (
		<div className="flex-1 space-y-2">
			<div className="flex items-center gap-2 text-sm">
				<Icon className="size-4 text-muted-foreground" />
				<span>
					{remaining > 0
						? `Add $${remaining.toFixed(2)} for ${message}`
						: message}
				</span>
			</div>
			<Progress value={progress} className="h-1.5" />
		</div>
	);
};

const TotalCompact = ({
	icon: Icon,
	label,
	value,
}: {
	icon: LucideIcon;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<span className="font-bold">{value}</span>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-6 rounded-xl border bg-card p-4">
					<ShippingProgress
						icon={Truck}
						message="free shipping"
						current={67}
						target={100}
					/>
					<TotalCompact icon={ShoppingBag} label="Total" value="$67.00" />
					<Button asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
