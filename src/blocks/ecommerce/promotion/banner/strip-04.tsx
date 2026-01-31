import Link from 'next/link';
import { Truck, Gift, Shield, Headphones } from 'lucide-react';

const FeatureItem = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm @md:text-base">
		<Icon className="size-4 @md:size-5 opacity-80" />
		<span>{text}</span>
	</div>
);

const Divider = () => (
	<span className="hidden @md:block w-px h-4 bg-current opacity-30" />
);

export default function Main() {
	return (
		<section className="@container relative" data-theme="neon">
			<div className="bg-muted border-b border-border py-2.5 @md:py-3 px-4 @sm:px-6 @2xl:px-8">
				<div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6 text-foreground">
					<FeatureItem icon={Truck} text="Free Shipping" />
					<Divider />
					<FeatureItem icon={Gift} text="Gift Wrapping" />
					<Divider />
					<FeatureItem icon={Shield} text="Secure Payment" />
					<Divider />
					<FeatureItem icon={Headphones} text="24/7 Support" />
				</div>
			</div>
		</section>
	);
}
