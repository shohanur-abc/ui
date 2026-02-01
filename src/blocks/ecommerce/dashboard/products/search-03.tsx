'use client';

import * as React from 'react';
import {
	Search,
	Mic,
	MicOff,
	Sparkles,
	Clock,
	Lightbulb,
	ArrowRight,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchSuggestion {
	type: 'product' | 'category' | 'tag' | 'action';
	text: string;
	meta?: string;
}

interface VoiceSearchButtonProps {
	isListening: boolean;
	onToggle: () => void;
}

const VoiceSearchButton = ({
	isListening,
	onToggle,
}: VoiceSearchButtonProps) => (
	<button
		onClick={onToggle}
		className={`rounded-full p-2 transition-colors ${
			isListening
				? 'bg-destructive text-destructive-foreground'
				: 'bg-muted hover:bg-muted/80'
		}`}
	>
		{isListening ? (
			<MicOff className="size-5" />
		) : (
			<Mic className="size-5" />
		)}
	</button>
);

interface AiSearchBarProps {
	query: string;
	onQueryChange: (query: string) => void;
	isListening: boolean;
	onVoiceToggle: () => void;
	suggestions: SearchSuggestion[];
	onSelectSuggestion: (suggestion: SearchSuggestion) => void;
}

const AiSearchBar = ({
	query,
	onQueryChange,
	isListening,
	onVoiceToggle,
	suggestions,
	onSelectSuggestion,
}: AiSearchBarProps) => {
	const [isFocused, setIsFocused] = React.useState(false);

	const typeColors = {
		product: 'bg-blue-500/10 text-blue-500',
		category: 'bg-green-500/10 text-green-500',
		tag: 'bg-purple-500/10 text-purple-500',
		action: 'bg-amber-500/10 text-amber-500',
	};

	return (
		<div className="relative">
			<div className="flex items-center gap-2 rounded-lg border bg-card p-2">
				<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
					<Sparkles className="size-5 text-primary" />
				</div>
				<Input
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					placeholder="Ask anything about your products..."
					className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
				/>
				{query && (
					<button
						onClick={() => onQueryChange('')}
						className="p-1 text-muted-foreground hover:text-foreground"
					>
						<X className="size-4" />
					</button>
				)}
				<VoiceSearchButton
					isListening={isListening}
					onToggle={onVoiceToggle}
				/>
				<Button>
					<Search className="size-4" />
				</Button>
			</div>

			{isListening && (
				<div className="absolute top-full z-50 mt-2 w-full rounded-lg border bg-popover p-4 text-center shadow-lg">
					<div className="mb-2 flex justify-center">
						<div className="animate-pulse">
							<Mic className="size-8 text-destructive" />
						</div>
					</div>
					<p className="text-sm text-muted-foreground">Listening...</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Say something like "Show me products under $50"
					</p>
				</div>
			)}

			{isFocused && suggestions.length > 0 && !isListening && (
				<div className="absolute top-full z-50 mt-2 w-full rounded-lg border bg-popover p-2 shadow-lg">
					{suggestions.map((suggestion, idx) => (
						<button
							key={idx}
							onClick={() => onSelectSuggestion(suggestion)}
							className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent"
						>
							<Badge className={typeColors[suggestion.type]}>
								{suggestion.type}
							</Badge>
							<span className="flex-1">{suggestion.text}</span>
							{suggestion.meta && (
								<span className="text-sm text-muted-foreground">
									{suggestion.meta}
								</span>
							)}
							<ArrowRight className="size-4 text-muted-foreground" />
						</button>
					))}
				</div>
			)}
		</div>
	);
};

interface NaturalLanguageExamplesProps {
	examples: string[];
	onSelect: (example: string) => void;
}

const NaturalLanguageExamples = ({
	examples,
	onSelect,
}: NaturalLanguageExamplesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<Lightbulb className="size-4 text-amber-500" />
			<h4 className="font-medium">Try asking:</h4>
		</div>
		<div className="grid gap-2 @sm:grid-cols-2">
			{examples.map((example) => (
				<button
					key={example}
					onClick={() => onSelect(example)}
					className="rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent"
				>
					"{example}"
				</button>
			))}
		</div>
	</div>
);

interface RecentQueriesProps {
	queries: { query: string; timestamp: string }[];
	onSelect: (query: string) => void;
}

const RecentQueries = ({ queries, onSelect }: RecentQueriesProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<h4 className="font-medium">Recent Queries</h4>
		</div>
		<div className="space-y-2">
			{queries.map((item, idx) => (
				<button
					key={idx}
					onClick={() => onSelect(item.query)}
					className="flex w-full items-center justify-between rounded-lg border p-2 text-left text-sm transition-colors hover:bg-accent"
				>
					<span>{item.query}</span>
					<span className="text-xs text-muted-foreground">{item.timestamp}</span>
				</button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [query, setQuery] = React.useState('');
	const [isListening, setIsListening] = React.useState(false);

	const suggestions: SearchSuggestion[] = query
		? [
				{ type: 'product', text: 'Wireless Mouse Pro', meta: 'SKU: WM-001' },
				{ type: 'category', text: 'Electronics', meta: '124 products' },
				{ type: 'tag', text: 'bestseller', meta: '45 products' },
				{ type: 'action', text: 'Show low stock items', meta: '12 products' },
			]
		: [];

	const examples = [
		'Show me all products with low stock',
		'What are my top selling products this month?',
		'List products that need price updates',
		'Find products without images',
	];

	const recentQueries = [
		{ query: 'Products under $50 with high ratings', timestamp: '2 min ago' },
		{ query: 'Out of stock electronics', timestamp: '1 hour ago' },
		{ query: 'New arrivals this week', timestamp: '3 hours ago' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Sparkles className="size-5 text-primary" />
					<h2 className="text-xl font-semibold">AI-Powered Search</h2>
					<Badge variant="secondary">Beta</Badge>
				</div>

				<AiSearchBar
					query={query}
					onQueryChange={setQuery}
					isListening={isListening}
					onVoiceToggle={() => setIsListening(!isListening)}
					suggestions={suggestions}
					onSelectSuggestion={(s) => setQuery(s.text)}
				/>

				<NaturalLanguageExamples
					examples={examples}
					onSelect={setQuery}
				/>

				<RecentQueries
					queries={recentQueries}
					onSelect={setQuery}
				/>
			</div>
		</section>
	);
}
