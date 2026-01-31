import { Inbox, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AuthorProps {
	avatar: { src: string; fallback: string };
	name: string;
	role: string;
}

interface ContentProps {
	title: string;
	description: string;
}

interface FormProps {
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
}

interface SocialProofProps {
	text: string;
	avatars: { src: string; fallback: string }[];
}

const Author = ({ avatar, name, role }: AuthorProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12 border-2 border-primary/20">
			<AvatarImage src={avatar.src} />
			<AvatarFallback>{avatar.fallback}</AvatarFallback>
		</Avatar>
		<div>
			<div className="font-medium">{name}</div>
			<div className="text-sm text-muted-foreground">{role}</div>
		</div>
	</div>
);

const Content = ({ title, description }: ContentProps) => (
	<div className="flex flex-col gap-3">
		<h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{title}</h2>
		<p className="text-muted-foreground text-base @md:text-lg leading-relaxed">{description}</p>
	</div>
);

const Form = ({ placeholder, buttonText, buttonIcon: Icon }: FormProps) => (
	<form className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-11"
		/>
		<Button size="lg" className="gap-2 h-11">
			{buttonText}
			{Icon && <Icon className="size-4" />}
		</Button>
	</form>
);

const SocialProof = ({ text, avatars }: SocialProofProps) => (
	<div className="flex items-center gap-3">
		<div className="flex -space-x-2">
			{avatars.map((avatar, i) => (
				<Avatar key={i} className="size-8 border-2 border-background">
					<AvatarImage src={avatar.src} />
					<AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
		<span className="text-sm text-muted-foreground">{text}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="flex flex-col gap-8 max-w-2xl">
					<Author
						avatar={{ src: 'https://i.pravatar.cc/100?img=11', fallback: 'JD' }}
						name="John Doe"
						role="Editor-in-Chief"
					/>
					<Content
						title="A newsletter for curious minds"
						description="Every week, I share insights on technology, design, and building products that matter. No fluff, just actionable content that helps you grow."
					/>
					<Form
						placeholder="you@email.com"
						buttonText="Subscribe"
						buttonIcon={ArrowRight}
					/>
					<SocialProof
						text="Join 12,000+ subscribers"
						avatars={[
							{ src: 'https://i.pravatar.cc/100?img=1', fallback: 'A' },
							{ src: 'https://i.pravatar.cc/100?img=2', fallback: 'B' },
							{ src: 'https://i.pravatar.cc/100?img=3', fallback: 'C' },
							{ src: 'https://i.pravatar.cc/100?img=4', fallback: 'D' },
							{ src: 'https://i.pravatar.cc/100?img=5', fallback: 'E' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
