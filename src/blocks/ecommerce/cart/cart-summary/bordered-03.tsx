import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const DashedBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="border-2 border-dashed border-muted-foreground/50 p-6">
		{children}
	</div>
);

const SectionHeader = ({
	icon: Icon,
	title,
}: { icon: LucideIcon; title: string }) => (
	<div className="mb-4 flex items-center gap-2 border-b border-dashed border-muted-foreground/50 pb-4">
		<Icon className="size-5 text-muted-foreground" />
		<span className="text-lg font-medium">{title}</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-2 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="mt-4 flex items-center justify-between border-t border-dashed border-muted-foreground/50 pt-4">
		<span className="font-semibold">{label}</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$179.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$15.12' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<DashedBorderBox>
					<SectionHeader icon={Package} title="Order Details" />
					<div className="divide-y divide-dashed divide-muted-foreground/30">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<TotalRow label="Total" value="$204.11" />
					<Button className="mt-6 w-full" size="lg" asChild>
						<Link href="/checkout">Proceed to Checkout</Link>
					</Button>
				</DashedBorderBox>
			</div>
		</section>
	);
}
