const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) {
        return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    let size = SIZES[i];

    if (!size) {
        size = "Unknown";
    }

    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${size}`;
}
