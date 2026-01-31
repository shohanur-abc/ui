'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { ComponentType, FC } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<ul className="grid @3xl:grid-cols-2 min-h-screen overflow-hidden items-center gap-8 @md:gap-12 @2xl:gap-16 @4xl:gap-20 py-16 @md:py-20 @3xl:py-24 @5xl:py-32 px-4 @sm:px-6 @2xl:px-8">
				{/* Left Side - Visual */}
				<li className="relative @sm:overflow-visible max-w-lg mx-auto w-full">
					<HeroImage
						src="https://avatars.githubusercontent.com/u/252440198?v=4"
						alt="Emma Johnson Profile Picture"
						fallback="EJ"
						className="overflow-hidden"
					/>
					<BackgroundDecorative />
				</li>

				{/* Right Side - Content */}
				<li className="max-w-xl -order-1 @3xl:order-1">
					<div className="space-y-5 @md:space-y-6 @xl:space-y-8">
						<Eyebrow icon={Github} text="Creative Developer" />
						<Eyebrow icon={Mail} text="Based in NYC" />
						<Title text="Emma Johnson" />
						<Subtitle text="Building digital products that make a difference" />
						<Description text="With a passion for innovation and an eye for detail, I create seamless digital experiences that connect with users and drive results." />

						<CTA
							items={[
								{
									label: 'Explore Portfolio',
									icon: ArrowRight,
									href: '#portfolio',
									variant: 'default',
								},
								{
									label: "Let's Talk",
									icon: Mail,
									href: '#contact',
									variant: 'outline',
								},
							]}
						/>

						<SocialLinks
							items={[
								{
									label: 'Twitter',
									icon: Twitter,
									href: 'https://twitter.com/emmajohnson',
								},
								{
									label: 'LinkedIn',
									icon: Linkedin,
									href: 'https://linkedin.com/in/emmajohnson',
								},
								{
									label: 'GitHub',
									icon: Github,
									href: 'https://github.com/emmajohnson',
								},
							]}
						/>
					</div>
				</li>
			</ul>
		</section>
	);
}

interface HeroImageProps {
	src?: string;
	alt?: string;
	fallback?: string;
	className?: string;
}

const HeroImage: FC<HeroImageProps> = ({
	src = 'https://avatars.githubusercontent.com/u/252440198?v=4',
	alt = 'Profile Image',
	fallback = 'EJ',
	className,
}) => (
	<div
		className={`relative aspect-square rounded-3xl  bg-linear-to-br from-secondary via-secondary/85 to-secondary/70 p-6 @md:p-8 shadow-2xl  transition-transform duration-500 hover:scale-[1.02] ${className}`}
	>
		<div className="relative w-full h-full rounded-2xl bg-background/10 backdrop-blur-sm border border-white/20 overflow-hidden">
			{/* Subtle pattern overlay */}
			<div className="absolute inset-0 bg-grid-white/[0.05]" />

			{/* CENTERED AVATAR */}
			<div className="absolute inset-0 flex items-center justify-center z-10">
				<Avatar className="w-48 h-48 @md:w-56 @md:h-56 @3xl:w-64 @3xl:h-64 rounded-full shadow-lg">
					<AvatarImage
						src={src}
						alt={alt}
						className="w-full h-full object-cover rounded-full"
					/>
					<AvatarFallback className="w-full h-full rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-5xl font-bold flex items-center justify-center">
						{fallback}
					</AvatarFallback>
				</Avatar>
			</div>

			{/* Optional pulsing skeleton bars */}
			{!src && (
				<div className="absolute bottom-6 w-full flex flex-col items-center space-y-2 pointer-events-none z-10">
					<div className="h-2 bg-white/30 rounded-full w-28 animate-pulse" />
					<div className="h-2 bg-white/20 rounded-full w-20 animate-pulse [animation-delay:200ms]" />
				</div>
			)}
		</div>
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge
		variant="outline"
		className="inline-flex items-center gap-2 px-3 py-1 w-fit mb-6"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @2xl:text-6xl @3xl:@max-5xl:text-4xl font-bold leading-[1.05] tracking-tighter">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<div className="text-xl @sm:text-2xl @md:text-3xl @2xl:text-3xl @3xl:@max-5xl:text-2xl font-semibold text-foreground/80 leading-tight">
		{text}
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-lg text-muted-foreground leading-relaxed max-w-lg">
		{text}
	</p>
);

interface CTALink {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: React.ComponentProps<typeof Button>['variant'];
}

const CTA = ({ items }: { items: CTALink[] }) => (
	<div className="flex flex-wrap gap-3 pt-2">
		{items.map(({ href, label, icon: Icon, variant }) => (
			<Button
				asChild
				key={label}
				size="lg"
				variant={variant}
				className="gap-2 px-5 @md:px-6 shadow-lg h-11 @md:h-12"
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

interface SocialLink {
	href: string;
	label: string;
	icon: ComponentType<{ className?: string }>;
}

const SocialLinks = ({ items }: { items: SocialLink[] }) => (
	<div className="border-t flex items-center gap-1 pt-3 @md:pt-4">
		<span className="text-sm font-medium text-muted-foreground mr-2">
			Connect:
		</span>
		{items.map(({ href, label, icon: Icon }) => (
			<Button
				key={label}
				asChild
				size="icon"
				variant="ghost"
				className="hover:text-primary transition-colors"
			>
				<Link
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
				>
					<Icon className="size-5" />
				</Link>
			</Button>
		))}
	</div>
);

const BackgroundDecorative = () => (
	<>
		<div className="absolute -top-4 -right-4 @md:-top-6 @md:-right-6 size-20 @md:size-24 bg-primary/20 backdrop-blur-sm rounded-2xl rotate-12 animate-float shadow-lg" />
		<div className="absolute -bottom-4 -left-4 @md:-bottom-6 @md:-left-6 size-16 @md:size-20 bg-primary/25 backdrop-blur-sm rounded-full animate-float-delayed shadow-lg" />

		{/* Add custom animations in your CSS or globals.css */}
		<style jsx>{`
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(12deg);
                }
                50% {
                    transform: translateY(-20px) rotate(12deg);
                }
            }
            @keyframes float-delayed {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-15px);
                }
            }
            .animate-float {
                animation: float 3s ease-in-out infinite;
            }
            .animate-float-delayed {
                animation: float-delayed 4s ease-in-out infinite;
            }
        `}</style>
	</>
);
