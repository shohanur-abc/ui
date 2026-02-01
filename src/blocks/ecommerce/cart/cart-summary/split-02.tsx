import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tag, Lock, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	highlight?: boolean;
};

type PaymentIconProps = {
	icon: LucideIcon;
	label: string;
};

const SummaryRow = ({ label, value, highlight }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between ${highlight ? 'text-green-600 dark:text-green-400' : 'text-sm'}`}
	>
		<span className={highlight ? 'font-medium' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-4">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-3xl font-bold">{value}</span>
		</div>
	</div>
);

const CouponSection = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="space-y-3">
		<p className="text-sm font-medium">Have a coupon?</p>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={placeholder} className="pl-9" />
			</div>
			<Button variant="secondary">{buttonLabel}</Button>
		</div>
	</div>
);

const PaymentMethods = ({ icons }: { icons: PaymentIconProps[] }) => (
	<div className="space-y-2">
		<p className="text-sm font-medium">We Accept</p>
		<div className="flex gap-2">
			{icons.map(({ icon: Icon, label }, i) => (
				<div
					key={i}
					className="flex size-10 items-center justify-center rounded-lg border bg-muted/50"
					title={label}
				>
					<Icon className="size-5 text-muted-foreground" />
				</div>
			))}
		</div>
	</div>
);

const SecureCheckout = ({
	label,
	href,
	securityText,
}: {
	label: string;
	href: string;
	securityText: string;
}) => (
	<div className="space-y-3">
		<Button className="w-full" size="lg" asChild>
			<Link href={href}>{label}</Link>
		</Button>
		<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
			<Lock className="size-3" />
			{securityText}
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (3 items)', value: '$459.00' },
		{ label: 'Shipping', value: '$12.99' },
		{ label: 'Promo: WINTER20', value: '-$91.80', highlight: true },
		{ label: 'Tax', value: '$30.42' },
	];

	const paymentIcons: PaymentIconProps[] = [
		{ icon: CreditCard, label: 'Credit Card' },
		{ icon: CreditCard, label: 'Debit Card' },
		{ icon: CreditCard, label: 'PayPal' },
		{ icon: CreditCard, label: 'Apple Pay' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<Card>
						<CardHeader>
							<CardTitle>Apply Discount</CardTitle>
							<CardDescription>
								Enter your promo code to get exclusive savings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<CouponSection
								placeholder="Enter promo code"
								buttonLabel="Apply"
							/>
							<PaymentMethods icons={paymentIcons} />
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$410.61" />
							<SecureCheckout
								label="Checkout Securely"
								href="/checkout"
								securityText="256-bit SSL encrypted"
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
