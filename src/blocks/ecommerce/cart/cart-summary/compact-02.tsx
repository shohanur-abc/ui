import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Package, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type InfoBadgeProps = {
	icon: LucideIcon;
	text: string;
};

const InfoBadge = ({ icon: Icon, text }: InfoBadgeProps) => (
	<Badge variant="secondary" className="gap-1 font-normal">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const PriceDisplay = ({
	total,
	itemCount,
}: { total: string; itemCount: number }) => (
	<div>
		<span className="text-2xl font-bold">{total}</span>
		<span className="ml-2 text-sm text-muted-foreground">({itemCount} items)</span>
	</div>
);

export default function Main() {
	const badges: InfoBadgeProps[] = [
		{ icon: Package, text: 'Free Shipping' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex items-center justify-between gap-4 rounded-full border bg-card px-6 py-3 shadow-sm">
					<div className="flex items-center gap-3">
						<PriceDisplay total="$349.99" itemCount={4} />
						{badges.map((badge, i) => (
							<InfoBadge key={i} {...badge} />
						))}
					</div>
					<Button className="gap-2 rounded-full" asChild>
						<Link href="/checkout">
							<CreditCard className="size-4" />
							Pay Now
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
