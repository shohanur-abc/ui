import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const GlassContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
		{children}
	</div>
);

const GlassHeader = ({
	icon: Icon,
	title,
	itemCount,
}: {
	icon: LucideIcon;
	title: string;
	itemCount: number;
}) => (
	<div className="mb-4 flex items-center justify-between">
		<div className="flex items-center gap-2">
			<div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
				<Icon className="size-5" />
			</div>
			<span className="text-lg font-semibold">{title}</span>
		</div>
		<span className="text-sm text-muted-foreground">{itemCount} items</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$349.00' },
		{ label: 'Shipping', value: '$14.99' },
		{ label: 'Tax', value: '$29.12' },
	];

	return (
		<section className="@container relative">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20" />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassContainer>
					<GlassHeader icon={ShoppingBag} title="Order Summary" itemCount={3} />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$393.11" />
					<Button
						className="mt-6 w-full gap-2 bg-white/20 text-foreground backdrop-blur hover:bg-white/30"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							Checkout
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</GlassContainer>
			</div>
		</section>
	);
}
