import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type RowProps = {
	label: string;
	value: string;
};

const Row = ({ label, value }: RowProps) => (
	<div className="flex items-center justify-between py-1.5 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	badge,
}: { label: string; value: string; badge?: string }) => (
	<div className="flex items-center justify-between border-t py-3">
		<div className="flex items-center gap-2">
			<span className="font-semibold">{label}</span>
			{badge && <Badge variant="secondary">{badge}</Badge>}
		</div>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const rows: RowProps[] = [
		{ label: 'Subtotal', value: '$549.00' },
		{ label: 'Discount (10%)', value: '-$54.90' },
		{ label: 'Shipping', value: '$0.00' },
		{ label: 'Tax', value: '$39.53' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-2">
					<div className="divide-y">
						{rows.map((row, i) => (
							<Row key={i} {...row} />
						))}
					</div>
					<TotalRow label="Total" value="$533.63" badge="Saved $54.90" />
					<Button className="w-full" size="lg" asChild>
						<Link href="/checkout">Proceed to Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
