import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const FrostedContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="relative overflow-hidden rounded-3xl">
		<div className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-2xl dark:from-white/10 dark:to-white/5" />
		<div className="relative border border-white/30 p-6 dark:border-white/10">
			{children}
		</div>
	</div>
);

const VIPHeader = ({
	icon: Icon,
	title,
	badge,
}: {
	icon: LucideIcon;
	title: string;
	badge: string;
}) => (
	<div className="mb-4 flex items-center justify-between">
		<span className="text-lg font-semibold">{title}</span>
		<Badge className="gap-1 bg-white/20 text-foreground backdrop-blur hover:bg-white/30">
			<Icon className="size-3" />
			{badge}
		</Badge>
	</div>
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			discount ? 'text-green-400' : ''
		}`}
	>
		<span className={discount ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalDisplay = ({ value }: { value: string }) => (
	<div className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur">
		<p className="text-xs text-muted-foreground">Total Amount</p>
		<span className="text-3xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'VIP Discount', value: '-$89.85', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$40.73' },
	];

	return (
		<section className="@container relative" data-theme="neon">
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20" />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<FrostedContainer>
					<VIPHeader icon={Sparkles} title="VIP Order" badge="Elite Member" />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<div className="my-4">
						<TotalDisplay value="$549.88" />
					</div>
					<Button
						className="w-full gap-2 bg-white/20 backdrop-blur hover:bg-white/30"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							<CreditCard className="size-4" />
							Pay Now
						</Link>
					</Button>
				</FrostedContainer>
			</div>
		</section>
	);
}
