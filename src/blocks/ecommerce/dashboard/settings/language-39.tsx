import {
	Bell,
	Check,
	ChevronRight,
	Filter,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Language = {
	code: string;
	name: string;
	nativeName: string;
	progress: number;
	isDefault?: boolean;
};

type LocalizedString = {
	key: string;
	defaultValue: string;
	translations: Record<string, string>;
};

const LanguageCard = ({
	code,
	name,
	nativeName,
	progress,
	isDefault,
}: Language) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex size-12 items-center justify-center rounded-lg bg-muted text-xl font-bold">
			{code.toUpperCase()}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<h4 className="font-medium">{name}</h4>
				{isDefault && <Badge variant="default">Default</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{nativeName}</p>
			<div className="mt-2 flex items-center gap-2">
				<Progress value={progress} className="h-1.5 flex-1" />
				<span className="text-xs text-muted-foreground">{progress}%</span>
			</div>
		</div>
		<Button variant="outline" size="sm">
			Edit
		</Button>
	</div>
);

const TranslationRow = ({
	keyName,
	defaultValue,
	translation,
}: { keyName: string; defaultValue: string; translation: string }) => (
	<div className="grid gap-2 border-b py-4 @lg:grid-cols-3 @lg:gap-4">
		<div>
			<code className="text-xs text-muted-foreground">{keyName}</code>
		</div>
		<div>
			<p className="text-sm">{defaultValue}</p>
		</div>
		<div>
			<Input defaultValue={translation} className="h-8 text-sm" />
		</div>
	</div>
);

export default function Main() {
	const languages: Language[] = [
		{ code: 'en', name: 'English', nativeName: 'English', progress: 100, isDefault: true },
		{ code: 'es', name: 'Spanish', nativeName: 'Español', progress: 92 },
		{ code: 'fr', name: 'French', nativeName: 'Français', progress: 85 },
		{ code: 'de', name: 'German', nativeName: 'Deutsch', progress: 78 },
		{ code: 'ja', name: 'Japanese', nativeName: '日本語', progress: 45 },
	];

	const translations = [
		{
			key: 'notification.order_confirmed',
			defaultValue: 'Your order has been confirmed',
			translations: { es: 'Tu pedido ha sido confirmado', fr: 'Votre commande est confirmée' },
		},
		{
			key: 'notification.order_shipped',
			defaultValue: 'Your order is on its way',
			translations: { es: 'Tu pedido está en camino', fr: 'Votre commande est en route' },
		},
		{
			key: 'notification.welcome',
			defaultValue: 'Welcome to our store!',
			translations: { es: '¡Bienvenido a nuestra tienda!', fr: 'Bienvenue dans notre boutique!' },
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-6 @lg:grid-cols-3">
						<div className="@lg:col-span-2">
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
													Available notification languages
												</CardDescription>
											</div>
										</div>
										<Button size="sm" className="gap-2">
											<Plus className="size-4" />
											Add Language
										</Button>
									</div>
								</CardHeader>
								<CardContent className="space-y-3 pt-6">
									{languages.map((lang) => (
										<LanguageCard key={lang.code} {...lang} />
									))}
								</CardContent>
							</Card>
						</div>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-base">Settings</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label>Default Language</Label>
										<Select defaultValue="en">
											<SelectTrigger>
												<SelectValue placeholder="Select language" />
											</SelectTrigger>
											<SelectContent>
												{languages.map((lang) => (
													<SelectItem key={lang.code} value={lang.code}>
														{lang.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label>Fallback Behavior</Label>
										<RadioGroup defaultValue="default">
											<div className="flex items-center gap-2">
												<RadioGroupItem value="default" id="fallback-default" />
												<Label htmlFor="fallback-default">Use default language</Label>
											</div>
											<div className="flex items-center gap-2">
												<RadioGroupItem value="skip" id="fallback-skip" />
												<Label htmlFor="fallback-skip">Skip notification</Label>
											</div>
										</RadioGroup>
									</div>
									<div className="flex items-center gap-3 pt-2">
										<Checkbox id="autoDetect" defaultChecked />
										<Label htmlFor="autoDetect">Auto-detect user language</Label>
									</div>
								</CardContent>
							</Card>

							<Card className="border-primary/20 bg-primary/5">
								<CardContent className="pt-6 text-center">
									<div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
										<Globe className="size-6 text-primary" />
									</div>
									<p className="text-sm font-medium">5 Languages</p>
									<p className="text-xs text-muted-foreground">80% average completion</p>
								</CardContent>
							</Card>
						</div>
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
								<div>
									<CardTitle className="text-base">Translation Editor</CardTitle>
									<CardDescription>Edit notification translations</CardDescription>
								</div>
								<div className="flex gap-2">
									<Select defaultValue="es">
										<SelectTrigger className="w-36">
											<SelectValue placeholder="Language" />
										</SelectTrigger>
										<SelectContent>
											{languages.filter((l) => !l.isDefault).map((lang) => (
												<SelectItem key={lang.code} value={lang.code}>
													{lang.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input placeholder="Search..." className="pl-9" />
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="grid gap-2 border-b py-2 text-sm font-medium text-muted-foreground @lg:grid-cols-3 @lg:gap-4">
								<span>Key</span>
								<span>Default (English)</span>
								<span>Translation</span>
							</div>
							{translations.map((t) => (
								<TranslationRow
									key={t.key}
									keyName={t.key}
									defaultValue={t.defaultValue}
									translation={t.translations.es || ''}
								/>
							))}
							<div className="mt-4 flex justify-end">
								<Button>Save Translations</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
