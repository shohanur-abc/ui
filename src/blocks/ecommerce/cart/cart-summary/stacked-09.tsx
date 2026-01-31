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
import {
	Timer,
	Gift,
	Truck,
	AlertCircle,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	strike?: boolean;
};

type PromoBannerProps = {
	icon: LucideIcon;
	title: string;
	subtitle: string;
	variant: 'warning' | 'success' | 'info';
};

const SummaryRow = ({ label, value, strike }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className={strike ? 'text-muted-foreground line-through' : 'font-medium'}>
			{value}
		</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	originalValue,
}: { label: string; value: string; originalValue?: string }) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<div className="flex items-baseline gap-2">
				{originalValue && (
					<span className="text-sm text-muted-foreground line-through">
						{originalValue}
					</span>
				)}
				<span className="text-2xl font-bold">{value}</span>
			</div>
		</div>
	</div>
);

const Header = ({
	title,
	countdown,
}: { title: string; countdown?: { label: string; time: string } }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center justify-between">
			{title}
			{countdown && (
				<Badge variant="destructive" className="gap-1">
					<Timer className="size-3" />
					{countdown.label}: {countdown.time}
				</Badge>
			)}
		</CardTitle>
	</CardHeader>
);

const PromoBanner = ({
	icon: Icon,
	title,
	subtitle,
	variant,
}: PromoBannerProps) => {
	const variants = {
		warning: 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400',
		success: 'border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400',
		info: 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400',
	};

	return (
		<div className={`flex items-center gap-3 rounded-lg border p-3 ${variants[variant]}`}>
			<Icon className="size-5 shrink-0" />
			<div>
				<p className="text-sm font-medium">{title}</p>
				<p className="text-xs opacity-80">{subtitle}</p>
			</div>
		</div>
	);
};

const PromoCode = ({
	placeholder,
	buttonLabel,
	appliedCode,
}: { placeholder: string; buttonLabel: string; appliedCode?: { code: string; savings: string } }) => (
	<div className="space-y-2">
		{appliedCode ? (
			<div className="flex items-center justify-between rounded-lg border border-green-500/50 bg-green-500/10 p-3">
				<div className="flex items-center gap-2">
					<Gift className="size-4 text-green-600 dark:text-green-400" />
					<span className="text-sm font-medium text-green-600 dark:text-green-400">
						{appliedCode.code}
					</span>
				</div>
				<span className="text-sm font-bold text-green-600 dark:text-green-400">
					{appliedCode.savings}
				</span>
			</div>
		) : (
			<div className="flex gap-2">
				<Input placeholder={placeholder} />
				<Button variant="outline">{buttonLabel}</Button>
			</div>
		)}
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'Shipping', value: '$12.99', strike: true },
		{ label: 'Tax', value: '$43.19' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Cart Summary"
						countdown={{ label: 'Sale ends', time: '02:45:30' }}
					/>
					<CardContent className="space-y-4">
						<PromoBanner
							icon={AlertCircle}
							title="Limited Time Offer!"
							subtitle="Free shipping on orders over $500"
							variant="warning"
						/>
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<PromoCode
							placeholder="Promo code"
							buttonLabel="Apply"
							appliedCode={{ code: 'SAVE20', savings: '-$119.80' }}
						/>
						<Separator />
						<TotalRow
							label="Total"
							value="$522.39"
							originalValue="$655.18"
						/>
						<PromoBanner
							icon={Truck}
							title="Free Shipping Applied"
							subtitle="Your order qualifies for free standard shipping"
							variant="success"
						/>
					</CardContent>
					<CardFooter className="border-t">
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Checkout Now</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
