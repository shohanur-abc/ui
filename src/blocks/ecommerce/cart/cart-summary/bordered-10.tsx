import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Gift, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const FestiveBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="relative overflow-hidden rounded-xl border-2 border-pink-500/50 p-6">
		<div className="absolute -left-4 top-4 size-16 rounded-full bg-pink-500/10 blur-xl" />
		<div className="absolute -right-4 bottom-4 size-16 rounded-full bg-purple-500/10 blur-xl" />
		<div className="relative">{children}</div>
	</div>
);

const GiftHeader = ({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: LucideIcon;
	title: string;
	subtitle: string;
}) => (
	<div className="mb-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-3">
		<div className="flex size-10 items-center justify-center rounded-lg bg-pink-500/20">
			<Icon className="size-5 text-pink-500" />
		</div>
		<div>
			<span className="font-semibold">{title}</span>
			<p className="text-xs text-muted-foreground">{subtitle}</p>
		</div>
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
		<span className="font-semibold">{label}</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Gift Wrapping', value: '$9.99' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$24.72' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<FestiveBorderBox>
					<GiftHeader
						icon={Gift}
						title="Gift Ready!"
						subtitle="Premium wrapping included"
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$333.71" />
					<Button
						className="mt-6 w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							<Sparkles className="size-4" />
							Send as Gift
						</Link>
					</Button>
				</FestiveBorderBox>
			</div>
		</section>
	);
}
