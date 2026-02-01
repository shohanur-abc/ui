import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Percent, Tag, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const LeftBorderBox = ({
	accentColor,
	children,
}: {
	accentColor: string;
	children: React.ReactNode;
}) => (
	<div className={`border-l-4 ${accentColor} bg-card pl-6 pr-4 py-6`}>
		{children}
	</div>
);

const DiscountHeader = ({
	icon: Icon,
	code,
	percentage,
}: {
	icon: LucideIcon;
	code: string;
	percentage: string;
}) => (
	<div className="mb-4 flex items-center gap-2">
		<Icon className="size-5 text-green-500" />
		<span className="font-mono font-bold">{code}</span>
		<Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400">
			{percentage}
		</Badge>
	</div>
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			discount ? 'text-green-600 dark:text-green-400' : ''
		}`}
	>
		<span className={discount ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	savings,
}: {
	label: string;
	value: string;
	savings: string;
}) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="font-semibold">{label}</span>
			<span className="text-xl font-bold">{value}</span>
		</div>
		<p className="text-right text-sm text-green-600 dark:text-green-400">
			You saved {savings}
		</p>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$499.00' },
		{ label: 'Discount (25%)', value: '-$124.75', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$29.94' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<LeftBorderBox accentColor="border-green-500">
					<DiscountHeader icon={Tag} code="SAVE25" percentage="-25%" />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$404.19" savings="$124.75" />
					<Button className="mt-6 w-full" size="lg" asChild>
						<Link href="/checkout">Checkout with Discount</Link>
					</Button>
				</LeftBorderBox>
			</div>
		</section>
	);
}
