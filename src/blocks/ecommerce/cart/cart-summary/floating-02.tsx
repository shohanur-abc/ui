import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sparkles, CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	discount?: boolean;
};

const GlowDecorative = () => (
	<div className="absolute -top-20 left-1/2 size-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
);

const SummaryRow = ({ label, value, discount }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${discount ? 'text-green-500' : ''}`}
	>
		<span className={discount ? '' : 'text-muted-foreground'}>{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalDisplay = ({
	value,
	badge,
}: {
	value: string;
	badge: { label: string; icon: LucideIcon };
}) => (
	<div className="rounded-xl bg-gradient-to-br from-primary/20 to-transparent p-4">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-xs text-muted-foreground">Total Amount</p>
				<span className="text-3xl font-bold">{value}</span>
			</div>
			<Badge className="gap-1 bg-primary/20 text-primary hover:bg-primary/30">
				<badge.icon className="size-3" />
				{badge.label}
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$599.00' },
		{ label: 'VIP Discount', value: '-$59.90', discount: true },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$43.13' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="relative overflow-hidden border-primary/20 shadow-2xl shadow-primary/20">
					<GlowDecorative />
					<CardContent className="relative space-y-4 pt-6">
						<TotalDisplay
							value="$582.23"
							badge={{ label: 'VIP', icon: Sparkles }}
						/>
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
					</CardContent>
					<CardFooter className="relative">
						<Button
							className="w-full gap-2 shadow-lg shadow-primary/30"
							size="lg"
							asChild
						>
							<Link href="/checkout">
								<CreditCard className="size-4" />
								Pay Now
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
