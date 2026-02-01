import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

const DoubleBorderContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="relative border-2 border-primary p-1">
		<div className="border border-primary p-6">{children}</div>
	</div>
);

const Header = ({
	title,
	badge,
}: {
	title: string;
	badge: { label: string; icon: LucideIcon };
}) => (
	<div className="flex items-center justify-between pb-4">
		<span className="text-lg font-bold">{title}</span>
		<Badge className="gap-1" variant="secondary">
			<badge.icon className="size-3" />
			{badge.label}
		</Badge>
	</div>
);

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			highlight ? 'text-green-600 dark:text-green-400' : ''
		}`}
	>
		<span className={highlight ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between border-t-2 border-primary pt-4">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'Member Discount', value: '-$39.90', highlight: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$28.73' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<DoubleBorderContainer>
					<Header
						title="Order Summary"
						badge={{ label: 'Premium', icon: Sparkles }}
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<div className="mt-4">
						<TotalRow label="Total" value="$387.83" />
					</div>
					<Button className="mt-6 w-full gap-2" size="lg" asChild>
						<Link href="/checkout">
							<CreditCard className="size-4" />
							Pay Now
						</Link>
					</Button>
				</DoubleBorderContainer>
			</div>
		</section>
	);
}
