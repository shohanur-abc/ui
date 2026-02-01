import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type RowProps = {
	label: string;
	value: string;
};

const Row = ({ label, value }: RowProps) => (
	<div className="flex justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span>{value}</span>
	</div>
);

const PromoField = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="h-8 text-sm" />
		<Button variant="ghost" size="sm">
			{buttonLabel}
		</Button>
	</div>
);

const Total = ({ value }: { value: string }) => (
	<div className="text-right">
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const rows: RowProps[] = [
		{ label: 'Subtotal', value: '$175.00' },
		{ label: 'Shipping', value: '$8.99' },
		{ label: 'Tax', value: '$14.72' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					<div className="space-y-1">
						{rows.map((row, i) => (
							<Row key={i} {...row} />
						))}
					</div>
					<PromoField placeholder="Promo code" buttonLabel="Apply" />
					<Separator />
					<Total value="$198.71" />
					<Button className="w-full" asChild>
						<Link href="/checkout">Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
