import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Filter, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-start gap-8 @xl:gap-12">
					{/* Sidebar filters */}
					<FilterSidebar
						categories={[
							{ label: 'All Projects', count: 24, active: true },
							{ label: 'Web Development', count: 12 },
							{ label: 'Mobile Apps', count: 6 },
							{ label: 'UI/UX Design', count: 4 },
							{ label: 'Backend/API', count: 2 },
						]}
						technologies={[
							'React',
							'Next.js',
							'Vue.js',
							'Node.js',
							'Python',
							'TypeScript',
						]}
					/>

					{/* Project grid */}
					<div className="flex-1">
						<FilterHeader
							title="All Projects"
							count={24}
							sortOptions={['Recent', 'Popular', 'Name']}
						/>

						<FilteredGrid
							items={[
								{
									image: 'https://picsum.photos/seed/fil1/600/450',
									title: 'Admin Dashboard',
									category: 'Web',
									tags: ['React', 'TypeScript'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/fil2/600/450',
									title: 'Mobile Banking',
									category: 'Mobile',
									tags: ['React Native', 'Node.js'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/fil3/600/450',
									title: 'E-Commerce Store',
									category: 'Web',
									tags: ['Next.js', 'Stripe'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/fil4/600/450',
									title: 'Portfolio Site',
									category: 'Web',
									tags: ['Next.js', 'Framer'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/fil5/600/450',
									title: 'Chat Application',
									category: 'Mobile',
									tags: ['React Native', 'Socket.io'],
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/fil6/600/450',
									title: 'API Gateway',
									category: 'Backend',
									tags: ['Node.js', 'GraphQL'],
									href: '#',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface FilterCategory {
	label: string;
	count: number;
	active?: boolean;
}

interface FilterSidebarProps {
	categories: FilterCategory[];
	technologies: string[];
}

const FilterSidebar = ({ categories, technologies }: FilterSidebarProps) => (
	<aside className="@lg:w-64 shrink-0 @lg:sticky @lg:top-24">
		<div className="flex items-center gap-2 mb-6">
			<Filter className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">Filters</h2>
		</div>

		{/* Categories */}
		<div className="mb-8">
			<h3 className="text-sm font-medium text-muted-foreground mb-3">
				Category
			</h3>
			<ul className="space-y-1">
				{categories.map(({ label, count, active }, i) => (
					<li key={i}>
						<button
							className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
						>
							<span>{label}</span>
							<Badge
								variant={active ? 'secondary' : 'outline'}
								className="text-xs"
							>
								{count}
							</Badge>
						</button>
					</li>
				))}
			</ul>
		</div>

		{/* Technologies */}
		<div>
			<h3 className="text-sm font-medium text-muted-foreground mb-3">
				Technology
			</h3>
			<div className="flex flex-wrap gap-2">
				{technologies.map((tech, i) => (
					<Button key={i} variant="outline" size="sm" className="h-7 text-xs">
						{tech}
					</Button>
				))}
			</div>
		</div>
	</aside>
);

interface FilterHeaderProps {
	title: string;
	count: number;
	sortOptions: string[];
}

const FilterHeader = ({ title, count, sortOptions }: FilterHeaderProps) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-4 mb-6">
		<div>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-sm text-muted-foreground">{count} projects found</p>
		</div>
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground">Sort by:</span>
			<div className="flex gap-1">
				{sortOptions.map((option, i) => (
					<Button key={i} variant={i === 0 ? 'secondary' : 'ghost'} size="sm">
						{option}
					</Button>
				))}
			</div>
		</div>
	</div>
);

interface GridItem {
	image: string;
	title: string;
	category: string;
	tags: string[];
	href: string;
}

const FilteredGrid = ({ items }: { items: GridItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-4 @md:gap-6">
		{items.map(({ image, title, category, tags, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group block rounded-xl overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20"
			>
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
					<Badge className="absolute top-3 left-3 bg-primary/90">
						{category}
					</Badge>
					<Button
						variant="secondary"
						size="icon-sm"
						className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<ArrowUpRight className="size-4" />
					</Button>
				</div>
				<div className="p-4">
					<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
						{title}
					</h3>
					<div className="flex flex-wrap gap-1.5">
						{tags.map((tag, j) => (
							<Badge key={j} variant="outline" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</Link>
		))}
	</div>
);
