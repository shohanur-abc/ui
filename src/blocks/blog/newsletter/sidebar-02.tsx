import { BookOpen, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
	icon: React.ElementType;
	title: string;
}

interface FormProps {
	placeholder: string;
	buttonIcon: React.ElementType;
}

interface FeaturesProps {
	items: string[];
}

const Header = ({ icon: Icon, title }: HeaderProps) => (
	<div className="flex items-center gap-2 pb-3 border-b">
		<Icon className="size-4 text-primary" />
		<h3 className="font-medium text-sm">{title}</h3>
	</div>
);

const Form = ({ placeholder, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col gap-2">
		<Input type="email" placeholder={placeholder} className="h-9 text-sm" />
		<Button size="sm" className="w-full gap-1">
			Subscribe
			<Icon className="size-3.5" />
		</Button>
	</form>
);

const Features = ({ items }: FeaturesProps) => (
	<ul className="space-y-1.5 pt-2 border-t">
		{items.map((item, i) => (
			<li
				key={i}
				className="flex items-center gap-2 text-xs text-muted-foreground"
			>
				<Check className="size-3 text-primary shrink-0" />
				<span>{item}</span>
			</li>
		))}
	</ul>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="w-full max-w-[260px] p-4 rounded-lg border bg-card flex flex-col gap-4">
					<Header icon={BookOpen} title="Newsletter" />
					<Form placeholder="Email" buttonIcon={ArrowRight} />
					<Features
						items={['Weekly digest', 'Exclusive tips', 'Free resources']}
					/>
				</div>
			</div>
		</section>
	);
}
