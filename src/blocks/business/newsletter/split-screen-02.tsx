import { Mail, Send, CheckCircle2, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
}

interface TitleProps {
	text: string;
	highlight?: string;
}

interface DescriptionProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface BenefitsProps {
	items: string[];
}

interface SocialProofProps {
	avatars: { src: string; fallback: string }[];
	text: string;
}

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatar: { src: string; fallback: string };
}

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-1/2 -right-1/2 w-full h-full bg-linear-to-bl from-primary/30 via-primary/10 to-transparent rounded-full blur-3xl" />
		<div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-linear-to-tr from-accent/20 via-transparent to-transparent rounded-full blur-3xl" />
	</div>
);

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge
		variant="outline"
		className="gap-1.5 px-3 py-1.5 border-primary/30 bg-primary/5"
	>
		<Icon className="size-3.5 text-primary" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @xl:text-4xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h2>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground text-sm @md:text-base leading-relaxed">
		{text}
	</p>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-12" />
		<Button size="lg" className="gap-2 h-12 px-6 shrink-0">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Benefits = ({ items }: BenefitsProps) => (
	<div className="flex flex-col gap-2">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<CheckCircle2 className="size-4 text-primary shrink-0" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

const SocialProof = ({ avatars, text }: SocialProofProps) => (
	<div className="flex items-center gap-3 pt-4 border-t">
		<div className="flex -space-x-2">
			{avatars.map((avatar, i) => (
				<Avatar key={i} className="size-8 border-2 border-background">
					<AvatarImage src={avatar.src} />
					<AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<span className="text-sm text-muted-foreground">{text}</span>
	</div>
);

const Testimonial = ({ quote, author, role, avatar }: TestimonialProps) => (
	<div className="relative flex flex-col gap-4 p-6 @xl:p-8 rounded-xl bg-card/50 backdrop-blur-sm border">
		<div className="flex gap-1">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="size-4 fill-primary text-primary" />
			))}
		</div>
		<blockquote className="text-sm @md:text-base italic leading-relaxed">
			&ldquo;{quote}&rdquo;
		</blockquote>
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={avatar.src} />
				<AvatarFallback>{avatar.fallback}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<span className="text-sm font-medium">{author}</span>
				<span className="text-xs text-muted-foreground">{role}</span>
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<GlowDecorative />
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="flex flex-col gap-6">
						<Eyebrow icon={Mail} text="Join the Community" />
						<Title
							text="Transform your business with"
							highlight="expert insights"
						/>
						<Description text="Our newsletter delivers cutting-edge strategies, market analysis, and actionable tips that help business leaders stay ahead of the curve." />
						<Form
							placeholder="Enter your work email"
							buttonText="Get Started"
							buttonIcon={Send}
						/>
						<Benefits
							items={[
								'Weekly curated insights from industry experts',
								'Exclusive access to reports and case studies',
								'Early access to webinars and events',
							]}
						/>
						<SocialProof
							avatars={[
								{ src: 'https://i.pravatar.cc/150?img=1', fallback: 'JD' },
								{ src: 'https://i.pravatar.cc/150?img=2', fallback: 'SM' },
								{ src: 'https://i.pravatar.cc/150?img=3', fallback: 'AK' },
								{ src: 'https://i.pravatar.cc/150?img=4', fallback: 'LM' },
							]}
							text="Join 15,000+ business leaders"
						/>
					</div>
					<Testimonial
						quote="This newsletter has completely transformed how we approach strategy. The insights are invaluable and the ROI has been incredible."
						author="Sarah Mitchell"
						role="CEO at TechVentures"
						avatar={{ src: 'https://i.pravatar.cc/150?img=5', fallback: 'SM' }}
					/>
				</div>
			</div>
		</section>
	);
}
