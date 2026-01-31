import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<Eyebrow icon={Sparkles} text="About Me" />
					<ProfileImage
						src="https://picsum.photos/seed/about-centered4/400/400"
						fallback="EW"
					/>
					<Title text="Emma Wilson" />
					<Role text="Frontend Architect" />
					<Description text="I'm a frontend architect passionate about performance optimization and developer experience. I lead teams to build lightning-fast web applications using modern JavaScript frameworks." />
					<SkillBars
						items={[
							{ label: 'React & Next.js', value: 95 },
							{ label: 'TypeScript', value: 90 },
							{ label: 'Performance Optimization', value: 88 },
							{ label: 'System Design', value: 85 },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-6">
		<Icon className="size-3.5 mr-1" />
		{text}
	</Badge>
);

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-28 @md:size-36 mx-auto mb-6 border-4 border-background shadow-2xl ring-2 ring-primary/20">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-3xl bg-primary text-primary-foreground font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

const Role = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-primary font-medium mb-6">{text}</p>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
		{text}
	</p>
);

interface SkillItem {
	label: string;
	value: number;
}

const SkillBars = ({ items }: { items: SkillItem[] }) => (
	<div className="space-y-5 text-left max-w-md mx-auto">
		{items.map(({ label, value }) => (
			<div key={label}>
				<div className="flex justify-between mb-2">
					<span className="text-sm font-medium">{label}</span>
					<span className="text-sm text-muted-foreground">{value}%</span>
				</div>
				<Progress value={value} className="h-2" />
			</div>
		))}
	</div>
);
