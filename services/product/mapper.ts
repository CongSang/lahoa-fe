/* eslint-disable @typescript-eslint/no-explicit-any */
import { productInitialValues, VariantFormValues } from "@/schema/index";
import {
  ProductFormValues,
} from "@/schema/index";
import { Category, GroupOptions, Product, Property, Variant } from "@/types/index";

export const mapProductToForm = (
  product: Product
): ProductFormValues => ({
  ...productInitialValues, 

  id: product.id ?? "",
  name: product.name ?? "",
  slug: product.slug ?? "",

  basePrice: product.basePrice
    ? String(product.basePrice)
    : "",

  description: product.description ?? "",

  imageUrl: product.mainImage || null,
  imagePublicId: product.imagePublicId ?? "",

  status: product.status,

  displayOrder: product.displayOrder,

  seoTitle: product.seoTitle ?? "",
  seoDescription: product.seoDescription ?? "",
  seoKeywords: product.seoKeywords ?? "",

  primaryCategoryId:
    product.primaryCategory?.id
      ? String(product.primaryCategory.id)
      : "",

  categoryIds:
    product.categories?.map((c: Category) =>
      String(c.id)
    ) ?? [],

  propertyValueIds:
    product.properties?.flatMap((p: Property) =>
      p.values.map((v: any) => String(v.id))
    ) ?? [],

  variants:
    product.variants && product.variants?.length
      ? product.variants.map((v: Variant) => ({
          id: String(v.id),
          sku: v.sku ?? "",
          price: String(v.price ?? ""),
          status: v.status,
          default: !!v.default,
          propertyValueIds:
            v.properties?.flatMap((p: Property) =>
              p.values.map((v: any) => String(v.id))
            ) ?? [],
        }))
      : productInitialValues.variants,
});

export const mapVariantToForm = (
  variant: Variant
): VariantFormValues => ({
  id: variant.id,
  sku: variant.sku ?? null,
  price: variant.price,
  default: variant.default,
  status: variant.status,
  propertyValueIds: variant.properties.map(
    (property) => String(property.values[0]?.id ?? "")
  ),
});

export const mapFormToVariant = (
  variant: VariantFormValues,
  properties: GroupOptions[]
): Variant => {
  return {
    id: variant.id ?? "",
    sku: variant.sku ?? "",
    price: variant.price,
    stock: 0,
    status: variant.status,
    default: variant.default ?? false,
    properties: mapPropertyValueIdsToGroups(variant.propertyValueIds, properties)
  };
};

export const mapPropertyValueIdsToGroups = (
  propertyValueIds: string[],
  properties: GroupOptions[]
): Property[] => {
  return properties?.map((group) => {
      const selectedValues = group.values.filter((value) =>
        propertyValueIds.includes(value.id!)
      );

      if (!selectedValues.length) return null;

      return {
        ...group,
        values: selectedValues,
      } as Property;
    })
    .filter(Boolean) as Property[];
};

export const mapFormToVariants = (
  variants: VariantFormValues[],
  properties: GroupOptions[]
): Variant[] =>
  variants.map((v) => mapFormToVariant(v, properties));