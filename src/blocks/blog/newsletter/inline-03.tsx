import { Mail, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContentProps {
	title: string;
	description: string;
}

interface SubscribersProps {
	avatars: { src: string; fallback: string }[];
	count: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
}

const Content = ({ title, description }: ContentProps) => (
	<div className="flex flex-col gap-2">
		<h2 className="text-xl @md:text-2xl font-bold">{title}</h2>
		<p className="text-muted-foreground text-sm">{description}</p>
	</div>
);

const Subscribers = ({ avatars, count }: SubscribersProps) => (
	<div className="flex items-center gap-3">
		<div className="flex -space-x-2">
			{avatars.map((avatar, i) => (
				<Avatar key={i} className="size-8 border-2 border-background">
					<AvatarImage src={avatar.src} />
					<AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<div className="flex items-center gap-1 text-sm text-muted-foreground">
			<Users className="size-4" />
			<span>{count}</span>
		</div>
	</div>
);

const Form = ({ placeholder, buttonText }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full @xl:w-auto">
		<Input type="email" placeholder={placeholder} className="h-10 @xl:w-56" />
		<Button className="gap-2 h-10">
			<Mail className="size-4" />
			{buttonText}
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-10 @md:py-12">
				<div className="flex flex-col @xl:flex-row @xl:items-center gap-6 @xl:gap-8 p-6 rounded-xl bg-muted/50">
					<div className="flex-1 flex flex-col gap-4">
						<Content
							title="Join our newsletter"
							description="Get weekly insights delivered to your inbox."
						/>
						<Subscribers
							avatars={[
								{ src: 'https://i.pravatar.cc/100?img=1', fallback: 'JD' },
								{ src: 'https://i.pravatar.cc/100?img=2', fallback: 'AS' },
								{ src: 'https://i.pravatar.cc/100?img=3', fallback: 'MK' },
								{ src: 'https://i.pravatar.cc/100?img=4', fallback: 'RB' },
							]}
							count="10K+ subscribers"
						/>
					</div>
					<Form placeholder="Email address" buttonText="Subscribe" />
				</div>
			</div>
		</section>
	);
}
