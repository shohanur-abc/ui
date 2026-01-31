import Link from 'next/link';
import { ArrowRight, Lock, Crown, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
	</div>
);

const ExclusiveAccessContent = ({
	badge,
	headline,
	description,
	accessCode,
	cta,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: { text: string; highlight: string };
	description: string;
	accessCode: { placeholder: string };
	cta: { label: string };
}) => (
	<div className="relative text-center max-w-lg mx-auto">
		<div className="inline-flex items-center justify-center size-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white mb-6">
			<Lock className="size-10" />
		</div>
		<Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 gap-1.5">
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
			{headline.text}
			<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
				{' '}
				{headline.highlight}
			</span>
		</h2>
		<p className="text-muted-foreground mb-8">{description}</p>
		<div className="flex gap-2 max-w-sm mx-auto">
			<Input
				type="text"
				placeholder={accessCode.placeholder}
				className="flex-1 font-mono text-center uppercase"
			/>
			<Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shrink-0">
				{cta.label}
				<ArrowRight className="size-4" />
			</Button>
		</div>
		<p className="text-xs text-muted-foreground mt-4">
			Don't have an access code?{' '}
			<Link href="/vip" className="text-purple-500 hover:underline">
				Join VIP
			</Link>
		</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<ExclusiveAccessContent
					badge={{ icon: Crown, text: 'Private Sale' }}
					headline={{ text: 'Unlock', highlight: 'Exclusive Access' }}
					description="Enter your VIP access code to unlock exclusive products and special pricing not available to the public."
					accessCode={{ placeholder: 'Enter access code' }}
					cta={{ label: 'Unlock' }}
				/>
			</div>
		</section>
	);
}
