import { Mail, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarStackProps {
	avatars: { src: string; fallback: string }[];
	label: string;
}

interface TitleProps {
	text: string;
}

interface FormProps {
	placeholder: string;
	buttonIcon: React.ElementType;
}

const AvatarStack = ({ avatars, label }: AvatarStackProps) => (
	<div className="flex items-center gap-3">
		<div className="flex -space-x-2">
			{avatars.map((avatar, i) => (
				<Avatar key={i} className="size-7 border-2 border-card">
					<AvatarImage src={avatar.src} />
					<AvatarFallback className="text-[10px]">
						{avatar.fallback}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
		<span className="text-xs text-muted-foreground">{label}</span>
	</div>
);

const Title = ({ text }: TitleProps) => (
	<p className="text-sm font-medium">{text}</p>
);

const Form = ({ placeholder, buttonIcon: Icon }: FormProps) => (
	<form className="flex gap-2">
		<Input
			type="email"
			placeholder={placeholder}
			className="flex-1 h-9 text-sm"
		/>
		<Button size="sm" className="h-9 px-3 shrink-0">
			<Icon className="size-4" />
		</Button>
	</form>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="w-full max-w-[280px] p-4 rounded-xl bg-muted/50 flex flex-col gap-4">
					<AvatarStack
						avatars={[
							{ src: 'https://i.pravatar.cc/100?img=1', fallback: 'A' },
							{ src: 'https://i.pravatar.cc/100?img=2', fallback: 'B' },
							{ src: 'https://i.pravatar.cc/100?img=3', fallback: 'C' },
						]}
						label="5K+ subscribers"
					/>
					<Title text="Join our newsletter for weekly updates" />
					<Form placeholder="Your email" buttonIcon={ArrowRight} />
				</div>
			</div>
		</section>
	);
}
