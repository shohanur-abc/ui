import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const SidebarHeader = ({
	icon: Icon,
	title,
	itemCount,
}: {
	icon: LucideIcon;
	title: string;
	itemCount: number;
}) => (
	<div className="mb-6 flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<h3 className="font-semibold">{title}</h3>
		</div>
		<Badge variant="secondary">{itemCount} items</Badge>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-2 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalSection = ({ label, value }: { label: string; value: string }) => (
	<div className="rounded-lg bg-primary/5 p-4">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold text-primary">{value}</span>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$349.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$28.96' },
		{ label: 'Discount', value: '-$0.00' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[500px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<SidebarHeader icon={ShoppingBag} title="Order Summary" itemCount={3} />
				<div className="mb-4 divide-y">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<TotalSection label="Total" value="$390.95" />
				<Button className="mt-6 w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						Checkout
						<ArrowRight className="size-4" />
					</Link>
				</Button>
				<p className="mt-4 text-center text-xs text-muted-foreground">
					Free shipping on orders over $500
				</p>
			</aside>
		</section>
	);
}
