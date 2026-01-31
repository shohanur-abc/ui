import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type InlineItemProps = {
	label: string;
	value: string;
};

const InlineItem = ({ label, value }: InlineItemProps) => (
	<div className="flex items-center gap-1 text-sm">
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalInline = ({ value }: { value: string }) => (
	<div className="flex items-center gap-2">
		<span className="text-sm text-muted-foreground">Total:</span>
		<span className="text-lg font-bold">{value}</span>
	</div>
);

export default function Main() {
	const items: InlineItemProps[] = [
		{ label: 'Subtotal', value: '$129.00' },
		{ label: 'Shipping', value: '$7.99' },
		{ label: 'Tax', value: '$10.96' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card px-4 py-3">
					{items.map((item, i) => (
						<InlineItem key={i} {...item} />
					))}
					<Separator orientation="vertical" className="h-4" />
					<TotalInline value="$147.95" />
					<div className="ml-auto">
						<Button size="sm" className="gap-1" asChild>
							<Link href="/checkout">
								Checkout
								<ArrowRight className="size-3" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
