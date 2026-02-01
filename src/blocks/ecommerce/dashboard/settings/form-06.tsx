import { Clock, Globe, Languages, Moon, Palette, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type ThemeOption = {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
};

type LocaleOption = {
	value: string;
	label: string;
	flag: string;
};

type TimezoneOption = {
	value: string;
	label: string;
	offset: string;
};

const ThemeCard = ({ id, label, icon: Icon, description }: ThemeOption) => (
	<Label
		htmlFor={id}
		className="group flex cursor-pointer flex-col items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="flex size-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-muted/80">
			<Icon className="size-6 text-muted-foreground transition-colors group-has-[[data-state=checked]]:text-primary" />
		</div>
		<div className="text-center">
			<span className="font-medium">{label}</span>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const SelectField = ({
	label,
	icon: Icon,
	options,
	defaultValue,
	placeholder,
}: {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	options: { value: string; label: string; extra?: string }[];
	defaultValue: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label className="flex items-center gap-2 text-sm font-medium">
			<Icon className="size-4 text-muted-foreground" />
			{label}
		</Label>
		<Select defaultValue={defaultValue}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						<span className="flex items-center gap-2">
							{opt.extra && <span>{opt.extra}</span>}
							{opt.label}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

export default function Main() {
	const themes: ThemeOption[] = [
		{ id: 'light', label: 'Light', icon: Sun, description: 'Bright and clean' },
		{ id: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
		{
			id: 'system',
			label: 'System',
			icon: Palette,
			description: 'Match device',
		},
	];

	const languages: LocaleOption[] = [
		{ value: 'en', label: 'English', flag: '🇺🇸' },
		{ value: 'es', label: 'Español', flag: '🇪🇸' },
		{ value: 'fr', label: 'Français', flag: '🇫🇷' },
		{ value: 'de', label: 'Deutsch', flag: '🇩🇪' },
		{ value: 'ja', label: '日本語', flag: '🇯🇵' },
	];

	const timezones: TimezoneOption[] = [
		{ value: 'pst', label: 'Pacific Time', offset: 'UTC-8' },
		{ value: 'est', label: 'Eastern Time', offset: 'UTC-5' },
		{ value: 'utc', label: 'Coordinated Universal Time', offset: 'UTC+0' },
		{ value: 'cet', label: 'Central European Time', offset: 'UTC+1' },
		{ value: 'jst', label: 'Japan Standard Time', offset: 'UTC+9' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Palette className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Appearance</CardTitle>
									<CardDescription>
										Customize how the dashboard looks
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<RadioGroup
								defaultValue="dark"
								className="grid gap-4 @sm:grid-cols-3"
							>
								{themes.map((theme) => (
									<ThemeCard key={theme.id} {...theme} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Globe className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Regional Settings</CardTitle>
									<CardDescription>
										Set your language and timezone preferences
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<div className="grid gap-4 @sm:grid-cols-2">
								<SelectField
									label="Language"
									icon={Languages}
									options={languages.map((l) => ({
										value: l.value,
										label: l.label,
										extra: l.flag,
									}))}
									defaultValue="en"
									placeholder="Select language"
								/>
								<SelectField
									label="Timezone"
									icon={Clock}
									options={timezones.map((t) => ({
										value: t.value,
										label: `${t.label} (${t.offset})`,
									}))}
									defaultValue="utc"
									placeholder="Select timezone"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Default</Button>
						<Button>Save Preferences</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
