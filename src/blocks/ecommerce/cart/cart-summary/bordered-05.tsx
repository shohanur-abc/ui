import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Receipt, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const CornerDecorations = () => (
	<>
		<div className="absolute left-0 top-0 size-4 border-l-2 border-t-2 border-foreground" />
		<div className="absolute right-0 top-0 size-4 border-r-2 border-t-2 border-foreground" />
		<div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-foreground" />
		<div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-foreground" />
	</>
);

const Header = ({
	icon: Icon,
	title,
}: { icon: LucideIcon; title: string }) => (
	<div className="mb-4 flex items-center gap-2">
		<Icon className="size-5" />
		<span className="font-bold uppercase tracking-wider">{title}</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-mono">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="font-bold uppercase tracking-wider">{label}</span>
		<span className="font-mono text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Shipping', value: '$14.99' },
		{ label: 'Tax', value: '$25.12' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<div className="relative p-8">
					<CornerDecorations />
					<Header icon={Receipt} title="Receipt" />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$339.11" />
					<Button className="mt-6 w-full gap-2" size="lg" asChild>
						<Link href="/checkout">
							Continue
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
