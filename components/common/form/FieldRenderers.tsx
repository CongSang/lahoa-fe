import { FieldType, RendererProps } from "@/schema/index";
import { Checkbox, Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, ImageUpload, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, InputNumber, InputPassword, Label, RadioGroup, RadioGroupItem, Select, SelectContent, SelectCustom, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/index";
import { parseValueSelect } from "@/lib/index";
import { Option } from "@/types/common";
import { FieldValues } from "react-hook-form";

export type RendererMap<
  TFieldValues extends FieldValues = FieldValues
> = Record<FieldType, RendererProps<TFieldValues>>;

export const createFieldRenderers= <
  TFieldValues extends FieldValues
>(): RendererMap<TFieldValues> => ({
  text: ({ field, fieldState, config, disabledAll }) => (
    <Input
      type="text"
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      autoComplete="off"
      readOnly={config.readonly}
      disabled={disabledAll}
      placeholder={config.placeholder}
    />
  ),
  number: ({ field, fieldState, config, disabledAll }) => (
    <InputNumber
      {...field}
      value={field.value}
      onChange={field.onChange}
      format="decimal"
      id={field.name}
      aria-invalid={fieldState.invalid}
      autoComplete="off"
      placeholder="0"
      readOnly={config.readonly}
      disabled={disabledAll}
    />
  ),
  password: ({ field, fieldState, config, disabledAll }) => (
    <InputPassword
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      autoComplete="off"
      disabled={config.readonly || disabledAll}
      placeholder={config.placeholder}
    />
  ),
  price: ({ field, fieldState, config, disabledAll }) => (
    <InputNumber
      {...field}
      value={field.value}
      onChange={field.onChange}
      format="currency"
      id={field.name}
      aria-invalid={fieldState.invalid}
      autoComplete="off"
      placeholder="0"
      readOnly={config.readonly}
      disabled={disabledAll}
    />
  ),
  textarea: ({ field, fieldState, config, disabledAll }) => (
    <InputGroup>
      <InputGroupTextarea
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={config.placeholder}
        rows={3}
        readOnly={config.readonly}
        disabled={disabledAll}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText>{field.value?.length || 0}/500</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
  select: ({ field, fieldState, config, disabledAll }) => (
    <Select
      {...field}
      value={String(field.value) ?? undefined}
      onValueChange={(val) => field.onChange(parseValueSelect(val))}
      disabled={config.readonly || disabledAll}
    >
      <SelectTrigger>
        <SelectValue 
          placeholder={config.placeholder} 
          aria-invalid={fieldState.invalid} 
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {config.options?.length && config.options?.map((p: Option) => (
            <SelectItem key={p.value} value={p.value.toString()}>
              {p.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  "group-select-command": ({ field, fieldState, config, disabledAll }) => (
    <SelectCustom
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      selection={config.selection}
      placeholder={config.placeholder}
      groupOptions={config.options}
      value={field.value}
      onChange={field.onChange}
      disabled={config.readonly || disabledAll}
      fieldValue="id"
      hasGroups
    />
  ),
  "select-command": ({ field, fieldState, config, disabledAll }) => (
    <SelectCustom
      {...field}
      id={field.name}
      aria-invalid={fieldState.invalid}
      selection={config.selection}
      placeholder={config.placeholder}
      options={config.options}
      value={field.value}
      onChange={field.onChange}
      disabled={config.readonly || disabledAll}
    />
  ),
  image: ({ field, config, disabledAll }) => (
    <ImageUpload
      disabled={config.readonly || disabledAll}
      value={field.value}
      onChange={field.onChange}
    />
  ),
  "image-square": ({ field, config, disabledAll }) => (
    <ImageUpload
      disabled={config.readonly || disabledAll}
      value={field.value}
      onChange={field.onChange}
      className="w-50 aspect-square rounded-lg"
      modalClassName="rounded-none"
      btnClassName="-bottom-1.5 -right-1.5"
    />
  ),
  radio: ({ field, fieldState, config, disabledAll }) => (
    <RadioGroup
      value={field.value}
      onValueChange={field.onChange}
      aria-invalid={fieldState.invalid}
      className="flex gap-4"
      disabled={config.readonly || disabledAll}
    >
      {config.options?.map((item: Option, index: number) => (
        <div
          key={item.id}
          className="flex items-center gap-2"
        >
          <RadioGroupItem
            value={String(item.id)}
            id={`${index}-${item.id}`}
          />

          <Label htmlFor={`${index}-${item.id}`}>
            {item.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
  checkbox: ({ field, fieldState, config, disabledAll }) => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-invalid={fieldState.invalid}
          disabled={config.readonly || disabledAll}
        />
        <FieldContent>
          <FieldLabel htmlFor={field.name}>
            {config.label}
          </FieldLabel>
          <FieldDescription>
            {config.placeholder}
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
})