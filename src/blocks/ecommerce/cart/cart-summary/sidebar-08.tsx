import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Timer, Flame, Zap, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	strike?: boolean;
};

type CountdownProps = {
	hours: number;
	minutes: number;
	seconds: number;
};

const FlashSaleBanner = ({
	icon: Icon,
	message,
	countdown,
}: { icon: LucideIcon; message: string; countdown: CountdownProps }) => (
	<div className="mb-4 overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
		<div className="flex items-center gap-2">
			<Icon className="size-5" />
			<span className="font-semibold">{message}</span>
		</div>
		<div className="mt-2 flex gap-2 font-mono text-lg font-bold">
			<span className="rounded bg-black/20 px-2 py-1">
				{String(countdown.hours).padStart(2, '0')}
			</span>
			<span className="py-1">:</span>
			<span className="rounded bg-black/20 px-2 py-1">
				{String(countdown.minutes).padStart(2, '0')}
			</span>
			<span className="py-1">:</span>
			<span className="rounded bg-black/20 px-2 py-1">
				{String(countdown.seconds).padStart(2, '0')}
			</span>
		</div>
	</div>
);

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className={strike ? 'text-muted-foreground line-through' : 'font-medium'}>
			{value}
		</span>
	</div>
);

const SavingsBadge = ({ amount }: { amount: string }) => (
	<div className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 py-2">
		<Flame className="size-4 text-green-600 dark:text-green-400" />
		<span className="font-semibold text-green-600 dark:text-green-400">
			You save {amount}
		</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$749.00' },
		{ label: 'Flash Sale (-40%)', value: '-$299.60' },
		{ label: 'Shipping', value: '$15.99', strike: true },
		{ label: 'Tax', value: '$35.95' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[520px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<FlashSaleBanner
					icon={Timer}
					message="Flash Sale Ends In"
					countdown={{ hours: 2, minutes: 45, seconds: 30 }}
				/>
				<SavingsBadge amount="$315.59" />
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<div className="text-right">
						<span className="mr-2 text-sm text-muted-foreground line-through">
							$800.94
						</span>
						<span className="text-2xl font-bold text-red-500">$485.35</span>
					</div>
				</div>
				<Button
					className="w-full gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
					size="lg"
					asChild
				>
					<Link href="/checkout">
						<Zap className="size-4" />
						Grab This Deal
					</Link>
				</Button>
			</aside>
		</section>
	);
}
