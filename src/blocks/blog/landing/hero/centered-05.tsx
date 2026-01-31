import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { ArrowRight, Search, TrendingUp } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<Eyebrow icon={TrendingUp} text="Trending Now" />
					<Title text="Find Your Next" highlight="Great Read" />
					<Description text="Search through thousands of articles on software engineering, design systems, and emerging technologies. Discover content that matters to you." />
					<SearchBar
						placeholder="Search articles, topics, or authors..."
						buttonText="Search"
					/>
					<TrendingTopics
						label="Trending:"
						items={[
							'React Server Components',
							'AI Agents',
							'Edge Functions',
							'Design Tokens',
							'Rust',
							'WebGPU',
						]}
					/>
				</div>
			</div>
			<RadialDecorative />
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
	<div className="mb-4 @md:mb-6">
		<Badge variant="outline" className="gap-2 px-4 py-1.5">
			<Icon className="size-4 text-primary" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}{' '}
		<span className="relative">
			<span className="relative z-10 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
				{highlight}
			</span>
			<span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-0" />
		</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

const SearchBar = ({
	placeholder,
	buttonText,
}: {
	placeholder: string;
	buttonText: string;
}) => (
	<div className="max-w-xl mx-auto mb-6 @md:mb-8">
		<InputGroup className="h-12 @md:h-14 border-2">
			<InputGroupAddon align="inline-start">
				<Search className="size-5 text-muted-foreground" />
			</InputGroupAddon>
			<InputGroupInput placeholder={placeholder} className="text-base" />
			<InputGroupAddon align="inline-end">
				<Button size="sm" className="gap-2">
					{buttonText}
					<ArrowRight className="size-4" />
				</Button>
			</InputGroupAddon>
		</InputGroup>
	</div>
);

interface TrendingTopicsProps {
	label: string;
	items: string[];
}

const TrendingTopics = ({ label, items }: TrendingTopicsProps) => (
	<div className="flex flex-wrap items-center justify-center gap-2">
		<span className="text-sm text-muted-foreground">{label}</span>
		{items.map((topic) => (
			<Badge
				key={topic}
				variant="secondary"
				className="cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105"
			>
				{topic}
			</Badge>
		))}
	</div>
);

const RadialDecorative = () => (
	<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-5" />
);
