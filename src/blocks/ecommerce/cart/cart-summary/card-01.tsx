import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

const HeaderCard = ({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: LucideIcon;
	title: string;
	subtitle: string;
}) => (
	<Card className="mb-4 bg-primary/5">
		<CardContent className="flex items-center gap-3 py-4">
			<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
				<Icon className="size-6 text-primary" />
			</div>
			<div>
				<p className="font-semibold">{title}</p>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</CardContent>
	</Card>
);

const SummaryCard = ({
	items,
	total,
}: {
	items: SummaryRowProps[];
	total: { label: string; value: string };
}) => (
	<Card>
		<CardContent className="space-y-3 pt-6">
			{items.map((item, i) => (
				<div key={i} className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span className="font-medium">{item.value}</span>
				</div>
			))}
			<Separator />
			<div className="flex items-center justify-between">
				<span className="text-lg font-semibold">{total.label}</span>
				<span className="text-2xl font-bold">{total.value}</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$299.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Tax', value: '$24.96' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<HeaderCard
					icon={ShoppingCart}
					title="Order Summary"
					subtitle="3 items in cart"
				/>
				<SummaryCard
					items={summaryItems}
					total={{ label: 'Total', value: '$336.95' }}
				/>
				<Button className="mt-4 w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						Checkout
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</div>
		</section>
	);
}
