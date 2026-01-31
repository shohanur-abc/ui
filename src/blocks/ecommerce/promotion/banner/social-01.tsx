import Link from 'next/link';
import {
	ArrowRight,
	Instagram,
	Twitter,
	Facebook,
	Youtube,
	Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SocialButton = ({
	icon: Icon,
	label,
	href,
	followers,
}: {
	icon: React.ElementType;
	label: string;
	href: string;
	followers: string;
}) => (
	<Link
		href={href}
		className="group flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30 transition-all"
	>
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
			<Icon className="size-6" />
		</div>
		<div className="flex-1">
			<p className="font-semibold">{label}</p>
			<p className="text-sm text-muted-foreground">{followers} followers</p>
		</div>
		<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
	</Link>
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
				<div className="max-w-3xl mx-auto">
					<SectionHeader
						headline="Follow Us"
						subtext="Stay connected for exclusive content and behind-the-scenes updates"
					/>
					<div className="grid @sm:grid-cols-2 gap-4">
						<SocialButton
							icon={Instagram}
							label="Instagram"
							href="https://instagram.com"
							followers="1.2M"
						/>
						<SocialButton
							icon={Twitter}
							label="Twitter"
							href="https://twitter.com"
							followers="845K"
						/>
						<SocialButton
							icon={Facebook}
							label="Facebook"
							href="https://facebook.com"
							followers="2.1M"
						/>
						<SocialButton
							icon={Youtube}
							label="YouTube"
							href="https://youtube.com"
							followers="567K"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
