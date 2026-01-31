import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone } from 'lucide-react';
import Link from 'next/link';

type RowProps = {
	label: string;
	value: string;
};

const Row = ({ label, value }: RowProps) => (
	<div className="flex justify-between text-sm text-muted-foreground">
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const TotalDisplay = ({
	label,
	value,
}: { label: string; value: string }) => (
	<div className="flex items-baseline justify-between">
		<span className="text-sm font-medium">{label}</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

const PaymentButtons = ({
	items,
}: { items: { label: string; href: string; icon: React.ElementType; variant: 'default' | 'outline' }[] }) => (
	<div className="flex gap-2">
		{items.map(({ label, href, icon: Icon, variant }, i) => (
			<Button key={i} variant={variant} className="flex-1 gap-1.5" asChild>
				<Link href={href}>
					<Icon className="size-4" />
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const rows: RowProps[] = [
		{ label: 'Subtotal', value: '$289.00' },
		{ label: 'Shipping', value: '$12.00' },
		{ label: 'Tax', value: '$24.08' },
	];

	const paymentOptions = [
		{ label: 'Card', href: '/checkout/card', icon: CreditCard, variant: 'default' as const },
		{ label: 'Pay', href: '/checkout/mobile', icon: Smartphone, variant: 'outline' as const },
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
					<Separator />
					<TotalDisplay label="Total" value="$325.08" />
					<PaymentButtons items={paymentOptions} />
				</div>
			</div>
		</section>
	);
}
