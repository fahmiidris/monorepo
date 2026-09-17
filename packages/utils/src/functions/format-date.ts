import type { FormatOptions } from "date-fns/format";

import { format } from "date-fns/format";
import { id } from "date-fns/locale";

interface Options extends FormatOptions {
    format?: string;
}

export function formatDate(date: Date, { format: fmt = "dd MMM y HH:mm:ss", locale = id, ...options }: Options = {}): string {
    return format(date, fmt, { locale, ...options });
}
