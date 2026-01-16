const FALLBACK_COUNTRIES: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
};

const displayNameCache = new Map<string, Intl.DisplayNames>();

export function countryName(code?: string, locale = "en"): string {
  if (!code) return "";

  const region = code.toUpperCase();

  try {
    let dn = displayNameCache.get(locale);

    if (!dn && typeof Intl.DisplayNames === "function") {
      dn = new Intl.DisplayNames([locale], { type: "region" });
      displayNameCache.set(locale, dn);
    }

    return dn?.of(region) ?? region;
  } catch {
    return region;
  }
}
