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
import { Percent, Tag, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const DiscountCard = ({
	icon: Icon,
	code,
	percentage,
	savings,
}: {
	icon: LucideIcon;
	code: string;
	percentage: string;
	savings: string;
}) => (
	<Card className="mb-4 border-green-500/30 bg-green-500/5">
		<CardContent className="flex items-center justify-between py-4">
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-lg bg-green-500/20">
					<Icon className="size-5 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<p className="font-mono font-semibold">{code}</p>
					<p className="text-xs text-muted-foreground">Coupon applied</p>
				</div>
			</div>
			<Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:text-green-400">
				{percentage}
			</Badge>
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${
			discount ? 'text-green-600 dark:text-green-400' : ''
		}`}
	>
		<span className={discount ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$449.00' },
		{ label: 'Discount (20%)', value: '-$89.80', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$28.74' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<DiscountCard
					icon={Tag}
					code="SUMMER20"
					percentage="-20%"
					savings="$89.80"
				/>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Price Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<div className="text-right">
								<span className="mr-2 text-sm text-muted-foreground line-through">
									$477.74
								</span>
								<span className="text-2xl font-bold">$387.94</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								<CreditCard className="size-4" />
								Pay $387.94
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
