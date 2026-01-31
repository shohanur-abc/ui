import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span>{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="font-medium">{label}</span>
		<span className="text-lg font-semibold">{value}</span>
	</div>
);

const CheckoutLink = ({
	label,
	href,
}: { label: string; href: string }) => (
	<Button variant="link" className="h-auto gap-1 p-0" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-3" />
		</Link>
	</Button>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$149.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$12.72' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-sm px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-4">
					<div className="space-y-2">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator />
					<TotalRow label="Total" value="$171.71" />
					<div className="flex justify-end">
						<CheckoutLink label="Checkout" href="/checkout" />
					</div>
				</div>
			</div>
		</section>
	);
}
