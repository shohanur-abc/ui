import Link from 'next/link';
import { ArrowRight, CheckCircle2, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessToast = ({
	icon: Icon,
	title,
	description,
	cta,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="flex items-start gap-3">
		<div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
			<Icon className="size-5 text-green-500" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-semibold mb-0.5">{title}</p>
			<p className="text-sm text-muted-foreground mb-3">{description}</p>
			<Button variant="outline" size="sm" className="gap-1.5" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-3.5" />
				</Link>
			</Button>
		</div>
		<Button
			variant="ghost"
			size="icon-sm"
			className="shrink-0 text-muted-foreground hover:text-foreground"
		>
			<X className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-sm ml-auto mr-4 space-y-4">
					<div className="bg-card rounded-xl border border-border/50 p-4 shadow-lg">
						<SuccessToast
							icon={CheckCircle2}
							title="Added to Cart!"
							description="Premium Chronograph Watch has been added to your cart."
							cta={{ label: 'View Cart', href: '/cart' }}
						/>
					</div>
					<div className="bg-card rounded-xl border border-border/50 p-4 shadow-lg">
						<SuccessToast
							icon={Package}
							title="Order Shipped!"
							description="Your order #12345 is on its way. Track your package."
							cta={{ label: 'Track Order', href: '/orders/12345' }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
