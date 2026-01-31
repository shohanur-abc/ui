import { Mail, ArrowRight, X, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PopupCardProps {
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	features: { icon: React.ElementType; text: string }[];
	dismissLabel: string;
}

const PopupCard = ({ title, description, placeholder, buttonText, features, dismissLabel }: PopupCardProps) => (
	<Card className="relative max-w-md shadow-2xl">
		<Button
			variant="ghost"
			size="icon-sm"
			className="absolute top-3 right-3"
		>
			<X className="size-4" />
			<span className="sr-only">{dismissLabel}</span>
		</Button>
		<CardHeader className="text-center pb-4">
			<div className="mx-auto size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
				<Mail className="size-7 text-primary" />
			</div>
			<CardTitle className="text-xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent className="flex flex-col gap-4">
			<form className="flex flex-col gap-3">
				<Input
					type="email"
					placeholder={placeholder}
					className="h-11"
				/>
				<Button size="lg" className="gap-2 w-full h-11">
					{buttonText}
					<ArrowRight className="size-4" />
				</Button>
			</form>
			<div className="flex justify-center gap-4 pt-2">
				{features.map((feature, i) => {
					const Icon = feature.icon;
					return (
						<div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Icon className="size-3.5" />
							<span>{feature.text}</span>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 flex items-center justify-center">
				<PopupCard
					title="Don't miss out!"
					description="Subscribe to get exclusive content and special offers delivered to your inbox."
					placeholder="Enter your email"
					buttonText="Subscribe Now"
					features={[
						{ icon: Shield, text: 'No spam' },
						{ icon: Clock, text: 'Weekly updates' },
					]}
					dismissLabel="Close"
				/>
			</div>
		</section>
	);
}
