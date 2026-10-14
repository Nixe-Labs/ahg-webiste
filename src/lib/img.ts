import { BASE } from "./base";

/** Prefix a /public path with the deploy sub-path. */
export const img = (p: string) => BASE + p;
export const place = (slug: string) => img(`/img/explore/${slug}.jpg`);
