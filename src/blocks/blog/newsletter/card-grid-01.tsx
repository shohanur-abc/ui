import { Mail, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface CardItemProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
}

const CardItem = ({ icon: Icon, title, description }: CardItemProps) => (
	<Card className="group transition-all hover:shadow-md hover:border-primary/20">
		<CardContent className="flex flex-col gap-3 p-5">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
				<Icon className="size-5 text-primary" />
			</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

const Form = ({ placeholder, buttonText }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
		<Button size="lg" className="gap-2 h-11 shrink-0">
			{buttonText}
			<ArrowRight className="size-4" />
		</Button>
	</form>
);

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="flex flex-col gap-3 text-center @lg:text-left">
		<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl">
			{description}
		</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="flex flex-col gap-10">
					<Header
						title="What you'll get"
						description="Subscribe to receive weekly insights and exclusive content delivered directly to your inbox."
					/>
					<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
						<CardItem
							icon={Mail}
							title="Weekly Updates"
							description="Fresh content every week to keep you informed."
						/>
						<CardItem
							icon={Star}
							title="Exclusive Content"
							description="Access articles and resources not available elsewhere."
						/>
						<CardItem
							icon={Mail}
							title="Expert Insights"
							description="Learn from industry leaders and practitioners."
						/>
						<CardItem
							icon={Star}
							title="Early Access"
							description="Be the first to know about new features and launches."
						/>
					</div>
					<div className="max-w-xl mx-auto @lg:mx-0 w-full">
						<Form
							placeholder="Enter your email address"
							buttonText="Subscribe"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
