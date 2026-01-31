import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Wallet, Calendar, CheckCircle2, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type InstallmentPlanProps = {
	installments: number;
	perPayment: string;
	total: string;
};

const InstallmentBanner = ({
	icon: Icon,
	provider,
	badge,
}: { icon: LucideIcon; provider: string; badge: string }) => (
	<div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 p-3">
		<Icon className="size-5 text-primary" />
		<span className="font-medium">{provider}</span>
		<Badge variant="outline" className="ml-auto">
			{badge}
		</Badge>
	</div>
);

const InstallmentSchedule = ({
	installments,
	perPayment,
	total,
}: InstallmentPlanProps) => (
	<div className="mb-4 space-y-2">
		{Array.from({ length: installments }).map((_, i) => (
			<div
				key={i}
				className="flex items-center gap-2 rounded-lg border p-2 text-sm"
			>
				<div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
					{i + 1}
				</div>
				<div className="flex-1">
					<span className="text-muted-foreground">
						{i === 0 ? 'Today' : `In ${i * 2} weeks`}
					</span>
				</div>
				<span className="font-semibold">{perPayment}</span>
			</div>
		))}
		<p className="text-center text-xs text-muted-foreground">
			Total: {total} • 0% interest
		</p>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$899.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$71.92' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[600px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Payment Options</h3>
				<InstallmentBanner
					icon={Wallet}
					provider="Pay in 4"
					badge="0% APR"
				/>
				<InstallmentSchedule
					installments={4}
					perPayment="$242.73"
					total="$970.92"
				/>
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$970.92</span>
				</div>
				<div className="space-y-2">
					<Button className="w-full gap-2" size="lg" asChild>
						<Link href="/checkout/installments">
							Pay $242.73 Today
							<ArrowRight className="size-4" />
						</Link>
					</Button>
					<Button variant="outline" className="w-full" asChild>
						<Link href="/checkout">Pay Full Amount</Link>
					</Button>
				</div>
			</aside>
		</section>
	);
}
