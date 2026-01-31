import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
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
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

const FloatingHeader = ({
	icon: Icon,
	title,
	itemCount,
}: { icon: LucideIcon; title: string; itemCount: number }) => (
	<CardHeader className="pb-4">
		<CardTitle className="flex items-center gap-2">
			<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
				<Icon className="size-5 text-primary" />
			</div>
			<div>
				<span className="text-base">{title}</span>
				<p className="text-xs font-normal text-muted-foreground">
					{itemCount} items in cart
				</p>
			</div>
		</CardTitle>
	</CardHeader>
);

const CheckoutButton = ({
	label,
	href,
	icon: Icon,
}: { label: string; href: string; icon: LucideIcon }) => (
	<Button className="w-full gap-2 shadow-lg" size="lg" asChild>
		<Link href={href}>
			{label}
			<Icon className="size-4" />
		</Link>
	</Button>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$349.00' },
		{ label: 'Shipping', value: '$14.99' },
		{ label: 'Tax', value: '$29.12' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="shadow-2xl shadow-primary/10">
					<FloatingHeader
						icon={ShoppingBag}
						title="Order Summary"
						itemCount={3}
					/>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<TotalRow label="Total" value="$393.11" />
					</CardContent>
					<CardFooter>
						<CheckoutButton
							label="Checkout"
							href="/checkout"
							icon={ArrowRight}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
