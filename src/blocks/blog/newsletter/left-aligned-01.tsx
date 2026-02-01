import { Mail, Send, Clock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface EyebrowProps {
	icon: React.ElementType;
	text: string;
}

interface TitleProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface MetricsProps {
	items: { icon: React.ElementType; value: string; label: string }[];
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge
		variant="secondary"
		className="gap-1.5 text-xs uppercase tracking-wide"
	>
		<Icon className="size-3" />
		{text}
	</Badge>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-2xl @sm:text-3xl @lg:text-4xl @xl:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h2>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full max-w-lg">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-12 text-base"
		/>
		<Button size="lg" className="gap-2 h-12 px-8">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Metrics = ({ items }: MetricsProps) => (
	<div className="grid grid-cols-3 gap-6 @md:gap-8 py-6 border-t border-b">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<div
					key={i}
					className="flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-3"
				>
					<Icon className="size-5 text-primary" />
					<div>
						<div className="text-xl @md:text-2xl font-bold">{item.value}</div>
						<div className="text-xs text-muted-foreground">{item.label}</div>
					</div>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
				<div className="flex flex-col gap-8 max-w-3xl">
					<Eyebrow icon={Mail} text="Newsletter" />
					<Title text="Get weekly insights on building better products" />
					<Form
						placeholder="Enter your email address"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
					<Metrics
						items={[
							{ icon: Users, value: '25K+', label: 'Subscribers' },
							{ icon: Clock, value: '52', label: 'Issues' },
							{ icon: Zap, value: '48%', label: 'Open Rate' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
