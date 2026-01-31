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
import { Wallet, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type InstallmentCardProps = {
	icon: LucideIcon;
	provider: string;
	installments: number;
	perPayment: string;
	total: string;
};

const InstallmentCard = ({
	icon: Icon,
	provider,
	installments,
	perPayment,
	total,
}: InstallmentCardProps) => (
	<Card className="mb-4 border-primary/30 bg-primary/5">
		<CardContent className="py-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-5 text-primary" />
					<span className="font-medium">{provider}</span>
				</div>
				<Badge variant="outline">0% Interest</Badge>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{Array.from({ length: installments }).map((_, i) => (
					<div key={i} className="rounded-lg bg-background p-2 text-center">
						<p className="text-[10px] text-muted-foreground">Pay {i + 1}</p>
						<p className="text-sm font-semibold">{perPayment}</p>
					</div>
				))}
			</div>
			<p className="mt-2 text-center text-xs text-muted-foreground">
				Total: {total}
			</p>
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$799.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$63.92' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<InstallmentCard
					icon={Wallet}
					provider="Pay in 4"
					installments={4}
					perPayment="$215.73"
					total="$862.92"
				/>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$862.92</span>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout/installments">
								Pay in 4 Installments
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button variant="outline" className="w-full" asChild>
							<Link href="/checkout">Pay Full Amount</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
