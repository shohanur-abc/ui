'use client';

import * as React from 'react';
import {
	Search,
	Globe,
	FileText,
	Link2,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	Eye,
	Sparkles,
	BarChart3,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface SeoScoreCardProps {
	score: number;
	label: string;
	issues: number;
}

const SeoScoreCard = ({ score, label, issues }: SeoScoreCardProps) => {
	const getColor = () => {
		if (score >= 80) return 'text-emerald-500';
		if (score >= 60) return 'text-amber-500';
		return 'text-red-500';
	};

	const getBg = () => {
		if (score >= 80) return 'bg-emerald-500';
		if (score >= 60) return 'bg-amber-500';
		return 'bg-red-500';
	};

	return (
		<div className="relative flex flex-col items-center justify-center rounded-lg border bg-card p-6">
			<div className="relative size-24">
				<svg className="size-full -rotate-90" viewBox="0 0 36 36">
					<path
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						className="text-muted"
					/>
					<path
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeDasharray={`${score}, 100`}
						className={getColor()}
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className={`text-2xl font-bold ${getColor()}`}>{score}</span>
				</div>
			</div>
			<p className="mt-2 font-medium">{label}</p>
			{issues > 0 && (
				<Badge variant="secondary" className="mt-2 gap-1">
					<AlertTriangle className="size-3" />
					{issues} issues
				</Badge>
			)}
		</div>
	);
};

interface SeoCheckItemProps {
	status: 'pass' | 'fail' | 'warning';
	title: string;
	description: string;
}

const SeoCheckItem = ({ status, title, description }: SeoCheckItemProps) => {
	const config = {
		pass: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
		fail: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
		warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
	};

	const { icon: Icon, color, bg } = config[status];

	return (
		<div className={`flex items-start gap-3 rounded-lg ${bg} p-3`}>
			<Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
			<div>
				<p className="font-medium">{title}</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};

interface MetaPreviewProps {
	title: string;
	description: string;
	url: string;
}

const MetaPreview = ({ title, description, url }: MetaPreviewProps) => (
	<div className="rounded-lg border bg-white p-4 text-left dark:bg-zinc-900">
		<p className="text-sm text-muted-foreground">{url}</p>
		<p className="text-lg text-blue-600 hover:underline dark:text-blue-400">{title}</p>
		<p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
	</div>
);

interface KeywordAnalysisProps {
	keyword: string;
	density: number;
	count: number;
	status: 'optimal' | 'low' | 'high';
}

const KeywordAnalysis = ({ keyword, density, count, status }: KeywordAnalysisProps) => {
	const colors = {
		optimal: 'bg-emerald-500',
		low: 'bg-amber-500',
		high: 'bg-red-500',
	};

	return (
		<div className="flex items-center gap-4 rounded-lg border bg-card p-3">
			<div className="flex-1">
				<p className="font-medium">{keyword}</p>
				<p className="text-sm text-muted-foreground">
					Found {count} times ({density.toFixed(1)}% density)
				</p>
			</div>
			<div className="w-32">
				<div className="flex items-center justify-between text-xs">
					<span>0%</span>
					<span>3%</span>
				</div>
				<div className="relative mt-1 h-2 rounded-full bg-muted">
					<div
						className={`absolute left-0 top-0 h-full rounded-full ${colors[status]}`}
						style={{ width: `${Math.min(density * 33.33, 100)}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

interface MetaFieldProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	maxLength: number;
	currentLength: number;
	type?: 'input' | 'textarea';
}

const MetaField = ({
	label,
	value,
	onChange,
	maxLength,
	currentLength,
	type = 'input',
}: MetaFieldProps) => {
	const isOverLimit = currentLength > maxLength;
	const isOptimal = currentLength >= maxLength * 0.7 && currentLength <= maxLength;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label>{label}</Label>
				<span className={`text-xs ${isOverLimit ? 'text-red-500' : isOptimal ? 'text-emerald-500' : 'text-muted-foreground'}`}>
					{currentLength}/{maxLength}
				</span>
			</div>
			{type === 'textarea' ? (
				<Textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={3}
				/>
			) : (
				<Input value={value} onChange={(e) => onChange(e.target.value)} />
			)}
			<Progress
				value={(currentLength / maxLength) * 100}
				className={isOverLimit ? '[&>div]:bg-red-500' : isOptimal ? '[&>div]:bg-emerald-500' : ''}
			/>
		</div>
	);
};

export default function Main() {
	const [metaTitle, setMetaTitle] = React.useState('Premium Wireless Headphones | Best Audio Quality - MyStore');
	const [metaDescription, setMetaDescription] = React.useState(
		'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort. Free shipping on orders over $50.'
	);
	const [urlSlug, setUrlSlug] = React.useState('premium-wireless-headphones');

	const seoChecks = [
		{ status: 'pass' as const, title: 'Meta title length', description: 'Title is 54 characters (recommended: 50-60)' },
		{ status: 'pass' as const, title: 'Meta description length', description: 'Description is 158 characters (recommended: 150-160)' },
		{ status: 'warning' as const, title: 'Keyword in title', description: 'Primary keyword appears once in the title' },
		{ status: 'pass' as const, title: 'URL structure', description: 'URL is clean and contains the primary keyword' },
		{ status: 'fail' as const, title: 'Image alt texts', description: '2 of 5 images are missing alt text' },
		{ status: 'pass' as const, title: 'Internal links', description: 'Product has 3 internal links to related items' },
	];

	const keywords = [
		{ keyword: 'wireless headphones', density: 2.1, count: 4, status: 'optimal' as const },
		{ keyword: 'noise cancellation', density: 1.5, count: 3, status: 'optimal' as const },
		{ keyword: 'premium audio', density: 0.8, count: 2, status: 'low' as const },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<Search className="size-5" />
					<h2 className="text-xl font-semibold">SEO Settings</h2>
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<SeoScoreCard score={78} label="Overall Score" issues={2} />
					<SeoScoreCard score={85} label="On-Page SEO" issues={1} />
					<SeoScoreCard score={65} label="Technical SEO" issues={3} />
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<div className="space-y-6 rounded-lg border bg-card p-6">
						<h3 className="font-semibold">Meta Information</h3>
						
						<MetaField
							label="Meta Title"
							value={metaTitle}
							onChange={setMetaTitle}
							maxLength={60}
							currentLength={metaTitle.length}
						/>

						<MetaField
							label="Meta Description"
							value={metaDescription}
							onChange={setMetaDescription}
							maxLength={160}
							currentLength={metaDescription.length}
							type="textarea"
						/>

						<div className="space-y-2">
							<Label>URL Slug</Label>
							<div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm">
								<span className="text-muted-foreground">mystore.com/products/</span>
								<Input
									value={urlSlug}
									onChange={(e) => setUrlSlug(e.target.value)}
									className="h-auto border-0 bg-transparent p-0"
								/>
							</div>
						</div>

						<Button className="w-full gap-2">
							<Sparkles className="size-4" />
							Generate with AI
						</Button>
					</div>

					<div className="space-y-6">
						<div className="rounded-lg border bg-card p-6">
							<h3 className="mb-4 font-semibold">Search Preview</h3>
							<MetaPreview
								title={metaTitle}
								description={metaDescription}
								url={`mystore.com/products/${urlSlug}`}
							/>
						</div>

						<div className="rounded-lg border bg-card p-6">
							<h3 className="mb-4 font-semibold">Keyword Analysis</h3>
							<div className="space-y-3">
								{keywords.map((kw) => (
									<KeywordAnalysis key={kw.keyword} {...kw} />
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-semibold">SEO Checklist</h3>
					<div className="grid gap-3 @md:grid-cols-2">
						{seoChecks.map((check, idx) => (
							<SeoCheckItem key={idx} {...check} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
