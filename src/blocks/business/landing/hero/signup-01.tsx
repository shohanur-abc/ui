import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Rocket, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="amber"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow icon={Rocket} text="Launch Today" />
						<Title text="Start Your Free Trial in Seconds" />
						<Description text="No credit card required. Get full access to all features for 14 days. Cancel anytime." />
						<SignupForm />
						<Benefits
							items={[
								'14-day free trial',
								'No credit card required',
								'Full feature access',
								'Cancel anytime',
							]}
						/>
					</div>
					<SocialProof
						avatars={[
							'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
							'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
							'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
							'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
						]}
						count={2500}
						text="joined this week"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
		{text}
	</p>
);

const SignupForm = () => (
	<form className="flex flex-col @sm:flex-row gap-3 mb-6">
		<Input
			type="email"
			placeholder="Enter your work email"
			className="flex-1 h-12"
		/>
		<Button size="lg" className="gap-2 h-12">
			Start Free Trial
			<ArrowRight className="size-4" />
		</Button>
	</form>
);

const Benefits = ({ items }: { items: string[] }) => (
	<div className="grid grid-cols-2 gap-2">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<CheckCircle className="size-4 text-primary shrink-0" />
				{item}
			</div>
		))}
	</div>
);

const SocialProof = ({
	avatars,
	count,
	text,
}: {
	avatars: string[];
	count: number;
	text: string;
}) => (
	<div className="bg-card border border-border rounded-2xl p-8 @md:p-10 text-center">
		<div className="flex justify-center mb-6">
			<div className="flex -space-x-3">
				{avatars.map((avatar, i) => (
					<div
						key={i}
						className="relative size-12 rounded-full border-2 border-background overflow-hidden"
					>
						<Image src={avatar} alt="User" fill className="object-cover" />
					</div>
				))}
				<div className="size-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
					+{count - avatars.length}
				</div>
			</div>
		</div>
		<p className="text-lg font-semibold mb-1">
			<span className="text-primary">{count.toLocaleString()}+</span> people{' '}
			{text}
		</p>
		<p className="text-sm text-muted-foreground">
			Join the fastest-growing platform
		</p>
		<div className="mt-6 pt-6 border-t border-border">
			<div className="flex justify-center gap-8 text-center">
				<div>
					<div className="text-2xl font-bold">4.9/5</div>
					<div className="text-xs text-muted-foreground">Rating</div>
				</div>
				<div>
					<div className="text-2xl font-bold">50K+</div>
					<div className="text-xs text-muted-foreground">Users</div>
				</div>
				<div>
					<div className="text-2xl font-bold">120+</div>
					<div className="text-xs text-muted-foreground">Countries</div>
				</div>
			</div>
		</div>
	</div>
);
