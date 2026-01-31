import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge
		variant="secondary"
		className="bg-background/20 text-inherit border-0 gap-1.5"
	>
		<Icon className="size-3" />
		{text}
	</Badge>
);

const BannerText = ({ text }: { text: string }) => (
	<span className="text-sm @md:text-base font-medium">{text}</span>
);

const BannerLink = ({ text, href }: { text: string; href: string }) => (
	<Link
		href={href}
		className="text-sm @md:text-base font-bold underline underline-offset-4 hover:no-underline transition-all"
	>
		{text}
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative" data-theme="neon">
			<div className="bg-gradient-to-r from-primary via-accent to-primary py-3 @md:py-4 px-4 @sm:px-6 @2xl:px-8">
				<div className="flex flex-wrap items-center justify-center gap-3 @md:gap-4 text-primary-foreground">
					<Eyebrow icon={Sparkles} text="Limited Time" />
					<BannerText text="Summer Sale: Up to 60% off everything" />
					<BannerLink text="Explore Deals" href="/sale" />
				</div>
			</div>
		</section>
	);
}
