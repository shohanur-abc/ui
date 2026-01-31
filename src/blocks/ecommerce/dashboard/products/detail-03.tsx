'use client';

import * as React from 'react';
import {
	Globe,
	Languages,
	Check,
	X,
	Copy,
	Sparkles,
	ChevronDown,
	AlertCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface LanguageTranslation {
	code: string;
	name: string;
	flag: string;
	isDefault: boolean;
	completionPercent: number;
	fields: {
		title: string;
		description: string;
		metaTitle: string;
		metaDescription: string;
	};
}

interface LanguageTabsProps {
	languages: LanguageTranslation[];
	activeCode: string;
	onSelect: (code: string) => void;
}

const LanguageTabs = ({ languages, activeCode, onSelect }: LanguageTabsProps) => (
	<div className="flex gap-2 overflow-x-auto pb-2">
		{languages.map((lang) => (
			<button
				key={lang.code}
				onClick={() => onSelect(lang.code)}
				className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${activeCode === lang.code ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
			>
				<span className="text-lg">{lang.flag}</span>
				<div className="text-left">
					<p className="text-sm font-medium">{lang.name}</p>
					<p className="text-xs text-muted-foreground">
						{lang.completionPercent}% complete
					</p>
				</div>
				{lang.isDefault && (
					<Badge variant="secondary" className="ml-1 text-xs">
						Default
					</Badge>
				)}
			</button>
		))}
	</div>
);

interface CompletionBarProps {
	percent: number;
	labels: { complete: string; fields: string };
	totalFields: number;
	completedFields: number;
}

const CompletionBar = ({
	percent,
	labels,
	totalFields,
	completedFields,
}: CompletionBarProps) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<div className="mb-2 flex items-center justify-between">
			<span className="text-sm font-medium">
				{completedFields}/{totalFields} {labels.fields}
			</span>
			<span className={`text-sm font-bold ${percent === 100 ? 'text-emerald-500' : 'text-amber-500'}`}>
				{percent}% {labels.complete}
			</span>
		</div>
		<Progress value={percent} className={percent === 100 ? '[&>div]:bg-emerald-500' : ''} />
	</div>
);

interface TranslationFieldProps {
	label: string;
	sourceValue: string;
	translatedValue: string;
	onChange: (value: string) => void;
	type?: 'input' | 'textarea';
	copyLabel: string;
	translateLabel: string;
}

const TranslationField = ({
	label,
	sourceValue,
	translatedValue,
	onChange,
	type = 'input',
	copyLabel,
	translateLabel,
}: TranslationFieldProps) => (
	<div className="space-y-3 rounded-lg border bg-card p-4">
		<div className="flex items-center justify-between">
			<Label className="font-medium">{label}</Label>
			<div className="flex gap-1">
				<Button
					variant="ghost"
					size="sm"
					className="gap-1 text-xs"
					onClick={() => onChange(sourceValue)}
				>
					<Copy className="size-3" />
					{copyLabel}
				</Button>
				<Button variant="ghost" size="sm" className="gap-1 text-xs">
					<Sparkles className="size-3" />
					{translateLabel}
				</Button>
			</div>
		</div>

		<div className="rounded-md bg-muted/50 p-3">
			<p className="text-xs text-muted-foreground">Original (English)</p>
			<p className="mt-1 text-sm">{sourceValue}</p>
		</div>

		{type === 'textarea' ? (
			<Textarea
				value={translatedValue}
				onChange={(e) => onChange(e.target.value)}
				rows={3}
				placeholder="Enter translation..."
			/>
		) : (
			<Input
				value={translatedValue}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Enter translation..."
			/>
		)}

		{!translatedValue && (
			<p className="flex items-center gap-1 text-xs text-amber-500">
				<AlertCircle className="size-3" />
				Translation missing
			</p>
		)}
	</div>
);

interface SeoFieldsProps {
	metaTitle: string;
	metaDescription: string;
	onMetaTitleChange: (value: string) => void;
	onMetaDescriptionChange: (value: string) => void;
	sourceMetaTitle: string;
	sourceMetaDescription: string;
	labels: { title: string; description: string; copy: string; translate: string };
}

const SeoFields = ({
	metaTitle,
	metaDescription,
	onMetaTitleChange,
	onMetaDescriptionChange,
	sourceMetaTitle,
	sourceMetaDescription,
	labels,
}: SeoFieldsProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					className="w-full justify-between"
				>
					<span className="font-medium">SEO Fields</span>
					<ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="space-y-4 pt-4">
				<TranslationField
					label={labels.title}
					sourceValue={sourceMetaTitle}
					translatedValue={metaTitle}
					onChange={onMetaTitleChange}
					copyLabel={labels.copy}
					translateLabel={labels.translate}
				/>
				<TranslationField
					label={labels.description}
					sourceValue={sourceMetaDescription}
					translatedValue={metaDescription}
					onChange={onMetaDescriptionChange}
					type="textarea"
					copyLabel={labels.copy}
					translateLabel={labels.translate}
				/>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default function Main() {
	const [activeLanguage, setActiveLanguage] = React.useState('es');
	const [languages, setLanguages] = React.useState<LanguageTranslation[]>([
		{
			code: 'en',
			name: 'English',
			flag: '🇺🇸',
			isDefault: true,
			completionPercent: 100,
			fields: {
				title: 'Premium Wireless Headphones',
				description: 'Experience crystal-clear audio with our top-of-the-line wireless headphones. Featuring active noise cancellation and 30-hour battery life.',
				metaTitle: 'Premium Wireless Headphones | Best Audio Quality',
				metaDescription: 'Shop our premium wireless headphones with ANC and long battery life. Free shipping on orders over $50.',
			},
		},
		{
			code: 'es',
			name: 'Spanish',
			flag: '🇪🇸',
			isDefault: false,
			completionPercent: 75,
			fields: {
				title: 'Auriculares Inalámbricos Premium',
				description: 'Experimenta un audio cristalino con nuestros auriculares inalámbricos de primera línea.',
				metaTitle: '',
				metaDescription: '',
			},
		},
		{
			code: 'fr',
			name: 'French',
			flag: '🇫🇷',
			isDefault: false,
			completionPercent: 50,
			fields: {
				title: 'Casque Sans Fil Premium',
				description: '',
				metaTitle: '',
				metaDescription: '',
			},
		},
		{
			code: 'de',
			name: 'German',
			flag: '🇩🇪',
			isDefault: false,
			completionPercent: 0,
			fields: {
				title: '',
				description: '',
				metaTitle: '',
				metaDescription: '',
			},
		},
	]);

	const activeTranslation = languages.find((l) => l.code === activeLanguage)!;
	const defaultTranslation = languages.find((l) => l.isDefault)!;

	const updateField = (field: keyof LanguageTranslation['fields'], value: string) => {
		setLanguages((prev) =>
			prev.map((l) =>
				l.code === activeLanguage
					? { ...l, fields: { ...l.fields, [field]: value } }
					: l
			)
		);
	};

	const filledFields = Object.values(activeTranslation.fields).filter(Boolean).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Globe className="size-5" />
					<h2 className="text-xl font-semibold">Product Translations</h2>
				</div>

				<LanguageTabs
					languages={languages}
					activeCode={activeLanguage}
					onSelect={setActiveLanguage}
				/>

				{!activeTranslation.isDefault && (
					<>
						<CompletionBar
							percent={activeTranslation.completionPercent}
							labels={{ complete: 'Complete', fields: 'fields' }}
							totalFields={4}
							completedFields={filledFields}
						/>

						<div className="space-y-4">
							<TranslationField
								label="Product Title"
								sourceValue={defaultTranslation.fields.title}
								translatedValue={activeTranslation.fields.title}
								onChange={(val) => updateField('title', val)}
								copyLabel="Copy"
								translateLabel="AI Translate"
							/>

							<TranslationField
								label="Description"
								sourceValue={defaultTranslation.fields.description}
								translatedValue={activeTranslation.fields.description}
								onChange={(val) => updateField('description', val)}
								type="textarea"
								copyLabel="Copy"
								translateLabel="AI Translate"
							/>

							<Separator />

							<SeoFields
								metaTitle={activeTranslation.fields.metaTitle}
								metaDescription={activeTranslation.fields.metaDescription}
								onMetaTitleChange={(val) => updateField('metaTitle', val)}
								onMetaDescriptionChange={(val) => updateField('metaDescription', val)}
								sourceMetaTitle={defaultTranslation.fields.metaTitle}
								sourceMetaDescription={defaultTranslation.fields.metaDescription}
								labels={{
									title: 'Meta Title',
									description: 'Meta Description',
									copy: 'Copy',
									translate: 'AI Translate',
								}}
							/>
						</div>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1 gap-2">
								<Sparkles className="size-4" />
								Auto-Translate All
							</Button>
							<Button className="flex-1 gap-2">
								<Check className="size-4" />
								Save Translation
							</Button>
						</div>
					</>
				)}

				{activeTranslation.isDefault && (
					<div className="rounded-lg border bg-muted/30 p-6 text-center">
						<Languages className="mx-auto mb-3 size-8 text-muted-foreground" />
						<h3 className="font-medium">This is the default language</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Edit the main product details to update this translation
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
