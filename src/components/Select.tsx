import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as PrimitiveSelect from "@radix-ui/react-select";
import "./Select.css";

type SelectProps = {
  value: string;
  onChange: (val: string) => void;
  options: {
    label: string;
    value: string;
  }[];
};

export function Select({ value, options, onChange }: SelectProps) {
  return (
    <PrimitiveSelect.Root value={value} onValueChange={onChange}>
      <PrimitiveSelect.Trigger className="SelectTrigger">
        <PrimitiveSelect.Value aria-label={value}>
          {options.find((item) => item.value === value)?.label}
        </PrimitiveSelect.Value>
        <PrimitiveSelect.Icon className="SelectIcon">
          <ChevronDownIcon />
        </PrimitiveSelect.Icon>
      </PrimitiveSelect.Trigger>
      <PrimitiveSelect.Portal>
        <PrimitiveSelect.Content className="SelectContent" position="popper">
          <PrimitiveSelect.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </PrimitiveSelect.ScrollUpButton>
          <PrimitiveSelect.Viewport className="SelectViewport">
            {options.map(({ label, value }) => (
              <PrimitiveSelect.Item
                key={value}
                className="SelectItem"
                value={value}
              >
                <PrimitiveSelect.ItemText>{label}</PrimitiveSelect.ItemText>
                <PrimitiveSelect.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </PrimitiveSelect.ItemIndicator>
              </PrimitiveSelect.Item>
            ))}
          </PrimitiveSelect.Viewport>
          <PrimitiveSelect.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </PrimitiveSelect.ScrollDownButton>
        </PrimitiveSelect.Content>
      </PrimitiveSelect.Portal>
    </PrimitiveSelect.Root>
  );
}
