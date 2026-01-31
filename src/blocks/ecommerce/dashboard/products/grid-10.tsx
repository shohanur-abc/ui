'use client';

import * as React from 'react';
import {
	Package,
	Image as ImageIcon,
	Type,
	FileText,
	Globe,
	Search,
	AlertCircle,
	CheckCircle2,
	MoreHorizontal,
	Pencil,
	Eye,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface SEOScore {
	title: number;
	description: number;
	images: number;
	keywords: number;
}

interface ContentProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	title: string;
	description: string;
	imagesCount: number;
	maxImages: number;
	seoScore: SEOScore;
	overallScore: number;
	languages: { code: string; name: string; complete: boolean }[];
	issues: string[];
}

interface ScoreCircleProps {
	score: number;
	size?: 'sm' | 'md' | 'lg';
}

const ScoreCircle = ({ score, size = 'md' }: ScoreCircleProps) => {
	const getColor = () => {
		if (score >= 80) return 'text-emerald-500';
		if (score >= 60) return 'text-amber-500';
		return 'text-red-500';
	};

	const getSizeClass = () => {
		switch (size) {
			case 'sm':
				return 'size-10 text-sm';
			case 'lg':
				return 'size-16 text-xl';
			default:
				return 'size-12 text-lg';
		}
	};

	return (
		<div
			className={`flex items-center justify-center rounded-full border-2 font-bold ${getSizeClass()} ${getColor()}`}
			style={{ borderColor: 'currentColor' }}
		>
			{score}
		</div>
	);
};

interface SEOIndicatorProps {
	label: string;
	score: number;
	icon: React.ElementType;
}

const SEOIndicator = ({ label, score, icon: Icon }: SEOIndicatorProps) => {
	const getColor = () => {
		if (score >= 80) return 'text-emerald-500';
		if (score >= 60) return 'text-amber-500';
		return 'text-red-500';
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="flex flex-col items-center gap-1">
					<div className={`flex size-8 items-center justify-center rounded-lg bg-muted ${getColor()}`}>
						<Icon className="size-4" />
					</div>
					<span className={`text-xs font-medium ${getColor()}`}>{score}</span>
				</div>
			</TooltipTrigger>
			<TooltipContent>{label}: {score}%</TooltipContent>
		</Tooltip>
	);
};

interface LanguagesDisplayProps {
	languages: { code: string; name: string; complete: boolean }[];
}

const LanguagesDisplay = ({ languages }: LanguagesDisplayProps) => (
	<div className="flex items-center gap-1">
		{languages.map((lang) => (
			<Tooltip key={lang.code}>
				<TooltipTrigger asChild>
					<div
						className={`flex size-6 items-center justify-center rounded text-xs font-medium uppercase ${
							lang.complete
								? 'bg-emerald-500/10 text-emerald-500'
								: 'bg-amber-500/10 text-amber-500'
						}`}
					>
						{lang.code}
					</div>
				</TooltipTrigger>
				<TooltipContent>
					{lang.name}: {lang.complete ? 'Complete' : 'Incomplete'}
				</TooltipContent>
			</Tooltip>
		))}
	</div>
);

interface IssuesListProps {
	issues: string[];
	maxShow?: number;
}

const IssuesList = ({ issues, maxShow = 2 }: IssuesListProps) => {
	if (issues.length === 0) return null;

	return (
		<div className="space-y-1">
			{issues.slice(0, maxShow).map((issue, idx) => (
				<div key={idx} className="flex items-start gap-2 text-xs text-amber-500">
					<AlertCircle className="mt-0.5 size-3 shrink-0" />
					<span>{issue}</span>
				</div>
			))}
			{issues.length > maxShow && (
				<span className="text-xs text-muted-foreground">
					+{issues.length - maxShow} more issues
				</span>
			)}
		</div>
	);
};

interface ContentProgressProps {
	imagesCount: number;
	maxImages: number;
	label: string;
}

const ContentProgress = ({ imagesCount, maxImages, label }: ContentProgressProps) => {
	const percentage = (imagesCount / maxImages) * 100;

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">{label}</span>
				<span className="font-medium">{imagesCount}/{maxImages}</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
		</div>
	);
};

interface ProductCardProps {
	product: ContentProduct;
	actions: { label: string; icon?: React.ElementType; onClick: (id: string) => void }[];
	labels: {
		title: string;
		description: string;
		images: string;
		keywords: string;
		languages: string;
		issues: string;
	};
}

