import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Plus, Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GiftWithPurchaseCard = ({
	productImage,
	productTitle,
	giftImage,
	giftTitle,
	giftValue,
	minPurchase,
}: {
	productImage: string;
	productTitle: string;
	giftImage: string;
	giftTitle: string;
	giftValue: string;
	minPurchase: string;
}) => (
	<div className="bg-card rounded-2xl p-6 border border-border/50">
		<div className="flex items-center justify-center gap-4 mb-6">
			<div className="size-24 rounded-xl overflow-hidden relative">
				<Image
					src={productImage}
					alt={productTitle}
					fill
					className="object-cover"
				/>
			</div>
			<Plus className="size-8 text-muted-foreground" />
			<div className="size-24 rounded-xl overflow-hidden relative ring-2 ring-primary">
				<Image src={giftImage} alt={giftTitle} fill className="object-cover" />
				<div className="absolute inset-0 flex items-center justify-center bg-primary/80">
					<span className="text-xs font-bold text-primary-foreground">
						FREE
					</span>
				</div>
			</div>
		</div>
		<div className="text-center">
			<h3 className="font-bold text-lg mb-1">Free {giftTitle}</h3>
			<p className="text-sm text-muted-foreground mb-2">Worth {giftValue}</p>
			<Badge variant="secondary" className="text-xs">
				With orders over {minPurchase}
			</Badge>
		</div>
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
		<Badge className="bg-pink-500/10 text-pink-500 border-pink-500/30 gap-1.5 mb-4">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline.text}
			<span className="text-pink-500"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={{ icon: Gift, text: 'Free Gift' }}
						headline={{ text: 'Gift With', highlight: 'Purchase' }}
						subtext="Get a complimentary gift when you spend over the qualifying amount"
					/>
					<div className="grid @md:grid-cols-2 gap-6 mb-8">
						<GiftWithPurchaseCard
							productImage="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
							productTitle="Any Watch"
							giftImage="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
							giftTitle="Premium Case"
							giftValue="$49"
							minPurchase="$150"
						/>
						<GiftWithPurchaseCard
							productImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
							productTitle="Any Audio"
							giftImage="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
							giftTitle="Travel Pouch"
							giftValue="$35"
							minPurchase="$100"
						/>
					</div>
					<div className="text-center">
						<Button
							size="lg"
							className="gap-2 bg-pink-500 hover:bg-pink-600"
							asChild
						>
							<Link href="/shop">
								<ShoppingBag className="size-4" />
								Shop Now
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
