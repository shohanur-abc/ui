import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type DetailRowProps = {
	label: string;
	value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
	<div className="flex justify-between text-xs text-muted-foreground">
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const CollapsibleDetails = ({
	summary,
	details,
}: { summary: string; details: DetailRowProps[] }) => (
	<details className="group">
		<summary className="flex cursor-pointer list-none items-center justify-between text-sm text-muted-foreground">
			{summary}
			<ChevronDown className="size-4 transition-transform group-open:rotate-180" />
		</summary>
		<div className="mt-2 space-y-1 rounded bg-muted/50 p-2">
			{details.map((detail, i) => (
				<DetailRow key={i} {...detail} />
			))}
		</div>
	</details>
);

const TotalInline = ({ value }: { value: string }) => (
	<div className="flex items-center justify-between">
		<span className="font-medium">Total</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const details: DetailRowProps[] = [
		{ label: 'Subtotal', value: '$199.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$16.72' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3 rounded-lg border p-4">
					<TotalInline value="$225.71" />
					<CollapsibleDetails summary="View breakdown" details={details} />
					<Button className="w-full" asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
