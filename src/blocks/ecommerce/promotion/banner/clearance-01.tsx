import Link from 'next/link';
import { ArrowRight, Percent, Tag, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ClearanceItem = ({
	title,
	originalPrice,
	salePrice,
	discount,
}: {
	title: string;
	originalPrice: string;
	salePrice: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-red-500/30 transition-all">
		<div>
			<h3 className="font-semibold mb-1">{title}</h3>
			<div className="flex items-center gap-2">
				<span className="text-muted-foreground line-through text-sm">
					{originalPrice}
				</span>
				<span className="font-bold text-red-500">{salePrice}</span>
			</div>
		</div>
		<Badge className="bg-red-500 text-white border-0">{discount}</Badge>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	subtext: string;
}) => (
	<div className="text-center mb-10">
		<Badge className="bg-red-500 text-white border-0 gap-1.5 mb-4">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-red-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8 border-y border-red-500/20">
				<div className="max-w-2xl mx-auto">
					<SectionHeader
						badge={{ icon: Tag, text: 'Clearance' }}
						headline={{ text: 'Final', highlight: 'Markdowns' }}
						subtext="Last chance to grab these deals before they're gone forever"
					/>
					<div className="space-y-3 mb-8">
						<ClearanceItem
							title="Bluetooth Speaker"
							originalPrice="$129"
							salePrice="$49"
							discount="-62%"
						/>
						<ClearanceItem
							title="Laptop Stand"
							originalPrice="$89"
							salePrice="$29"
							discount="-67%"
						/>
						<ClearanceItem
							title="USB-C Hub"
							originalPrice="$79"
							salePrice="$35"
							discount="-56%"
						/>
						<ClearanceItem
							title="Webcam HD"
							originalPrice="$99"
							salePrice="$39"
							discount="-61%"
						/>
					</div>
					<div className="text-center">
						<Button
							size="lg"
							className="gap-2 bg-red-500 hover:bg-red-600"
							asChild
						>
							<Link href="/clearance">
								<ShoppingBag className="size-4" />
								Shop All Clearance
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
