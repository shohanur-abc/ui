import {
	AlertCircle,
	Bell,
	Check,
	ChevronRight,
	ExternalLink,
	Globe,
	Languages,
	Mail,
	MessageSquare,
	Plus,
	Search,
	Settings2,
	Smartphone,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type Language = {
	code: string;
	name: string;
	native: string;
	isDefault: boolean;
	enabled: boolean;
	progress: number;
};

type TranslationCategory = {
	name: string;
	translated: number;
	total: number;
};

const LanguageRow = ({
	code,
	name,
	native,
	isDefault,
	enabled,
	progress,
}: Language) => (
	<div
		className={`flex items-center justify-between rounded-lg border p-4 ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted text-lg font-bold uppercase">
				{code}
			</div>
			<div>
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{name}</h4>
					{isDefault && (
						<Badge className="bg-primary/10 text-primary border-0 text-xs">
							Default
						</Badge>
					)}
				</div>
				<p className="text-sm text-muted-foreground">{native}</p>
			</div>
		</div>
		<div className="flex items-center gap-4">
			<div className="text-right">
				<p className="text-sm font-medium">{progress}%</p>
				<p className="text-xs text-muted-foreground">translated</p>
			</div>
			<Switch defaultChecked={enabled} disabled={isDefault} />
			<Button variant="ghost" size="sm">
				<Settings2 className="size-4" />
			</Button>
		</div>
	</div>
);

const CategoryProgress = ({ name, translated, total }: TranslationCategory) => {
	const percentage = Math.round((translated / total) * 100);

	return (
		<div className="flex items-center justify-between py-2">
			<span className="text-sm">{name}</span>
			<div className="flex items-center gap-3">
				<div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
					<div
						className="h-full bg-primary rounded-full"
						style={{ width: `${percentage}%` }}
					/>
				</div>
				<span className="text-sm text-muted-foreground w-16 text-right">
					{translated}/{total}
				</span>
			</div>
		</div>
	);
};

export default function Main() {
	const languages: Language[] = [
		{
			code: 'en',
			name: 'English',
			native: 'English',
			isDefault: true,
			enabled: true,
			progress: 100,
		},
		{
			code: 'es',
			name: 'Spanish',
			native: 'Español',
			isDefault: false,
			enabled: true,
			progress: 95,
		},
		{
			code: 'fr',
			name: 'French',
			native: 'Français',
			isDefault: false,
			enabled: true,
			progress: 88,
		},
		{
			code: 'de',
			name: 'German',
			native: 'Deutsch',
			isDefault: false,
			enabled: false,
			progress: 72,
		},
		{
			code: 'ja',
			name: 'Japanese',
			native: '日本語',
			isDefault: false,
			enabled: false,
			progress: 45,
		},
	];

	const categories: TranslationCategory[] = [
		{ name: 'Product Pages', translated: 245, total: 250 },
		{ name: 'Checkout', translated: 48, total: 50 },
		{ name: 'Email Templates', translated: 18, total: 24 },
		{ name: 'Error Messages', translated: 30, total: 35 },
		{ name: 'UI Elements', translated: 180, total: 200 },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Languages className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Languages</CardTitle>
											<CardDescription>
												Manage store languages and translations
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Add Language
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{languages.map((language) => (
									<LanguageRow key={language.code} {...language} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Translation Progress
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{categories.map((category) => (
									<CategoryProgress key={category.name} {...category} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Language Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<Label>Auto-detect Language</Label>
										<p className="text-xs text-muted-foreground">
											Based on browser settings
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Language Switcher</Label>
										<p className="text-xs text-muted-foreground">
											Show in header
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>URL Localization</Label>
										<p className="text-xs text-muted-foreground">
											Add language code to URLs
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<Globe className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">
									{languages.filter((l) => l.enabled).length} Active Languages
								</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Reach customers globally
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