const ProductCard = ({ product, actions, labels }: ProductCardProps) => {
	const isComplete = product.overallScore >= 80 && product.issues.length === 0;

	return (
		<Card className={`overflow-hidden transition-all ${isComplete ? 'ring-1 ring-emerald-500/20' : ''}`}>
			<CardContent className="p-0">
				<div className="flex gap-4 p-4">
					<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
						{product.image ? (
							<img
								src={product.image}
								alt={product.name}
								className="size-full object-cover"
							/>
						) : (
							<div className="flex size-full items-center justify-center">
								<Package className="size-8 text-muted-foreground" />
							</div>
						)}
						{isComplete && (
							<div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
								<CheckCircle2 className="size-3" />
							</div>
						)}
					</div>
					<div className="min-w-0 flex-1">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="truncate font-semibold">{product.name}</h3>
								<p className="text-xs text-muted-foreground">{product.sku}</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon-sm">
										<MoreHorizontal className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{actions.map((action) => (
										<DropdownMenuItem
											key={action.label}
											onClick={() => action.onClick(product.id)}
										>
											{action.icon && <action.icon className="mr-2 size-4" />}
											{action.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between border-y bg-muted/30 px-4 py-3">
					<ScoreCircle score={product.overallScore} size="sm" />
					<div className="flex items-center gap-3">
						<SEOIndicator label={labels.title} score={product.seoScore.title} icon={Type} />
						<SEOIndicator label={labels.description} score={product.seoScore.description} icon={FileText} />
						<SEOIndicator label={labels.images} score={product.seoScore.images} icon={ImageIcon} />
						<SEOIndicator label={labels.keywords} score={product.seoScore.keywords} icon={Search} />
					</div>
				</div>

				<div className="space-y-3 p-4">
					<ContentProgress
						imagesCount={product.imagesCount}
						maxImages={product.maxImages}
						label={labels.images}
					/>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Globe className="size-4" />
							<span>{labels.languages}</span>
						</div>
						<LanguagesDisplay languages={product.languages} />
					</div>

					{product.issues.length > 0 && <IssuesList issues={product.issues} />}
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const products: ContentProduct[] = [
		{
			id: '1',
			name: 'Organic Face Cream',
			sku: 'BTY-OFC-001',
			image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
			title: 'Organic Face Cream - Natural Skincare for All Skin Types',
			description: 'Nourishing organic face cream made with natural ingredients...',
			imagesCount: 6,
			maxImages: 8,
			seoScore: { title: 95, description: 88, images: 75, keywords: 80 },
			overallScore: 85,
			languages: [
				{ code: 'en', name: 'English', complete: true },
				{ code: 'es', name: 'Spanish', complete: true },
				{ code: 'fr', name: 'French', complete: false },
			],
			issues: [],
		},
		{
			id: '2',
			name: 'Vitamin C Serum',
			sku: 'BTY-VCS-002',
			image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop',
			title: 'Vitamin C Serum',
			description: 'Brightening serum',
			imagesCount: 3,
			maxImages: 8,
			seoScore: { title: 45, description: 30, images: 38, keywords: 55 },
			overallScore: 42,
			languages: [
				{ code: 'en', name: 'English', complete: true },
				{ code: 'es', name: 'Spanish', complete: false },
			],
			issues: [
				'Title too short - add more keywords',
				'Description under minimum length',
				'Missing alt text on images',
			],
		},
		{
			id: '3',
			name: 'Hydrating Lip Balm',
			sku: 'BTY-HLB-003',
			image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
			title: 'Hydrating Lip Balm with Natural Beeswax',
			description: 'Keep your lips soft and hydrated with our natural beeswax lip balm...',
			imagesCount: 5,
			maxImages: 6,
			seoScore: { title: 82, description: 78, images: 83, keywords: 70 },
			overallScore: 78,
			languages: [
				{ code: 'en', name: 'English', complete: true },
				{ code: 'de', name: 'German', complete: true },
				{ code: 'fr', name: 'French', complete: true },
			],
			issues: ['Consider adding more keywords'],
		},
		{
			id: '4',
			name: 'Anti-Aging Night Cream',
			sku: 'BTY-ANC-004',
			image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=200&h=200&fit=crop',
			title: 'Anti-Aging Night Cream - Retinol & Peptide Complex for Youthful Skin',
			description: 'Advanced anti-aging night cream formulated with retinol and peptides...',
			imagesCount: 8,
			maxImages: 8,
			seoScore: { title: 98, description: 92, images: 100, keywords: 88 },
			overallScore: 94,
			languages: [
				{ code: 'en', name: 'English', complete: true },
				{ code: 'es', name: 'Spanish', complete: true },
				{ code: 'fr', name: 'French', complete: true },
				{ code: 'de', name: 'German', complete: true },
			],
			issues: [],
		},
		{
			id: '5',
			name: 'Charcoal Face Mask',
			sku: 'BTY-CFM-005',
			image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop',
			title: 'Charcoal',
			description: 'Deep cleansing mask',
			imagesCount: 2,
			maxImages: 8,
			seoScore: { title: 20, description: 25, images: 25, keywords: 35 },
			overallScore: 26,
			languages: [{ code: 'en', name: 'English', complete: false }],
			issues: [
				'Title is too short',
				'Description needs expansion',
				'Need minimum 4 product images',
				'Missing translations',
			],
		},
		{
			id: '6',
			name: 'Rose Water Toner',
			sku: 'BTY-RWT-006',
			image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=200&h=200&fit=crop',
			title: 'Rose Water Toner - Hydrating & Refreshing Facial Mist',
			description: 'Natural rose water toner that hydrates, refreshes and balances skin pH...',
			imagesCount: 7,
			maxImages: 8,
			seoScore: { title: 90, description: 85, images: 88, keywords: 82 },
			overallScore: 86,
			languages: [
				{ code: 'en', name: 'English', complete: true },
				{ code: 'es', name: 'Spanish', complete: true },
			],
			issues: [],
		},
	];

	const actions = [
		{ label: 'Edit Content', icon: Pencil, onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Preview', icon: Eye, onClick: (id: string) => console.log('Preview', id) },
		{ label: 'SEO Analysis', icon: Search, onClick: (id: string) => console.log('SEO', id) },
	];

	const labels = {
		title: 'Title SEO',
		description: 'Description SEO',
		images: 'Images',
		keywords: 'Keywords',
		languages: 'Languages',
		issues: 'Content Issues',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @xl:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							actions={actions}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
