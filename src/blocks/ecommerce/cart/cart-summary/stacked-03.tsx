import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Truck, Lock, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ProgressBarProps = {
	current: number;
	target: number;
	message: string;
};

type TrustBadgeProps = {
	icon: LucideIcon;
	text: string;
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

const Header = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

const FreeShippingProgress = ({
	current,
	target,
	message,
}: ProgressBarProps) => {
	const progress = Math.min((current / target) * 100, 100);
	return (
		<div className="space-y-2 rounded-lg bg-muted/50 p-4">
			<div className="flex items-center justify-between text-sm">
				<span className="flex items-center gap-2">
					<Truck className="size-4 text-primary" />
					{message}
				</span>
				<span className="font-medium">
					${(target - current).toFixed(2)} away
				</span>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	);
};

const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const SecureCheckout = ({
	label,
	href,
	badges,
}: {
	label: string;
	href: string;
	badges: TrustBadgeProps[];
}) => (
	<div className="space-y-3">
		<Button className="w-full" size="lg" asChild>
			<Link href={href}>{label}</Link>
		</Button>
		<div className="flex justify-center gap-4">
			{badges.map((badge, i) => (
				<TrustBadge key={i} {...badge} />
			))}
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$189.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$18.90' },
	];

	const trustBadges: TrustBadgeProps[] = [
		{ icon: Lock, text: 'Secure Checkout' },
		{ icon: Truck, text: 'Fast Delivery' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Your Order"
						description="Review your items before checkout"
					/>
					<CardContent className="space-y-4">
						<FreeShippingProgress
							current={189}
							target={250}
							message="Free shipping on orders over $250"
						/>
						<Separator />
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$217.89" />
					</CardContent>
					<CardFooter className="border-t">
						<SecureCheckout
							label="Checkout Now"
							href="/checkout"
							badges={trustBadges}
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
