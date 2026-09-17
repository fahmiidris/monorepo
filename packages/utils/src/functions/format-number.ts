interface Options extends Intl.NumberFormatOptions {
    locale?: string;
}

export function formatNumber(value: number | string, { locale = "id-ID", ...options }: Options = {}): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        currency: "IDR",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
        ...options,
    });

    return formatter.format(Number(value));
}

export function unformatNumber(value: string): string {
    return value.replace(/[^0-9]/g, "") || "0";
}
