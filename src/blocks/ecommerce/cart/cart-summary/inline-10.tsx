import { Button } from '@/components/ui/button';
import { Wallet, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type InstallmentInfoProps = {
	icon: LucideIcon;
	installments: number;
	perPayment: string;
};

const InstallmentInfo = ({
	icon: Icon,
	installments,
	perPayment,
}: InstallmentInfoProps) => (
	<div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
		<Icon className="size-4 text-primary" />
		<span className="text-sm">
			or {installments}x <span className="font-semibold">{perPayment}</span>
		</span>
	</div>
);

const TotalPrice = ({ label, value }: { label: string; value: string }) => (
	<div>
		<span className="text-sm text-muted-foreground">{label}</span>
		<span className="ml-2 text-xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
					<div className="flex flex-wrap items-center gap-4">
						<TotalPrice label="Total:" value="$599.00" />
						<InstallmentInfo
							icon={Wallet}
							installments={4}
							perPayment="$149.75"
						/>
					</div>
					<Button className="gap-2" asChild>
						<Link href="/checkout">
							<CreditCard className="size-4" />
							Pay
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
