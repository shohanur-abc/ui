import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Code,
	Database,
	Palette,
	Server,
	Sparkles,
	Terminal,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-2 @md:grid-cols-4 @xl:grid-cols-6 gap-4 auto-rows-[minmax(140px,auto)]">
					<HeroCell
						eyebrow="Learn by Doing"
						title="Practical Tutorials for Modern Developers"
						cta={{ label: 'Get Started', href: '/tutorials' }}
						className="col-span-2 @md:col-span-2 @xl:col-span-3 row-span-2"
					/>
					<CategoryCell
						icon={Code}
						label="Frontend"
						count={342}
						color="text-blue-500"
						className=""
					/>
					<CategoryCell
						icon={Server}
						label="Backend"
						count={256}
						color="text-green-500"
						className=""
					/>
					<CategoryCell
						icon={Database}
						label="Database"
						count={128}
						color="text-purple-500"
						className=""
					/>
					<CategoryCell
						icon={Terminal}
						label="DevOps"
						count={187}
						color="text-orange-500"
						className=""
					/>
					<CategoryCell
						icon={Palette}
						label="Design"
						count={94}
						color="text-pink-500"
						className=""
					/>
					<CategoryCell
						icon={Zap}
						label="Performance"
						count={76}
						color="text-amber-500"
						className=""
					/>
				</div>
			</div>
		</section>
	);
}

interface HeroCellProps {
	eyebrow: string;
	title: string;
	cta: { label: string; href: string };
	className?: string;
}

const HeroCell = ({ eyebrow, title, cta, className }: HeroCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-accent/10 border-primary/20 flex flex-col justify-center ${className}`}
	>
		<CardContent className="p-6 @md:p-8">
			<Badge className="mb-4 bg-primary/10 text-primary border-0">
				<Sparkles className="size-3.5 mr-1.5" />
				{eyebrow}
			</Badge>
			<h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 max-w-md">
				{title}
			</h1>
			<Button size="lg" asChild className="gap-2">
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
		<GridDecorative />
	</Card>
);

const GridDecorative = () => (
	<div className="absolute inset-0 pointer-events-none opacity-[0.03]">
		<div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:40px_40px]" />
	</div>
);

interface CategoryCellProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	count: number;
	color: string;
	className?: string;
}

const CategoryCell = ({
	icon: Icon,
	label,
	count,
	color,
	className,
}: CategoryCellProps) => (
	<Link href={`/category/${label.toLowerCase()}`}>
		<Card
			className={`h-full group cursor-pointer transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 ${className}`}
		>
			<CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
				<div
					className={`size-12 rounded-xl bg-muted flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${color}`}
				>
					<Icon className="size-6" />
				</div>
				<p className="font-semibold text-sm">{label}</p>
				<p className="text-xs text-muted-foreground mt-1">{count} tutorials</p>
			</CardContent>
		</Card>
	</Link>
);
