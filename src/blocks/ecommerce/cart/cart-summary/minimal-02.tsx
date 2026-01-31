import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	muted?: boolean;
};

const SummaryRow = ({ label, value, muted }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between ${muted ? 'text-xs text-muted-foreground' : 'text-sm'}`}
	>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between border-t pt-3">
		<span className="text-base font-medium">{label}</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$245.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Est. Tax', value: '$19.60', muted: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					<div className="space-y-1.5">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<TotalRow label="Total" value="$264.60" />
					<Button className="w-full" asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
