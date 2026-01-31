import Link from 'next/link';
import {
	ArrowRight,
	QrCode,
	Smartphone,
	Gift,
	Zap,
	Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeatureItem = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-primary shrink-0" />
		<span>{text}</span>
	</div>
);

const QRCodeBlock = ({ label }: { label: string }) => (
	<div className="flex flex-col items-center gap-3">
		<div className="bg-background p-4 rounded-xl">
			<div className="size-32 bg-foreground rounded-lg flex items-center justify-center">
				<QrCode className="size-24 text-background" />
			</div>
		</div>
		<p className="text-sm text-muted-foreground">{label}</p>
	</div>
);

const AppDownloadContent = ({
	headline,
	features,
}: {
	headline: { text: string; highlight: string };
	features: { icon: React.ElementType; text: string }[];
}) => (
	<div className="space-y-6">
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
			{headline.text}
			<span className="text-primary block">{headline.highlight}</span>
		</h2>
		<div className="space-y-3">
			{features.map((feature, i) => (
				<FeatureItem key={i} {...feature} />
			))}
		</div>
		<Button className="gap-2" asChild>
			<Link href="/app">
				Learn More
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-primary py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center text-primary-foreground">
						<AppDownloadContent
							headline={{ text: 'Scan to Download', highlight: 'Our App' }}
							features={[
								{ icon: Gift, text: 'Exclusive app-only discounts' },
								{ icon: Zap, text: 'Lightning-fast checkout' },
								{ icon: Shield, text: 'Secure payment protection' },
								{ icon: Smartphone, text: 'Track orders in real-time' },
							]}
						/>
						<div className="flex justify-center">
							<QRCodeBlock label="Scan with your phone camera" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
