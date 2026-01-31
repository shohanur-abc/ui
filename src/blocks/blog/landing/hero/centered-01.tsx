import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookOpen, Mail, Sparkles, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className=" max-w-7xl relative mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24 bg-background ">
				<Eyebrow icon={Sparkles} text="Welcome to the Blog" />
				<Title text="Ideas that inspire." highlight="Stories that matter." />
				<Description text="Deep dives into software engineering, design, and technology. Written by developers, for developers." />
				<Newsletter
					placeholder="Enter your email to subscribe"
					actionText="Subscribe Now"
					subtext="Join 10,000+ readers receiving weekly updates on the latest articles."
				/>
				<Stats
					items={[
						{ icon: BookOpen, value: '500+', label: 'Articles' },
						{ icon: Users, value: '50K+', label: 'Readers' },
						{ icon: Sparkles, value: '100+', label: 'Authors' },
					]}
				/>
				<Topics
					items={[
						'JavaScript',
						'React',
						'TypeScript',
						'Node.js',
						'Python',
						'DevOps',
						'AI/ML',
						'Design',
					]}
				/>
			</div>
			<BackgroundDecorative />
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
	<div className="text-center max-w-4xl mx-auto mb-4 @md:mb-5 @xl:mb-6">
		<Badge className="px-3 @md:px-4 py-1.5 @md:py-2 bg-primary/10 text-primary border-0">
			<Icon className="size-4 mr-2" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<div className="text-center max-w-4xl mx-auto mb-4 @md:mb-5 @xl:mb-6">
		<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight">
			{text}
			{highlight && (
				<span className="block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
					{highlight}
				</span>
			)}
		</h1>
	</div>
);

const Description = ({ text }: { text: string }) => (
	<div className="text-center max-w-4xl mx-auto mb-6 @md:mb-8 @xl:mb-10">
		<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
			{text}
		</p>
	</div>
);

const Newsletter = ({
	placeholder,
	actionText,
	subtext,
}: {
	placeholder: string;
	actionText?: string;
	subtext?: string;
}) => (
	<div className="max-w-lg mx-auto mb-8 @md:mb-10 @xl:mb-12">
		<div className="flex flex-col @sm:flex-row gap-3">
			<div className="relative flex-1">
				<Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
				<Input
					type="email"
					placeholder={placeholder}
					className="pl-12 h-11 @md:h-12 bg-background border-2 focus:border-primary"
				/>
			</div>
			<Button size="lg" className="h-11 @md:h-12 px-6 @md:px-8">
				{actionText || 'Subscribe'}
				<ArrowRight className="ml-2 size-4" />
			</Button>
		</div>
		<p className="text-sm text-muted-foreground mt-3 text-center">{subtext}</p>
	</div>
);

interface StatsProps {
	items: {
		icon: ComponentType<{ className?: string }>;
		value: string;
		label: string;
	}[];
}

const Stats = ({ items }: StatsProps) => (
	<div className="flex flex-wrap justify-center gap-6 @md:gap-8 @xl:gap-12 mb-8 @md:mb-10 @xl:mb-12">
		{items.map(({ icon: Icon, value, label }) => (
			<div key={label} className="flex items-center gap-3">
				<div className="size-10 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center">
					<Icon className="size-5 @md:size-6 text-primary" />
				</div>
				<div>
					<p className="text-xl @md:text-2xl font-bold text-foreground">
						{value}
					</p>
					<p className="text-xs @md:text-sm text-muted-foreground">{label}</p>
				</div>
			</div>
		))}
	</div>
);

interface TopicsProps {
	items: string[];
}

const Topics = ({ items }: TopicsProps) => (
	<div className="flex flex-wrap justify-center gap-2">
		<span className="text-sm text-muted-foreground mr-2">Popular topics:</span>
		{items.map((topic) => (
			<Badge
				key={topic}
				variant="secondary"
				className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
			>
				{topic}
			</Badge>
		))}
	</div>
);

const BackgroundDecorative = () => (
	<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)]" />
);
