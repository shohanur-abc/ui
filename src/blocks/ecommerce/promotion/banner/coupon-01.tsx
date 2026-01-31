import Link from 'next/link';
import { ArrowRight, Tag, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CouponCode = ({
	code,
	description,
}: {
	code: string;
	description: string;
}) => (
	<div className="flex items-center gap-3 bg-card rounded-lg p-3 border border-dashed border-primary/50">
		<div className="flex-1">
			<p className="font-mono font-bold text-lg text-primary">{code}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Button
			variant="ghost"
			size="icon-sm"
			className="text-muted-foreground hover:text-primary"
		>
			<Copy className="size-4" />
		</Button>
	</div>
);

const PromoStrip = ({
	icon: Icon,
	headline,
	code,
	codeDescription,
	cta,
}: {
	icon: React.ElementType;
	headline: string;
	code: string;
	codeDescription: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex flex-col @md:flex-row items-start @md:items-center justify-between gap-4 @md:gap-8">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
				<Icon className="size-5 text-primary" />
			</div>
			<p className="font-semibold text-base @md:text-lg">{headline}</p>
		</div>
		<div className="flex items-center gap-4 w-full @md:w-auto">
			<CouponCode code={code} description={codeDescription} />
			<Button className="gap-2 shrink-0" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background border-y border-border py-6 @md:py-8 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-6xl mx-auto">
					<PromoStrip
						icon={Tag}
						headline="Get 25% off your first order"
						code="WELCOME25"
						codeDescription="Valid for new customers"
						cta={{ label: 'Shop Now', href: '/shop' }}
					/>
				</div>
			</div>
		</section>
	);
}
