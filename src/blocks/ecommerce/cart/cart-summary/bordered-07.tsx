import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const RoundedBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-3xl border-2 border-muted-foreground/30 p-6">
		{children}
	</div>
);

const CircularHeader = ({
	icon: Icon,
	title,
	itemCount,
}: {
	icon: LucideIcon;
	title: string;
	itemCount: number;
}) => (
	<div className="mb-6 flex flex-col items-center text-center">
		<div className="mb-3 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
			<Icon className="size-7 text-primary" />
		</div>
		<span className="text-lg font-semibold">{title}</span>
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
	<div className="flex items-center justify-between rounded-full bg-muted px-4 py-3">
		<span className="font-medium">{label}</span>
		<span className="text-lg font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$219.00' },
		{ label: 'Shipping', value: '$11.99' },
		{ label: 'Tax', value: '$18.48' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<RoundedBorderBox>
					<CircularHeader
						icon={ShoppingCart}
						title="Your Order"
						itemCount={4}
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<div className="my-4">
						<TotalRow label="Total" value="$249.47" />
					</div>
					<Button className="w-full rounded-full" size="lg" asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</RoundedBorderBox>
			</div>
		</section>
	);
}
