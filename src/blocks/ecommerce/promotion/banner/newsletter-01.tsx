import Link from 'next/link';
import { ArrowRight, Mail, Bell, Sparkles, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
	</div>
);

const NewsletterPerks = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap justify-center gap-4 mb-8">
		{items.map((item, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<Check className="size-4 text-primary" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const NewsletterContent = ({
	badge,
	headline,
	description,
	perks,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	perks: string[];
	cta: { label: string };
}) => (
	<div className="relative text-center max-w-xl mx-auto">
		<Badge
			variant="outline"
			className="border-primary/50 text-primary gap-1.5 mb-6"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground mb-6">{description}</p>
		<NewsletterPerks items={perks} />
		<div className="flex gap-2 max-w-md mx-auto">
			<Input type="email" placeholder="Enter your email" className="flex-1" />
			<Button className="gap-2 shrink-0">
				<Mail className="size-4" />
				{cta.label}
			</Button>
		</div>
		<p className="text-xs text-muted-foreground mt-4">
			By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
		</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<NewsletterContent
					badge={{ icon: Mail, text: 'Newsletter' }}
					headline={{ text: 'Stay in the', highlight: 'Loop' }}
					description="Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and special events."
					perks={['Exclusive discounts', 'Early access', 'Style tips']}
					cta={{ label: 'Subscribe' }}
				/>
			</div>
		</section>
	);
}
