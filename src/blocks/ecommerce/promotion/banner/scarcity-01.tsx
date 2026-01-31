import Link from 'next/link';
import { ArrowRight, AlertTriangle, Timer, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PulseDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
	</div>
);

const CountdownUnit = ({ value, label }: { value: string; label: string }) => (
	<div className="bg-background/50 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px] text-center">
		<span className="text-2xl @md:text-3xl font-black">{value}</span>
		<p className="text-xs text-muted-foreground uppercase">{label}</p>
	</div>
);

const ScarcityContent = ({
	badge,
	headline,
	countdown,
	discount,
	viewers,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	countdown: { hours: string; minutes: string; seconds: string };
	discount: string;
	viewers: number;
	cta: { label: string; href: string };
}) => (
	<div className="relative text-center max-w-2xl mx-auto">
		<Badge className="bg-orange-500 text-white border-0 gap-1.5 mb-6">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold mb-4">
			{headline.text}
			<span className="text-orange-500"> {headline.highlight}</span>
		</h2>
		<div className="flex justify-center gap-3 mb-6">
			<CountdownUnit value={countdown.hours} label="Hours" />
			<CountdownUnit value={countdown.minutes} label="Mins" />
			<CountdownUnit value={countdown.seconds} label="Secs" />
		</div>
		<div className="bg-orange-500/10 rounded-2xl p-6 mb-6">
			<span className="text-4xl @md:text-5xl font-black text-orange-500">
				{discount}
			</span>
			<p className="text-muted-foreground mt-2">
				Exclusive early access discount
			</p>
		</div>
		<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
			<Users className="size-4" />
			<span>
				<strong className="text-foreground">{viewers}</strong> people viewing
				this offer
			</span>
		</div>
		<Button
			size="lg"
			className="gap-2 bg-orange-500 hover:bg-orange-600"
			asChild
		>
			<Link href={cta.href}>
				<Flame className="size-4" />
				{cta.label}
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<PulseDecorative />
				<ScarcityContent
					badge={{ icon: AlertTriangle, text: 'Ending Soon' }}
					headline={{ text: "Don't Miss", highlight: 'This Deal!' }}
					countdown={{ hours: '02', minutes: '45', seconds: '30' }}
					discount="40% OFF"
					viewers={234}
					cta={{ label: 'Claim Offer Now', href: '/deal' }}
				/>
			</div>
		</section>
	);
}
