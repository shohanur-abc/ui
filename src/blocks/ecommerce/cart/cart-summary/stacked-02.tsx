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
import { Input } from '@/components/ui/input';
import { CreditCard, Tag, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	isDiscount?: boolean;
};

type CouponInputProps = {
	placeholder: string;
	buttonLabel: string;
};

type ActionProps = {
	label: string;
	href: string;
	icon?: LucideIcon;
};

const SummaryRow = ({ label, value, isDiscount }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className={isDiscount ? 'text-green-600 dark:text-green-400' : ''}>
			{label}
		</span>
		<span className={isDiscount ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between text-xl font-bold">
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const Header = ({ title, badge }: { title: string; badge?: string }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center gap-3">
			{title}
			{badge && <Badge variant="secondary">{badge}</Badge>}
		</CardTitle>
	</CardHeader>
);

const CouponInput = ({ placeholder, buttonLabel }: CouponInputProps) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-9" />
		</div>
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

const CheckoutAction = ({ label, href, icon: Icon }: ActionProps) => (
	<Button className="w-full gap-2" size="lg" asChild>
		<Link href={href}>
			{Icon && <Icon className="size-5" />}
			{label}
		</Link>
	</Button>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (3 items)', value: '$459.00' },
		{ label: 'Discount', value: '-$45.90', isDiscount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Estimated Tax', value: '$41.31' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header title="Cart Summary" badge="10% OFF" />
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Order Total" value="$454.41" />
						<Separator />
						<CouponInput placeholder="Enter coupon code" buttonLabel="Apply" />
					</CardContent>
					<CardFooter className="border-t">
						<CheckoutAction
							label="Pay with Card"
							href="/checkout"
							icon={CreditCard}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
