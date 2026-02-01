import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Timer, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	strike?: boolean;
};

const FlashBackground = () => (
	<div className="absolute inset-0 overflow-hidden">
		<div className="absolute left-1/4 top-1/4 h-32 w-64 rotate-45 bg-gradient-to-r from-amber-500/40 to-orange-500/40 blur-3xl" />
		<div className="absolute bottom-1/4 right-1/4 h-32 w-64 -rotate-45 bg-gradient-to-r from-red-500/40 to-rose-500/40 blur-3xl" />
	</div>
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-amber-500/30 bg-white/10 p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl dark:bg-black/20">
		{children}
	</div>
);

const CountdownHeader = ({
	icon: Icon,
	message,
	time,
}: {
	icon: LucideIcon;
	message: string;
	time: string;
}) => (
	<div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-3 backdrop-blur">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-amber-500" />
			<span className="font-medium">{message}</span>
		</div>
		<span className="font-mono text-lg font-bold text-amber-500">{time}</span>
	</div>
);

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span
			className={strike ? 'text-muted-foreground line-through' : 'font-medium'}
		>
			{value}
		</span>
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
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<p className="text-right text-sm text-green-400">Save {savings}</p>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$449.00' },
		{ label: 'Flash Discount (-25%)', value: '-$112.25' },
		{ label: 'Shipping', value: '$19.99', strike: true },
		{ label: 'Tax', value: '$26.94' },
	];

	return (
		<section className="@container relative">
			<FlashBackground />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<CountdownHeader icon={Timer} message="Flash Sale" time="02:45:30" />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$363.69" savings="$132.24" />
					<Button
						className="mt-6 w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							<Zap className="size-4" />
							Grab This Deal
						</Link>
					</Button>
				</GlassCard>
			</div>
		</section>
	);
}
