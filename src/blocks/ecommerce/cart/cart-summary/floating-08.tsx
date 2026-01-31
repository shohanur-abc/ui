import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Wallet,
	Banknote,
	Coins,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type InstallmentPlanProps = {
	icon: LucideIcon;
	provider: string;
	installments: number;
	perPayment: string;
	total: string;
};

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

const InstallmentPlan = ({
	icon: Icon,
	provider,
	installments,
	perPayment,
	total,
}: InstallmentPlanProps) => (
	<div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
		<div className="mb-2 flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<span className="font-medium">Pay with {provider}</span>
		</div>
		<div className="grid grid-cols-3 gap-2 text-center">
			{Array.from({ length: installments }).map((_, i) => (
				<div key={i} className="rounded-lg bg-background p-2">
					<p className="text-xs text-muted-foreground">Payment {i + 1}</p>
					<p className="font-semibold">{perPayment}</p>
				</div>
			))}
		</div>
		<p className="mt-2 text-center text-xs text-muted-foreground">
			Total: {total} • Interest-free
		</p>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$899.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$71.92' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="shadow-xl">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center justify-between text-base">
							Flexible Payment
							<Badge variant="outline">0% APR</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<InstallmentPlan
							icon={Wallet}
							provider="Klarna"
							installments={4}
							perPayment="$242.73"
							total="$970.92"
						/>
						<Separator />
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$970.92" />
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout/klarna">
								Pay in 4 Installments
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button variant="ghost" className="w-full" asChild>
							<Link href="/checkout">Pay Full Amount</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
