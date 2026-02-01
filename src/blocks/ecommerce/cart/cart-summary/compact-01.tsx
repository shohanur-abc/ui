import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const CompactHeader = ({
	icon: Icon,
	title,
}: {
	icon: LucideIcon;
	title: string;
}) => (
	<div className="flex items-center gap-2 text-sm font-medium">
		<Icon className="size-4" />
		{title}
	</div>
);

const InlineRow = ({ label, value }: SummaryRowProps) => (
	<span className="text-sm text-muted-foreground">
		{label}: <span className="font-medium text-foreground">{value}</span>
	</span>
);

const TotalDisplay = ({ value }: { value: string }) => (
	<div className="flex items-center gap-2">
		<span className="text-sm text-muted-foreground">Total:</span>
		<span className="text-lg font-bold">{value}</span>
	</div>
);

export default function Main() {
	const items: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$199.00' },
		{ label: 'Shipping', value: '$9.99' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @md:py-10 @xl:py-12">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
					<CompactHeader icon={ShoppingCart} title="Cart Summary" />
					<div className="flex flex-wrap items-center gap-4">
						{items.map((item, i) => (
							<InlineRow key={i} {...item} />
						))}
						<Separator orientation="vertical" className="h-4" />
						<TotalDisplay value="$225.78" />
					</div>
					<Button size="sm" className="gap-1" asChild>
						<Link href="/checkout">
							Checkout
							<ArrowRight className="size-3" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
