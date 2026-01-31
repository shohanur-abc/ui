import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Mail, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[90vh]"
			data-theme="corporate"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					title="Join 50,000+ Developers"
					description="Get weekly insights on web development, system design, and career growth delivered straight to your inbox."
					subscriberCount="50,000+"
				/>
			</div>
		</section>
	);
}

interface BackgroundImageProps {
	src: string;
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
	<>
		<Image src={src} alt="Background" fill className="object-cover" priority />
		<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
	</>
);

interface ContentProps {
	title: string;
	description: string;
	subscriberCount: string;
}

const Content = ({ title, description, subscriberCount }: ContentProps) => (
	<div className="max-w-2xl mx-auto text-center">
		<Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
			<Users className="size-3.5 mr-1.5" />
			{subscriberCount} subscribers
		</Badge>
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold text-white mb-6">
			{title}
		</h1>
		<p className="text-lg @md:text-xl text-white/80 mb-10">{description}</p>
		<form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto">
			<div className="relative flex-1">
				<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
				<Input
					type="email"
					placeholder="your@email.com"
					className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
				/>
			</div>
			<Button type="submit" size="lg" className="h-12 px-8">
				Subscribe
				<ArrowRight className="size-4 ml-2" />
			</Button>
		</form>
		<p className="text-sm text-white/50 mt-4">No spam. Unsubscribe anytime.</p>
	</div>
);
