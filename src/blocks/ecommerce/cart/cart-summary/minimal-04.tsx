import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between ${highlight ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'} text-sm`}
	>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const Header = ({ title }: { title: string }) => (
	<h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
		{title}
	</h3>
);

const TotalDisplay = ({ value }: { value: string }) => (
	<div className="text-center">
		<span className="text-3xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const items: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'Promo applied', value: '-$39.90', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$28.73' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-4">
					<Header title="Order Summary" />
					<TotalDisplay value="$387.83" />
					<Separator />
					<div className="space-y-1">
						{items.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Button className="w-full" asChild>
						<Link href="/checkout">Pay Now</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
