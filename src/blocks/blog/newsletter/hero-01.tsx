import { Mail, Send, Sparkles, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
}

interface TitleProps {
	preText: string;
	highlight: string;
	postText: string;
}

interface DescriptionProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface TrustBadgesProps {
	items: { icon: React.ElementType; text: string }[];
}

const AnimatedGradientDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden">
		<div className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl animate-pulse" />
		<div className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full bg-gradient-to-tl from-primary/20 via-transparent to-transparent blur-3xl animate-pulse delay-1000" />
	</div>
);

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="outline" className="gap-1.5 border-primary/30">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const Title = ({ preText, highlight, postText }: TitleProps) => (
	<h2 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">
		{preText} <span className="text-primary">{highlight}</span> {postText}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-lg @md:text-xl max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-4 max-w-lg mx-auto w-full">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-14 text-base px-5"
		/>
		<Button size="lg" className="gap-2 h-14 px-8 text-base">
			{buttonText}
			{Icon && <Icon className="size-5" />}
		</Button>
	</form>
);

const TrustBadges = ({ items }: TrustBadgesProps) => (
	<div className="flex flex-wrap justify-center gap-6">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div
					key={i}
					className="flex items-center gap-2 text-sm text-muted-foreground"
				>
					<Icon className="size-4 text-primary" />
					<span>{item.text}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<AnimatedGradientDecorative />
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
				<div className="flex flex-col items-center text-center gap-8">
					<Eyebrow icon={Sparkles} text="Newsletter" />
					<Title
						preText="Stay ahead with"
						highlight="weekly"
						postText="insights"
					/>
					<Description text="Join thousands of professionals who receive our curated newsletter featuring the latest trends, tutorials, and exclusive content." />
					<Form
						placeholder="Enter your email address"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
					<TrustBadges
						items={[
							{ icon: Zap, text: '30K+ subscribers' },
							{ icon: Heart, text: 'Free forever' },
							{ icon: Mail, text: 'Weekly delivery' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
