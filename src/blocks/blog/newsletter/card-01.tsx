import { Send, Zap, Heart, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface StatsProps {
	items: { icon: React.ElementType; value: string; label: string }[];
}

const Header = ({ title, description }: HeaderProps) => (
	<div className="flex flex-col gap-2">
		<h2 className="text-xl @md:text-2xl font-bold">{title}</h2>
		<p className="text-muted-foreground text-sm">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2 w-full">
		<Input type="email" placeholder={placeholder} className="flex-1 h-10" />
		<Button className="gap-1.5 h-10 shrink-0">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Stats = ({ items }: StatsProps) => (
	<div className="grid grid-cols-3 gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div key={i} className="flex flex-col items-center gap-1 text-center">
					<Icon className="size-5 text-primary" />
					<span className="font-bold text-lg">{item.value}</span>
					<span className="text-xs text-muted-foreground">{item.label}</span>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<Card className="max-w-md mx-auto">
					<CardContent className="flex flex-col gap-5 p-5 @md:p-6">
						<Header
							title="Join the community"
							description="Get weekly updates and connect with like-minded people."
						/>
						<Form
							placeholder="you@email.com"
							buttonText="Join"
							buttonIcon={Send}
						/>
						<Separator />
						<Stats
							items={[
								{ icon: Zap, value: '10K+', label: 'Subscribers' },
								{ icon: Heart, value: '50+', label: 'Issues' },
								{ icon: Flame, value: '98%', label: 'Open Rate' },
							]}
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
