import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tag, Check, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const GreenGlassBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="overflow-hidden rounded-2xl border border-green-500/30 bg-white/10 shadow-xl backdrop-blur-xl dark:bg-black/20">
		{children}
	</div>
);

const GradientHeader = () => (
	<div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
);

const AppliedCoupon = ({
	icon: Icon,
	code,
	discount,
}: {
	icon: LucideIcon;
	code: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between rounded-xl bg-green-500/20 p-3 backdrop-blur">
		<div className="flex items-center gap-2">
			<Check className="size-4 text-green-400" />
			<span className="font-mono font-medium">{code}</span>
		</div>
		<Badge className="bg-green-500/30 text-green-400 hover:bg-green-500/40">
			{discount}
		</Badge>
	</div>
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			discount ? 'text-green-400' : ''
		}`}
	>
		<span
			className={discount ? 'flex items-center gap-1' : 'text-muted-foreground'}
		>
			{discount && <Check className="size-3" />}
			{label}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ original, final }: { original: string; final: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">Total</span>
		<div className="text-right">
			<span className="mr-2 text-sm text-muted-foreground line-through">
				{original}
			</span>
			<span className="text-2xl font-bold">{final}</span>
		</div>
	</div>
);

const CouponInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<Input
			placeholder={placeholder}
			className="flex-1 border-white/20 bg-white/10 backdrop-blur"
		/>
		<Button
			variant="outline"
			className="border-white/20 bg-white/10 backdrop-blur"
		>
			{buttonLabel}
		</Button>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'SAVE20 Applied', value: '-$79.80', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$25.54' },
	];

	return (
		<section className="@container relative">
			<GreenGlassBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<GradientHeader />
					<div className="space-y-4 p-6">
						<AppliedCoupon icon={Tag} code="SAVE20" discount="-20%" />
						<div className="space-y-3">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator className="bg-white/20" />
						<TotalRow original="$424.54" final="$344.74" />
						<CouponInput placeholder="Add another code" buttonLabel="Apply" />
						<Button
							className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
							size="lg"
							asChild
						>
							<Link href="/checkout">Checkout & Save $79.80</Link>
						</Button>
					</div>
				</GlassCard>
			</div>
		</section>
	);
}
