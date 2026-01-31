import Link from 'next/link';
import { Scissors, Copy, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const CouponCard = ({
	discount,
	description,
	code,
	validUntil,
	minOrder,
}: {
	discount: string;
	description: string;
	code: string;
	validUntil: string;
	minOrder: string;
}) => (
	<Card className="relative overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all group">
		<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-6 rounded-full bg-background" />
		<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-6 rounded-full bg-background" />
		<div className="p-5 @md:p-6 border-b border-dashed border-border">
			<div className="flex items-start justify-between gap-4 mb-3">
				<div>
					<span className="text-3xl @md:text-4xl font-black text-primary">
						{discount}
					</span>
					<p className="text-sm text-muted-foreground mt-1">{description}</p>
				</div>
				<Scissors className="size-5 text-muted-foreground" />
			</div>
		</div>
		<div className="p-5 @md:p-6">
			<div className="flex items-center justify-between gap-4 mb-3">
				<div className="bg-muted/50 px-3 py-1.5 rounded font-mono font-bold text-sm">
					{code}
				</div>
				<Button variant="ghost" size="sm" className="gap-1.5 text-xs">
					<Copy className="size-3.5" />
					Copy
				</Button>
			</div>
			<div className="flex items-center gap-4 text-xs text-muted-foreground">
				<div className="flex items-center gap-1">
					<Clock className="size-3.5" />
					{validUntil}
				</div>
				<span>•</span>
				<span>{minOrder}</span>
			</div>
		</div>
	</Card>
);

const SectionHeader = ({
	headline,
	subtext,
}: {
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-8 @md:mb-10">
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
			{headline}
		</h2>
		<p className="text-muted-foreground">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<SectionHeader
						headline="Exclusive Coupons"
						subtext="Grab these limited-time offers before they expire"
					/>
					<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
						<CouponCard
							discount="20% OFF"
							description="All Electronics"
							code="TECH20"
							validUntil="Expires Dec 31"
							minOrder="Min. $50"
						/>
						<CouponCard
							discount="$15 OFF"
							description="Fashion Items"
							code="STYLE15"
							validUntil="Expires Jan 15"
							minOrder="Min. $75"
						/>
						<CouponCard
							discount="FREE SHIP"
							description="Any Order"
							code="FREESHIP"
							validUntil="Expires Jan 31"
							minOrder="No minimum"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
