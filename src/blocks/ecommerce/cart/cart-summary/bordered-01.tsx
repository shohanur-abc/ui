import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const BorderedHeader = ({
	icon: Icon,
	title,
	itemCount,
}: {
	icon: LucideIcon;
	title: string;
	itemCount: number;
}) => (
	<div className="flex items-center justify-between border-b-2 border-foreground pb-4">
		<div className="flex items-center gap-2">
			<Icon className="size-5" />
			<span className="text-lg font-bold">{title}</span>
		</div>
		<span className="text-sm text-muted-foreground">{itemCount} items</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between border-t-2 border-foreground pt-4">
		<span className="text-lg font-bold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$20.96' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<div className="space-y-4 border-4 border-foreground p-6">
					<BorderedHeader
						icon={ShoppingBag}
						title="Order Summary"
						itemCount={3}
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<TotalRow label="Total" value="$282.95" />
					<Button className="w-full gap-2" size="lg" asChild>
						<Link href="/checkout">
							Checkout
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
