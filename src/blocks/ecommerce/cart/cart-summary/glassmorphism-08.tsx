import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Wallet, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type InstallmentDisplayProps = {
	icon: LucideIcon;
	provider: string;
	installments: number;
	perPayment: string;
};

const PurpleGlassBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-fuchsia-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
		{children}
	</div>
);

const InstallmentPlan = ({
	icon: Icon,
	provider,
	installments,
	perPayment,
}: InstallmentDisplayProps) => (
	<div className="rounded-xl bg-white/10 p-4 backdrop-blur">
		<div className="mb-3 flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<span className="font-medium">Pay with {provider}</span>
			<Badge className="ml-auto bg-white/20 backdrop-blur">0% APR</Badge>
		</div>
		<div className="grid grid-cols-4 gap-2">
			{Array.from({ length: installments }).map((_, i) => (
				<div
					key={i}
					className="rounded-lg bg-white/10 p-2 text-center backdrop-blur"
				>
					<p className="text-[10px] text-muted-foreground">Pay {i + 1}</p>
					<p className="text-sm font-semibold">{perPayment}</p>
				</div>
			))}
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
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$899.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$71.92' },
	];

	return (
		<section className="@container relative">
			<PurpleGlassBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<h3 className="mb-4 text-base font-semibold">Flexible Payment</h3>
					<InstallmentPlan
						icon={Wallet}
						provider="Klarna"
						installments={4}
						perPayment="$242.73"
					/>
					<Separator className="my-4 bg-white/20" />
					<div className="space-y-2">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$970.92" />
					<div className="mt-6 space-y-2">
						<Button
							className="w-full gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
							size="lg"
							asChild
						>
							<Link href="/checkout/klarna">
								Pay in 4 Installments
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button
							variant="ghost"
							className="w-full bg-white/10 hover:bg-white/20"
							asChild
						>
							<Link href="/checkout">Pay Full Amount</Link>
						</Button>
					</div>
				</GlassCard>
			</div>
		</section>
	);
}
