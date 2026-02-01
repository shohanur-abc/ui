import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tag, Ticket, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const PromoSection = ({
	icon: Icon,
	placeholder,
	buttonText,
}: {
	icon: LucideIcon;
	placeholder: string;
	buttonText: string;
}) => (
	<div className="mb-6 space-y-2">
		<div className="flex items-center gap-2">
			<Icon className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Promo Code</span>
		</div>
		<div className="flex gap-2">
			<Input placeholder={placeholder} className="flex-1" />
			<Button variant="outline" size="sm">
				{buttonText}
			</Button>
		</div>
	</div>
);

const AppliedCoupon = ({
	code,
	savings,
	onRemove,
}: {
	code: string;
	savings: string;
	onRemove?: () => void;
}) => (
	<div className="mb-4 flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/10 p-3">
		<div className="flex items-center gap-2">
			<Ticket className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm font-medium">{code}</span>
		</div>
		<div className="flex items-center gap-2">
			<span className="text-sm font-medium text-green-600 dark:text-green-400">
				-{savings}
			</span>
			<button className="text-xs text-muted-foreground hover:text-foreground">
				Remove
			</button>
		</div>
	</div>
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-2 text-sm">
		<span
			className={
				discount
					? 'text-green-600 dark:text-green-400'
					: 'text-muted-foreground'
			}
		>
			{label}
		</span>
		<span
			className={`font-medium ${discount ? 'text-green-600 dark:text-green-400' : ''}`}
		>
			{value}
		</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'Discount (15%)', value: '-$89.85', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$40.73' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[540px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
				<PromoSection icon={Tag} placeholder="Enter code" buttonText="Apply" />
				<AppliedCoupon code="SAVE15" savings="$89.85" />
				<div className="mb-4 divide-y">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					<div className="flex items-center justify-between">
						<span className="text-lg font-semibold">Total</span>
						<span className="text-2xl font-bold">$549.88</span>
					</div>
					<p className="text-right text-xs text-green-600 dark:text-green-400">
						You save $89.85!
					</p>
				</div>
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						Checkout
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</aside>
		</section>
	);
}
