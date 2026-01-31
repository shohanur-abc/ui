import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Lock, RefreshCw, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type TrustCardProps = {
	icon: LucideIcon;
	title: string;
	description: string;
};

const TrustCard = ({ icon: Icon, title, description }: TrustCardProps) => (
	<Card className="flex-1 bg-muted/50">
		<CardContent className="flex flex-col items-center py-4 text-center">
			<Icon className="mb-2 size-6 text-green-500" />
			<p className="text-xs font-medium">{title}</p>
			<p className="text-[10px] text-muted-foreground">{description}</p>
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
	const trustCards: TrustCardProps[] = [
		{ icon: ShieldCheck, title: 'Secure', description: 'SSL Protected' },
		{ icon: Lock, title: 'Private', description: 'Data Protected' },
		{ icon: RefreshCw, title: 'Returns', description: '30 Day Policy' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$349.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$27.92' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<div className="mb-4 flex gap-2">
					{trustCards.map((card, i) => (
						<TrustCard key={i} {...card} />
					))}
				</div>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Order Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$376.92</span>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Secure Checkout</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
