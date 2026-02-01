import { Newspaper, Send, Check, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BadgeItemProps {
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

interface TrustItemsProps {
	items: { icon: React.ElementType; text: string }[];
}

const EyebrowBadge = ({ icon: Icon, text }: BadgeItemProps) => (
	<Badge className="gap-1.5 shrink-0">
		<Icon className="size-3" />
		{text}
	</Badge>
);

const Title = ({ text }: TitleProps) => (
	<h2 className="text-lg @md:text-xl @lg:text-2xl font-semibold">{text}</h2>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full @lg:w-auto @lg:min-w-95">
		<Input type="email" placeholder={placeholder} className="flex-1 h-11" />
		<Button className="gap-2 h-11 shrink-0">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const TrustItems = ({ items }: TrustItemsProps) => (
	<div className="flex flex-wrap gap-4">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<span
					key={i}
					className="flex items-center gap-1.5 text-xs text-muted-foreground"
				>
					<Icon className="size-3.5 text-primary" />
					{item.text}
				</span>
			);
		})}
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="corporate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-10 @md:py-12">
				<div className="flex flex-col gap-6 p-6 @md:p-8 rounded-2xl bg-primary/5 border border-primary/10">
					<div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4">
						<div className="flex flex-col @md:flex-row @md:items-center gap-3">
							<EyebrowBadge icon={Newspaper} text="Newsletter" />
							<Title text="Join 20,000+ business professionals" />
						</div>
						<Form
							placeholder="your@company.com"
							buttonText="Subscribe"
							buttonIcon={Send}
						/>
					</div>
					<TrustItems
						items={[
							{ icon: Check, text: 'Weekly insights' },
							{ icon: Check, text: 'Exclusive content' },
							{ icon: Shield, text: 'Privacy protected' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
