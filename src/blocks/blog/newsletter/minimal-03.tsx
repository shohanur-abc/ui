import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentProps {
	icon: React.ElementType;
	title: string;
}

interface FormProps {
	placeholder: string;
	buttonIcon: React.ElementType;
}

const Content = ({ icon: Icon, title }: ContentProps) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-primary" />
		<span className="text-sm font-medium">{title}</span>
	</div>
);

const Form = ({ placeholder, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2">
		<Input
			type="email"
			placeholder={placeholder}
			className="w-52 h-8 text-sm"
		/>
		<Button size="sm" className="h-8 px-3">
			<Icon className="size-4" />
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-4">
				<div className="flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-3 py-3 border-y">
					<Content icon={Mail} title="Get updates in your inbox" />
					<Form placeholder="Email address" buttonIcon={Send} />
				</div>
			</div>
		</section>
	);
}
