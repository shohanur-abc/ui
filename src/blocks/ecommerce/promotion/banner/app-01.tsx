import Link from 'next/link';
import { ArrowRight, Smartphone, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AppStoreButton = ({
	store,
	href,
}: {
	store: 'apple' | 'google';
	href: string;
}) => (
	<Link
		href={href}
		className="flex items-center gap-3 bg-foreground text-background rounded-xl px-4 py-3 hover:bg-foreground/90 transition-colors"
	>
		{store === 'apple' ? (
			<>
				<svg viewBox="0 0 24 24" className="size-7 fill-current">
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
				</svg>
				<div className="text-left">
					<p className="text-[10px] opacity-80">Download on the</p>
					<p className="text-sm font-semibold -mt-0.5">App Store</p>
				</div>
			</>
		) : (
			<>
				<svg viewBox="0 0 24 24" className="size-6 fill-current">
					<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
				</svg>
				<div className="text-left">
					<p className="text-[10px] opacity-80">GET IT ON</p>
					<p className="text-sm font-semibold -mt-0.5">Google Play</p>
				</div>
			</>
		)}
	</Link>
);

const AppPromo = ({
	badge,
	headline,
	description,
	stats,
}: {
	badge: string;
	headline: { text: string; highlight: string };
	description: string;
	stats: { value: string; label: string }[];
}) => (
	<div className="space-y-6">
		<Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
			<Smartphone className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground">{description}</p>
		<div className="flex gap-6">
			{stats.map(({ value, label }, i) => (
				<div key={i}>
					<span className="text-2xl font-bold text-primary">{value}</span>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
			))}
		</div>
		<div className="flex flex-wrap gap-3">
			<AppStoreButton store="apple" href="/app/ios" />
			<AppStoreButton store="google" href="/app/android" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
						<AppPromo
							badge="Mobile App"
							headline={{ text: 'Shop Anywhere,', highlight: 'Anytime' }}
							description="Download our app for exclusive mobile deals, faster checkout, and personalized recommendations."
							stats={[
								{ value: '4.8★', label: 'App Rating' },
								{ value: '1M+', label: 'Downloads' },
							]}
						/>
						<div className="relative aspect-[3/4] max-w-[280px] mx-auto">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] blur-2xl" />
							<div className="relative bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
								<div className="bg-background rounded-[2rem] aspect-[9/19] flex items-center justify-center">
									<Smartphone className="size-16 text-muted-foreground/30" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
