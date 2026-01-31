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

const PulseBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="relative overflow-hidden rounded-xl border-2 border-amber-500 p-6">
		<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent" />
		<div className="relative">{children}</div>
	</div>
);

const CountdownHeader = ({
	icon: Icon,
	message,
	time,
}: { icon: LucideIcon; message: string; time: string }) => (
	<div className="mb-4 flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-amber-500" />
			<span className="font-semibold">{message}</span>
		</div>
		<span className="font-mono text-lg font-bold text-amber-500">{time}</span>
	</div>
);

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className={strike ? 'text-muted-foreground line-through' : 'font-medium'}>
			{value}
		</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	savings,
}: { label: string; value: string; savings: string }) => (
	<div className="flex items-center justify-between">
		<span className="font-semibold">{label}</span>
		<div className="text-right">
			<span className="text-xl font-bold">{value}</span>
			<p className="text-xs text-green-600 dark:text-green-400">Save {savings}</p>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'Flash Discount', value: '-$149.75' },
		{ label: 'Regular Shipping', value: '$19.99', strike: true },
		{ label: 'Tax', value: '$35.94' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<PulseBorderBox>
					<CountdownHeader
						icon={Timer}
						message="Flash Sale Ends"
						time="02:45:30"
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$485.19" savings="$169.74" />
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
				</PulseBorderBox>
			</div>
		</section>
	);
}
