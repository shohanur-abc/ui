import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type PaymentOptionProps = {
	icon: LucideIcon;
	label: string;
	detail: string;
};

const PaymentOption = ({ icon: Icon, label, detail }: PaymentOptionProps) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
		<Icon className="size-4 text-primary" />
		<div>
			<p className="text-sm font-medium">{label}</p>
			<p className="text-xs text-muted-foreground">{detail}</p>
		</div>
	</div>
);

const TotalDisplay = ({ value }: { value: string }) => (
	<div className="flex flex-col items-end">
		<span className="text-xs text-muted-foreground">Total</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
					<PaymentOption
						icon={Wallet}
						label="Pay in 4"
						detail="$62.25 / payment"
					/>
					<div className="flex items-center gap-4">
						<TotalDisplay value="$249.00" />
						<Button className="gap-1" asChild>
							<Link href="/checkout">
								Continue
								<ChevronRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
