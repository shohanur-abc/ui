import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CloseButton = () => (
	<Button
		variant="ghost"
		size="icon-sm"
		className="absolute top-2 right-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
	>
		<X className="size-4" />
	</Button>
);

const DiscountBadge = ({ value }: { value: string }) => (
	<span className="text-5xl @md:text-6xl @lg:text-7xl font-black">{value}</span>
);

const ModalContent = ({
	badge,
	discount,
	headline,
	description,
	code,
	cta,
}: {
	badge: string;
	discount: string;
	headline: string;
	description: string;
	code: string;
	cta: { label: string; href: string };
}) => (
	<div className="relative text-center space-y-4 @md:space-y-6">
		<Badge
			variant="secondary"
			className="bg-primary-foreground/20 text-inherit border-0"
		>
			{badge}
		</Badge>
		<DiscountBadge value={discount} />
		<h2 className="text-2xl @md:text-3xl font-bold">{headline}</h2>
		<p className="text-primary-foreground/80 max-w-xs mx-auto">{description}</p>
		<div className="bg-primary-foreground/10 rounded-lg px-4 py-2 inline-block">
			<span className="text-sm text-primary-foreground/60">Use code: </span>
			<span className="font-mono font-bold">{code}</span>
		</div>
		<div className="pt-2">
			<Button
				size="lg"
				variant="secondary"
				className="gap-2 w-full @sm:w-auto"
				asChild
			>
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
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 pointer-events-none opacity-0">
				<div className="relative bg-primary text-primary-foreground rounded-3xl p-8 @md:p-12 max-w-md w-full">
					<CloseButton />
					<ModalContent
						badge="🎉 Special Offer"
						discount="30%"
						headline="OFF Your First Order"
						description="Join our newsletter and unlock exclusive savings on your first purchase."
						code="FIRST30"
						cta={{ label: 'Claim Discount', href: '/shop' }}
					/>
				</div>
			</div>
			<div className="bg-card py-16 @md:py-20 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-md mx-auto">
					<div className="relative bg-primary text-primary-foreground rounded-3xl p-8 @md:p-12">
						<CloseButton />
						<ModalContent
							badge="🎉 Special Offer"
							discount="30%"
							headline="OFF Your First Order"
							description="Join our newsletter and unlock exclusive savings on your first purchase."
							code="FIRST30"
							cta={{ label: 'Claim Discount', href: '/shop' }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
