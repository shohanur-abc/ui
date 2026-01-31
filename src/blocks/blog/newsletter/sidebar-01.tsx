import { Inbox, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SidebarContentProps {
	icon: React.ElementType;
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface BenefitProps {
	icon: React.ElementType;
	text: string;
}

interface BenefitsListProps {
	items: { icon: React.ElementType; text: string }[];
}

const SidebarContent = ({ icon: Icon, title, description }: SidebarContentProps) => (
	<div className="flex flex-col gap-3">
		<div className="size-10 rounded-lg bg-primary flex items-center justify-center">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<h3 className="text-lg font-semibold">{title}</h3>
		<p className="text-sm text-muted-foreground">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col gap-2">
		<Input
			type="email"
			placeholder={placeholder}
			className="h-10"
		/>
		<Button className="w-full gap-1.5">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const Benefit = ({ icon: Icon, text }: BenefitProps) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const BenefitsList = ({ items }: BenefitsListProps) => (
	<div className="flex flex-col gap-2">
		{items.map((item, i) => (
			<Benefit key={i} icon={item.icon} text={item.text} />
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="w-full max-w-xs p-5 rounded-xl border bg-card flex flex-col gap-5">
					<SidebarContent
						icon={Inbox}
						title="Newsletter"
						description="Get weekly insights delivered to your inbox."
					/>
					<Form
						placeholder="Your email"
						buttonText="Subscribe"
						buttonIcon={Send}
					/>
					<BenefitsList
						items={[
							{ icon: Sparkles, text: 'Weekly updates' },
							{ icon: Sparkles, text: 'Exclusive content' },
							{ icon: Sparkles, text: 'No spam' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
