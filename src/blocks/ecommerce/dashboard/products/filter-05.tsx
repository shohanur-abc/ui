'use client';

import * as React from 'react';
import {
	Calendar,
	Clock,
	ChevronLeft,
	ChevronRight,
	X,
	Check,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface DatePreset {
	label: string;
	value: string;
	getRange: () => { from: string; to: string };
}

interface PresetButtonsProps {
	presets: DatePreset[];
	activePreset: string | null;
	onSelect: (preset: DatePreset) => void;
}

const PresetButtons = ({
	presets,
	activePreset,
	onSelect,
}: PresetButtonsProps) => (
	<div className="flex flex-wrap gap-2">
		{presets.map((preset) => (
			<Button
				key={preset.value}
				variant={activePreset === preset.value ? 'default' : 'outline'}
				size="sm"
				onClick={() => onSelect(preset)}
			>
				{preset.label}
			</Button>
		))}
	</div>
);

interface DateInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const DateInput = ({ label, value, onChange }: DateInputProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="relative">
			<Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="date"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-9"
			/>
		</div>
	</div>
);

interface CalendarGridProps {
	month: number;
	year: number;
	selectedFrom: string | null;
	selectedTo: string | null;
	onSelectDate: (date: string) => void;
	onPrevMonth: () => void;
	onNextMonth: () => void;
}

const CalendarGrid = ({
	month,
	year,
	selectedFrom,
	selectedTo,
	onSelectDate,
	onPrevMonth,
	onNextMonth,
}: CalendarGridProps) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const dates = [];
	for (let i = 0; i < firstDay; i++) {
		dates.push(null);
	}
	for (let i = 1; i <= daysInMonth; i++) {
		dates.push(i);
	}

	const isInRange = (day: number) => {
		if (!selectedFrom || !selectedTo || !day) return false;
		const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return date >= selectedFrom && date <= selectedTo;
	};

	const isSelected = (day: number) => {
		if (!day) return false;
		const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return date === selectedFrom || date === selectedTo;
	};

	return (
		<div className="w-64 rounded-lg border bg-card p-3">
			<div className="mb-3 flex items-center justify-between">
				<Button variant="ghost" size="icon-sm" onClick={onPrevMonth}>
					<ChevronLeft className="size-4" />
				</Button>
				<span className="font-medium">
					{monthNames[month]} {year}
				</span>
				<Button variant="ghost" size="icon-sm" onClick={onNextMonth}>
					<ChevronRight className="size-4" />
				</Button>
			</div>

			<div className="grid grid-cols-7 gap-1">
				{dayNames.map((day) => (
					<div
						key={day}
						className="p-2 text-center text-xs text-muted-foreground"
					>
						{day}
					</div>
				))}
				{dates.map((day, idx) => (
					<button
						key={idx}
						onClick={() =>
							day &&
							onSelectDate(
								`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
							)
						}
						disabled={!day}
						className={`rounded p-2 text-center text-sm transition-colors ${!day ? '' : isSelected(day) ? 'bg-primary text-primary-foreground' : isInRange(day) ? 'bg-primary/20' : 'hover:bg-accent'}`}
					>
						{day}
					</button>
				))}
			</div>
		</div>
	);
};

interface ActiveFiltersProps {
	from: string | null;
	to: string | null;
	onClear: () => void;
}

const ActiveFilters = ({ from, to, onClear }: ActiveFiltersProps) => {
	if (!from && !to) return null;

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground">Active filter:</span>
			<Badge variant="secondary" className="gap-1">
				{from && to ? `${from} to ${to}` : from || to}
				<button onClick={onClear}>
					<X className="size-3" />
				</button>
			</Badge>
		</div>
	);
};

export default function Main() {
	const [fromDate, setFromDate] = React.useState<string | null>(null);
	const [toDate, setToDate] = React.useState<string | null>(null);
	const [activePreset, setActivePreset] = React.useState<string | null>(null);
	const [calendarMonth, setCalendarMonth] = React.useState(
		new Date().getMonth(),
	);
	const [calendarYear, setCalendarYear] = React.useState(
		new Date().getFullYear(),
	);

	const today = new Date().toISOString().split('T')[0];

	const presets: DatePreset[] = [
		{
			label: 'Today',
			value: 'today',
			getRange: () => ({ from: today, to: today }),
		},
		{
			label: 'Yesterday',
			value: 'yesterday',
			getRange: () => {
				const d = new Date();
				d.setDate(d.getDate() - 1);
				const date = d.toISOString().split('T')[0];
				return { from: date, to: date };
			},
		},
		{
			label: 'Last 7 days',
			value: '7d',
			getRange: () => {
				const d = new Date();
				d.setDate(d.getDate() - 7);
				return { from: d.toISOString().split('T')[0], to: today };
			},
		},
		{
			label: 'Last 30 days',
			value: '30d',
			getRange: () => {
				const d = new Date();
				d.setDate(d.getDate() - 30);
				return { from: d.toISOString().split('T')[0], to: today };
			},
		},
		{
			label: 'This month',
			value: 'month',
			getRange: () => {
				const d = new Date();
				const first = new Date(d.getFullYear(), d.getMonth(), 1);
				return { from: first.toISOString().split('T')[0], to: today };
			},
		},
		{
			label: 'This year',
			value: 'year',
			getRange: () => {
				const first = new Date(new Date().getFullYear(), 0, 1);
				return { from: first.toISOString().split('T')[0], to: today };
			},
		},
	];

	const handlePresetSelect = (preset: DatePreset) => {
		const range = preset.getRange();
		setFromDate(range.from);
		setToDate(range.to);
		setActivePreset(preset.value);
	};

	const handleDateSelect = (date: string) => {
		if (!fromDate || (fromDate && toDate)) {
			setFromDate(date);
			setToDate(null);
			setActivePreset(null);
		} else {
			if (date < fromDate) {
				setToDate(fromDate);
				setFromDate(date);
			} else {
				setToDate(date);
			}
			setActivePreset(null);
		}
	};

	const handlePrevMonth = () => {
		if (calendarMonth === 0) {
			setCalendarMonth(11);
			setCalendarYear((y) => y - 1);
		} else {
			setCalendarMonth((m) => m - 1);
		}
	};

	const handleNextMonth = () => {
		if (calendarMonth === 11) {
			setCalendarMonth(0);
			setCalendarYear((y) => y + 1);
		} else {
			setCalendarMonth((m) => m + 1);
		}
	};

	const clearDates = () => {
		setFromDate(null);
		setToDate(null);
		setActivePreset(null);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Calendar className="size-5" />
					<h2 className="text-xl font-semibold">Date Range Filter</h2>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-medium">Quick Presets</h3>
					<PresetButtons
						presets={presets}
						activePreset={activePreset}
						onSelect={handlePresetSelect}
					/>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-medium">Custom Range</h3>
					<div className="grid gap-4 @sm:grid-cols-2">
						<DateInput
							label="From Date"
							value={fromDate || ''}
							onChange={(v) => {
								setFromDate(v);
								setActivePreset(null);
							}}
						/>
						<DateInput
							label="To Date"
							value={toDate || ''}
							onChange={(v) => {
								setToDate(v);
								setActivePreset(null);
							}}
						/>
					</div>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-medium">Calendar Picker</h3>
					<div className="flex flex-wrap justify-center gap-4">
						<CalendarGrid
							month={calendarMonth}
							year={calendarYear}
							selectedFrom={fromDate}
							selectedTo={toDate}
							onSelectDate={handleDateSelect}
							onPrevMonth={handlePrevMonth}
							onNextMonth={handleNextMonth}
						/>
						<CalendarGrid
							month={calendarMonth === 11 ? 0 : calendarMonth + 1}
							year={calendarMonth === 11 ? calendarYear + 1 : calendarYear}
							selectedFrom={fromDate}
							selectedTo={toDate}
							onSelectDate={handleDateSelect}
							onPrevMonth={handlePrevMonth}
							onNextMonth={handleNextMonth}
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<ActiveFilters from={fromDate} to={toDate} onClear={clearDates} />
					<Button className="gap-2" disabled={!fromDate}>
						<Check className="size-4" />
						Apply Filter
					</Button>
				</div>
			</div>
		</section>
	);
}
