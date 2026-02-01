import { Button } from '@/components/ui/button';
import Link from 'next/link';

type LineProps = {
	label: string;
	value: string;
};

const Line = ({ label, value }: LineProps) => (
	<span className="text-sm text-muted-foreground">
		{label}: <span className="font-medium text-foreground">{value}</span>
	</span>
);

const TotalInline = ({
	total,
	itemCount,
}: {
	total: string;
	itemCount: number;
}) => (
	<div className="flex items-baseline justify-between">
		<span className="text-sm text-muted-foreground">{itemCount} items</span>
		<span className="text-2xl font-bold">{total}</span>
	</div>
);

export default function Main() {
	const lines: LineProps[] = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Ship', value: '$12.99' },
		{ label: 'Tax', value: '$24.96' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					<TotalInline total="$336.95" itemCount={3} />
					<div className="flex flex-wrap gap-x-4 gap-y-1">
						{lines.map((line, i) => (
							<Line key={i} {...line} />
						))}
					</div>
					<Button className="w-full" asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
