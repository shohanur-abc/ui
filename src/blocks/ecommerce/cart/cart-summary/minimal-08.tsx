import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import Link from 'next/link';

type RowProps = {
	label: string;
	value: string;
	free?: boolean;
};

const Row = ({ label, value, free }: RowProps) => (
	<div className="flex justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className={free ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const FreeShippingBanner = ({ text }: { text: string }) => (
	<div className="flex items-center justify-center gap-2 rounded bg-green-500/10 py-1.5 text-xs text-green-600 dark:text-green-400">
		<Truck className="size-3" />
		{text}
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between border-t pt-2">
		<span className="font-medium">{label}</span>
		<span className="text-lg font-bold">{value}</span>
	</div>
);

export default function Main() {
	const rows: RowProps[] = [
		{ label: 'Subtotal', value: '$425.00' },
		{ label: 'Shipping', value: 'Free', free: true },
		{ label: 'Tax', value: '$34.00' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					<FreeShippingBanner text="You qualify for free shipping!" />
					<div className="space-y-1">
						{rows.map((row, i) => (
							<Row key={i} {...row} />
						))}
					</div>
					<TotalRow label="Total" value="$459.00" />
					<Button className="w-full" asChild>
						<Link href="/checkout">Continue</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
