'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxItem {
	value: string;
	label: string;
}

interface ComboboxProps {
	items: ComboboxItem[];
	value: string;
	onSelect: (value: string) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
}

export function Combobox({
	items,
	value,
	onSelect,
	placeholder = 'Select option...',
	searchPlaceholder = 'Search...',
	emptyText = 'No option found.',
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const [width, setWidth] = React.useState<number>(0);

	React.useEffect(() => {
		if (triggerRef.current) setWidth(triggerRef.current.offsetWidth);
	}, [open]);

	const selectedItem = items.find((item) => item.value === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					ref={triggerRef}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-40 justify-between"
				>
					<span className="capitalize truncate">
						{selectedItem?.label || placeholder}
					</span>
					<ChevronsUpDown className="opacity-50 ml-2 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start" style={{ width }}>
				<Command>
					<CommandInput
						placeholder={searchPlaceholder}
						className="h-9"
						disabled={items.length === 0}
					/>
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setOpen(false);
										onSelect(currentValue === value ? '' : currentValue);
									}}
								>
									<span className="capitalize">{item.label}</span>
									<Check
										className={cn(
											'ml-auto',
											value === item.value ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
