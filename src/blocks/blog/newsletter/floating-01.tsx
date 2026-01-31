import { Mail, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	dismissLabel: string;
}

const FloatingCard = ({ icon: Icon, title, description, placeholder, buttonText, dismissLabel }: FloatingCardProps) => (
	<Card className="shadow-lg border-2">
		<CardContent className="p-4 @md:p-5">
			<div className="flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-start gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
							<Icon className="size-5 text-primary" />
						</div>
						<div>
							<h3 className="font-semibold">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
					</div>
					<Button variant="ghost" size="icon-sm" className="shrink-0 -mt-1 -mr-1">
						<X className="size-4" />
						<span className="sr-only">{dismissLabel}</span>
					</Button>
				</div>
				<form className="flex gap-2">
					<Input
						type="email"
						placeholder={placeholder}
						className="flex-1 h-9"
					/>
					<Button size="sm" className="gap-1 shrink-0">
						{buttonText}
						<ArrowRight className="size-3.5" />
					</Button>
				</form>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20">
				<div className="max-w-sm ml-auto">
					<FloatingCard
						icon={Mail}
						title="Stay updated"
						description="Get the latest news and articles."
						placeholder="you@email.com"
						buttonText="Subscribe"
						dismissLabel="Close"
					/>
				</div>
			</div>
		</section>
	);
}
