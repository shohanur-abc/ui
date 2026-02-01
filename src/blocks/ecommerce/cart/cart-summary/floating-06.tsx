import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tag, Check, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

type AppliedCouponProps = {
	code: string;
	discount: string;
};

const TopGradient = () => (
	<div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span
			className={
				discount
					? 'flex items-center gap-1 text-green-600 dark:text-green-400'
					: 'text-muted-foreground'
			}
		>
			{discount && <Check className="size-3" />}
			{label}
		</span>
		<span
			className={
				discount
					? 'font-medium text-green-600 dark:text-green-400'
					: 'font-medium'
			}
		>
			{value}
		</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	original,
}: {
	label: string;
	value: string;
	original: string;
}) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<div className="text-right">
			<span className="mr-2 text-sm text-muted-foreground line-through">
				{original}
			</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
	</div>
);

const AppliedCoupon = ({ code, discount }: AppliedCouponProps) => (
	<div className="flex items-center justify-between rounded-lg border border-green-500/30 bg-green-500/10 p-3">
		<div className="flex items-center gap-2">
			<Tag className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm font-medium">{code}</span>
		</div>
		<Badge className="bg-green-500 hover:bg-green-600">{discount}</Badge>
	</div>
);

const CouponInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="flex-1" />
		<Button variant="outline">{buttonLabel}</Button>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$399.00' },
		{ label: 'SAVE20 Applied', value: '-$79.80', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$25.54' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="overflow-hidden shadow-xl">
					<TopGradient />
					<CardHeader className="pb-3">
						<AppliedCoupon code="SAVE20" discount="-20%" />
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<TotalRow label="Total" value="$344.74" original="$424.54" />
						<CouponInput placeholder="Add another code" buttonLabel="Apply" />
					</CardContent>
					<CardFooter>
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Checkout & Save $79.80</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
